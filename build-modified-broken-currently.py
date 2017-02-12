#!/usr/bin/python2.7
# Compresses the core Blockly files into a single JavaScript file.
#
# Copyright 2012 Google Inc.
# https://developers.google.com/blockly/
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# This script generates two versions of Blockly's core files:
#   blockly_compressed.js
#   blockly_uncompressed.js
# The compressed file is a concatenation of all of Blockly's core files which
# have been run through Google's Closure Compiler.  This is done using the
# online API (which takes a few seconds and requires an Internet connection).
# The uncompressed file is a script that loads in each of Blockly's core files
# one by one.  This takes much longer for a browser to load, but is useful
# when debugging code since line numbers are meaningful and variables haven't
# been renamed.  The uncompressed file also allows for a faster developement
# cycle since there is no need to rebuild or recompile, just reload.
#
# This script also generates:
#   blocks_compressed.js: The compressed Blockly language blocks.
#   javascript_compressed.js: The compressed Javascript generator.
#   python_compressed.js: The compressed Python generator.
#   dart_compressed.js: The compressed Dart generator.
#   lua_compressed.js: The compressed Lua generator.
#   msg/js/<LANG>.js for every language <LANG> defined in msg/js/<LANG>.json.

import sys
if sys.version_info[0] != 2:
  raise Exception("Blockly build only compatible with Python 2.x.\n"
                  "You are using: " + sys.version)

import errno, glob, httplib, json, os, re, subprocess, threading, urllib


def import_path(fullpath):
  """Import a file with full path specification.
  Allows one to import from any directory, something __import__ does not do.

  Args:
      fullpath:  Path and filename of import.

  Returns:
      An imported module.
  """
  path, filename = os.path.split(fullpath)
  filename, ext = os.path.splitext(filename)
  sys.path.append(path)
  module = __import__(filename)
  reload(module)  # Might be out of date.
  del sys.path[-1]
  return module


HEADER = ("// Do not edit this file; automatically generated by build.py.\n"
          "'use strict';\n")


class Gen_uncompressed(threading.Thread):
  """Generate a JavaScript file that loads Blockly's raw files.
  Runs in a separate thread.
  """
  def __init__(self, search_paths):
    threading.Thread.__init__(self)
    self.search_paths = search_paths

  def run(self):
    target_filename = 'blockly_uncompressed.js'
    f = open(target_filename, 'w')
    f.write(HEADER)
    f.write("""
var isNodeJS = !!(typeof module !== 'undefined' && module.exports &&
                  typeof window === 'undefined');

if (isNodeJS) {
  var window = {};
  require('../closure-library/closure/goog/bootstrap/nodejs');
}

window.BLOCKLY_DIR = (function() {
  if (!isNodeJS) {
    // Find name of current directory.
    var scripts = document.getElementsByTagName('script');
    var re = new RegExp('(.+)[\/]blockly_uncompressed\.js$');
    for (var i = 0, script; script = scripts[i]; i++) {
      var match = re.exec(script.src);
      if (match) {
        return match[1];
      }
    }
    alert('Could not detect Blockly\\'s directory name.');
  }
  return '';
})();

window.BLOCKLY_BOOT = function() {
  var dir = '';
  if (isNodeJS) {
    require('../closure-library/closure/goog/bootstrap/nodejs');
    dir = 'blockly';
  } else {
    // Execute after Closure has loaded.
    if (!window.goog) {
      alert('Error: Closure not found.  Read this:\\n' +
            'developers.google.com/blockly/guides/modify/web/closure');
    }
    dir = window.BLOCKLY_DIR.match(/[^\\/]+$/)[0];
  }
""")
    add_dependency = []
    base_path = calcdeps.FindClosureBasePath(self.search_paths)
    for dep in calcdeps.BuildDependenciesFromFiles(self.search_paths):
      add_dependency.append(calcdeps.GetDepsLine(dep, base_path))
    add_dependency = '\n'.join(add_dependency)
    # Find the Blockly directory name and replace it with a JS variable.
    # This allows blockly_uncompressed.js to be compiled on one computer and be
    # used on another, even if the directory name differs.
    m = re.search('[\\/]([^\\/]+)[\\/]core[\\/]blockly.js', add_dependency)
    add_dependency = re.sub('([\\/])' + re.escape(m.group(1)) +
        '([\\/]core[\\/])', '\\1" + dir + "\\2', add_dependency)
    f.write(add_dependency + '\n')

    provides = []
    for dep in calcdeps.BuildDependenciesFromFiles(self.search_paths):
      if not dep.filename.startswith(os.pardir + os.sep):  # '../'
        provides.extend(dep.provides)
    provides.sort()
    f.write('\n')
    f.write('// Load Blockly.\n')
    for provide in provides:
      f.write("goog.require('%s');\n" % provide)

    f.write("""
delete this.BLOCKLY_DIR;
delete this.BLOCKLY_BOOT;
};

if (isNodeJS) {
  window.BLOCKLY_BOOT()
  module.exports = Blockly;
} else {
  // Delete any existing Closure (e.g. Soy's nogoog_shim).
  document.write('<script>var goog = undefined;</script>');
  // Load fresh Closure Library.
  document.write('<script src="' + window.BLOCKLY_DIR +
      '/../closure-library/closure/goog/base.js"></script>');
  document.write('<script>window.BLOCKLY_BOOT();</script>');
}
""")
    f.close()
    print("SUCCESS: " + target_filename)


class Gen_compressed(threading.Thread):
  """Generate a JavaScript file that contains all of Blockly's core and all
  required parts of Closure, compiled together.
  Uses the Closure Compiler's online API.
  Runs in a separate thread.
  """
  def __init__(self, search_paths):
    threading.Thread.__init__(self)
    self.search_paths = search_paths

  def run(self):
    self.gen_core()
    self.gen_blocks()
    self.gen_generator("javascript")
    self.gen_generator("python")
    self.gen_generator("php")
    self.gen_generator("dart")
    self.gen_generator("lua")

  def gen_core(self):
    target_filename = "blockly_compressed.js"
    # Define the parameters for the POST request.
    params = [
        ("compilation_level", "SIMPLE_OPTIMIZATIONS"),
        ("use_closure_library", "true"),
        ("output_format", "json"),
        ("output_info", "compiled_code"),
        ("output_info", "warnings"),
        ("output_info", "errors"),
        ("output_info", "statistics"),
      ]

    # Read in all the source files.
    filenames = calcdeps.CalculateDependencies(self.search_paths,
        [os.path.join("core", "blockly.js")])
    for filename in filenames:
      # Filter out the Closure files (the compiler will add them).
      if filename.startswith(os.pardir + os.sep):  # '../'
        continue
      f = open(filename)
      params.append(("js_code", "".join(f.readlines())))
      f.close()

    self.do_compile(params, target_filename, filenames, "")

  def gen_blocks(self):
    target_filename = "blocks_compressed.js"
    # Define the parameters for the POST request.
    params = [
        ("compilation_level", "SIMPLE_OPTIMIZATIONS"),
        ("output_format", "json"),
        ("output_info", "compiled_code"),
        ("output_info", "warnings"),
        ("output_info", "errors"),
        ("output_info", "statistics"),
      ]

    # Read in all the source files.
    # Add Blockly.Blocks to be compatible with the compiler.
    params.append(("js_code", "goog.provide('Blockly.Blocks');"))
    filenames = glob.glob(os.path.join("blocks", "*.js"))
    filenames.extend(glob.glob(os.path.join('blocks/kiwifroot', '*.js')))
    for filename in filenames:
      f = open(filename)
      params.append(("js_code", "".join(f.readlines())))
      f.close()
      filenames.insert(0, '[goog.provide]')


    # Remove Blockly.Blocks to be compatible with Blockly.
    remove = "var Blockly={Blocks:{}};"
    self.do_compile(params, target_filename, filenames, remove)

  def gen_generator(self, language, extends=''):
    target_filename = language + "_compressed.js"
    # Define the parameters for the POST request.
    params = [
        ("compilation_level", "SIMPLE_OPTIMIZATIONS"),
        ("output_format", "json"),
        ("output_info", "compiled_code"),
        ("output_info", "warnings"),
        ("output_info", "errors"),
        ("output_info", "statistics"),
      ]

    # Read in all the source files.
    # Add Blockly.Generator to be compatible with the compiler.
    params.append(("js_code", "goog.provide('Blockly.Generator');"))

    filenames = []
    if extends:
      filenames.append(os.path.join("generators", extends + ".js"))
      filenames.extend(glob.glob(
        os.path.join("generators", extends, "*.js")))
    filenames = glob.glob(
        os.path.join("generators", language, "*.js"))
    filenames.insert(0, os.path.join("generators", language + ".js"))

    for filename in filenames:
      f = open(filename)
      params.append(("js_code", "".join(f.readlines())))
      f.close()
    filenames.insert(0, "[goog.provide]")

    # Remove Blockly.Generator to be compatible with Blockly.
    remove = "var Blockly={Generator:{}};"
    self.do_compile(params, target_filename, filenames, remove)

  def do_compile(self, params, target_filename, filenames, remove):
    # Send the request to Google.
    headers = {"Content-type": "application/x-www-form-urlencoded"}
    conn = httplib.HTTPConnection("closure-compiler.appspot.com")
    conn.request("POST", "/compile", urllib.urlencode(params), headers)
    response = conn.getresponse()
    json_str = response.read()
    conn.close()

    # Parse the JSON response.
    json_data = json.loads(json_str)

    def file_lookup(name):
      if not name.startswith("Input_"):
        return "???"
      n = int(name[6:]) - 1
      return filenames[n]

    if json_data.has_key("serverErrors"):
      errors = json_data["serverErrors"]
      for error in errors:
        print("SERVER ERROR: %s" % target_filename)
        print(error["error"])
    elif json_data.has_key("errors"):
      errors = json_data["errors"]
      for error in errors:
        print("FATAL ERROR")
        print(error["error"])
        if error["file"]:
          print("%s at line %d:" % (
              file_lookup(error["file"]), error["lineno"]))
          print(error["line"])
          print((" " * error["charno"]) + "^")
        sys.exit(1)
    else:
      if json_data.has_key("warnings"):
        warnings = json_data["warnings"]
        for warning in warnings:
          print("WARNING")
          print(warning["warning"])
          if warning["file"]:
            print("%s at line %d:" % (
                file_lookup(warning["file"]), warning["lineno"]))
            print(warning["line"])
            print((" " * warning["charno"]) + "^")
        print()

      if not json_data.has_key("compiledCode"):
        print("FATAL ERROR: Compiler did not return compiledCode.")
        sys.exit(1)

      code = HEADER + "\n" + json_data["compiledCode"]
      code = code.replace(remove, "")

      # Trim down Google's Apache licences.
      # The Closure Compiler used to preserve these until August 2015.
      # Delete this in a few months if the licences don't return.
      LICENSE = re.compile("""/\\*

 [\w ]+

 (Copyright \\d+ Google Inc.)
 https://developers.google.com/blockly/

 Licensed under the Apache License, Version 2.0 \(the "License"\);
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
\\*/""")
      code = re.sub(LICENSE, r"\n// \1  Apache License 2.0", code)

      stats = json_data["statistics"]
      original_b = stats["originalSize"]
      compressed_b = stats["compressedSize"]
      if original_b > 0 and compressed_b > 0:
        f = open(target_filename, "w")
        f.write(code)
        f.close()

        original_kb = int(original_b / 1024 + 0.5)
        compressed_kb = int(compressed_b / 1024 + 0.5)
        ratio = int(float(compressed_b) / float(original_b) * 100 + 0.5)
        print("SUCCESS: " + target_filename)
        print("Size changed from %d KB to %d KB (%d%%)." % (
            original_kb, compressed_kb, ratio))
      else:
        print("UNKNOWN ERROR")


class Gen_langfiles(threading.Thread):
  """Generate JavaScript file for each natural language supported.

  Runs in a separate thread.
  """

  def __init__(self):
    threading.Thread.__init__(self)

  def _rebuild(self, srcs, dests):
    # Determine whether any of the files in srcs is newer than any in dests.
    try:
      return (max(os.path.getmtime(src) for src in srcs) >
              min(os.path.getmtime(dest) for dest in dests))
    except OSError as e:
      # Was a file not found?
      if e.errno == errno.ENOENT:
        # If it was a source file, we can't proceed.
        if e.filename in srcs:
          print("Source file missing: " + e.filename)
          sys.exit(1)
        else:
          # If a destination file was missing, rebuild.
          return True
      else:
        print("Error checking file creation times: " + e)

  def run(self):
    # The files msg/json/{en,qqq,synonyms}.json depend on msg/messages.js.
    if self._rebuild([os.path.join("msg", "messages.js")],
                     [os.path.join("msg", "json", f) for f in
                      ["en.json", "qqq.json", "synonyms.json"]]):
      try:
        subprocess.check_call([
            "python",
            os.path.join("i18n", "js_to_json.py"),
            "--input_file", "msg/messages.js",
            "--output_dir", "msg/json/",
            "--quiet"])
      except (subprocess.CalledProcessError, OSError) as e:
        # Documentation for subprocess.check_call says that CalledProcessError
        # will be raised on failure, but I found that OSError is also possible.
        print("Error running i18n/js_to_json.py: ", e)
        sys.exit(1)

    # Checking whether it is necessary to rebuild the js files would be a lot of
    # work since we would have to compare each <lang>.json file with each
    # <lang>.js file.  Rebuilding is easy and cheap, so just go ahead and do it.
    try:
      # Use create_messages.py to create .js files from .json files.
      cmd = [
          "python",
          os.path.join("i18n", "create_messages.py"),
          "--source_lang_file", os.path.join("msg", "json", "en.json"),
          "--source_synonym_file", os.path.join("msg", "json", "synonyms.json"),
          "--key_file", os.path.join("msg", "json", "keys.json"),
          "--output_dir", os.path.join("msg", "js"),
          "--quiet"]
      json_files = glob.glob(os.path.join("msg", "json", "*.json"))
      json_files = [file for file in json_files if not
                    (file.endswith(("keys.json", "synonyms.json", "qqq.json")))]
      cmd.extend(json_files)
      subprocess.check_call(cmd)
    except (subprocess.CalledProcessError, OSError) as e:
      print("Error running i18n/create_messages.py: ", e)
      sys.exit(1)

    # Output list of .js files created.
    for f in json_files:
      # This assumes the path to the current directory does not contain "json".
      f = f.replace("json", "js")
      if os.path.isfile(f):
        print("SUCCESS: " + f)
      else:
        print("FAILED to create " + f)


if __name__ == "__main__":
  try:
    calcdeps = import_path(os.path.join(
        os.path.pardir, "closure-library", "closure", "bin", "calcdeps.py"))
  except ImportError:
    if os.path.isdir(os.path.join(os.path.pardir, "closure-library-read-only")):
      # Dir got renamed when Closure moved from Google Code to GitHub in 2014.
      print("Error: Closure directory needs to be renamed from"
            "'closure-library-read-only' to 'closure-library'.\n"
            "Please rename this directory.")
    elif os.path.isdir(os.path.join(os.path.pardir, "google-closure-library")):
      # When Closure is installed by npm, it is named "google-closure-library".
      #calcdeps = import_path(os.path.join(
      # os.path.pardir, "google-closure-library", "closure", "bin", "calcdeps.py"))
      print("Error: Closure directory needs to be renamed from"
           "'google-closure-library' to 'closure-library'.\n"
           "Please rename this directory.")
    else:
      print("""Error: Closure not found.  Read this:
developers.google.com/blockly/guides/modify/web/closure""")
    sys.exit(1)

  search_paths = calcdeps.ExpandDirectories(
      ["core", os.path.join(os.path.pardir, "closure-library")])

  # Run both tasks in parallel threads.
  # Uncompressed is limited by processor speed.
  # Compressed is limited by network and server speed.
  Gen_uncompressed(search_paths).start()
  Gen_compressed(search_paths).start()

  # This is run locally in a separate thread.
  Gen_langfiles().start()
