/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Utility functions for handling variables.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.KiwifrootVariables');
// goog.require('Blockly.Variables'); // import the core variables file
goog.require('Blockly.Blocks');
goog.require('Blockly.Workspace');
goog.require('goog.string');

// This file is the kiwifroot code that has been removed from core/variables.js
// The name space of the 

/**
 * The definition name of the any type
 * @const
 */
Blockly.KiwifrootVariables.TYPE_ANY = '';
/**
 * The definition name of the boolean type
 * @const
 */
Blockly.KiwifrootVariables.TYPE_BOOLEAN = 'Boolean';
/**
 * The definition name of the number type
 * @const
 */
Blockly.KiwifrootVariables.TYPE_NUMBER = 'Number';
/**
 * The definition name of the string type
 * @const
 */
Blockly.KiwifrootVariables.TYPE_STRING = 'String';
/**
 * The definition name of the colour type
 * @const
 */
Blockly.KiwifrootVariables.TYPE_COLOUR = 'Colour';
/**
 * The definition name of the array type
 * @const
 */
Blockly.KiwifrootVariables.TYPE_ARRAY = 'Array';
/**
 * The definition name of the array type
 * @const
 */
Blockly.KiwifrootVariables.TYPE_INSTANCE = 'Instance';
/**
 * The definition name of the class type
 * @const
 */
Blockly.KiwifrootVariables.TYPE_CLASS = 'Class';
/**
 * The definition name of the sound type
 * @const
 */
Blockly.KiwifrootVariables.TYPE_SOUND = 'Sound';
/**
 * The definition name of the finger type
 * @const
 */
Blockly.KiwifrootVariables.TYPE_POINTER = 'Pointer';
/**
* The definition name of the location type
* @const
*/ 
Blockly.KiwifrootVariables.TYPE_COORDINATE = 'Coordinate';

/**
 * The colour that should be applied to a block that outputs type 'any'
 * @const
 */
Blockly.KiwifrootVariables.COLOUR_ANY = '#71cd04';
/**
 * The colour that should be applied to a block that outputs type 'boolean'
 * @const
 */
Blockly.KiwifrootVariables.COLOUR_BOOLEAN = '#2db1f9';
/**
 * The colour that should be applied to a block that outputs type 'number'
 * @const
 */
Blockly.KiwifrootVariables.COLOUR_NUMBER = '#1b6fe9';
/**
 * The colour that should be applied to a block that outputs type 'string'
 * @const
 */
Blockly.KiwifrootVariables.COLOUR_STRING = '#40ce9e';
/**
 * The colour that should be applied to a block that outputs type 'colour'
 * @const
 */
Blockly.KiwifrootVariables.COLOUR_COLOUR = '#b24ac5';
/**
 * The colour that should be applied to a block that outputs type 'array'
 * @const
 */
Blockly.KiwifrootVariables.COLOUR_ARRAY = '#8230e7';
/**
 * The colour that should be applied to a block that outputs type 'instance'
 * @const
 */
Blockly.KiwifrootVariables.COLOUR_INSTANCE = '#e74e48';
/**
 * The colour that should be applied to a block that outputs type 'class'
 * @const
 */
Blockly.KiwifrootVariables.COLOUR_CLASS = '#fc8607';
/**
 * The colour that should be applied to a block that outputs type 'sound'
 * @const
 */
Blockly.KiwifrootVariables.COLOUR_SOUND = '#d147ea';
/**
 * The colour that should be applied to a block that outputs type 'finger'
 * @const
 */
Blockly.KiwifrootVariables.COLOUR_POINTER = '#ea8847';
/**
* The colour that should be applied to a block that outs type 'location'
* @const
*/
Blockly.KiwifrootVariables.COLOUR_COORDINATE = '#388e3c';

/*
 * New Colour Blocks....
 * Based on the category a block is in now.
 */
Blockly.KiwifrootVariables.COLOUR = {
  'EVENT': "#edae00",
  'CONTROL': "#ff8601",
  'MOTION': "#e54e43",
  'ANIMATION': "#df358e",
  'LOOKS': "#b443c9",
  'SENSING': "#8121e7",
  'SOUND': "#0f6bf0",
  'OPERATORS': "#21aefe",
  'PHYSICS': "#e66b2f",
  'DRAW': "#38ce9e",
  'VARIABLES': "#348f32",
  'FUNCTIONS': "#6bd101",
  'LOCAL_VARIABLES': "#56ae02",
  'GLOBAL_VARIABLES': "#006d00"
};

/**
 * The hue that corresponds to each variable type
 */
Blockly.KiwifrootVariables.COLOUR_FOR_TYPE = {};
Blockly.KiwifrootVariables.COLOUR_FOR_TYPE[Blockly.KiwifrootVariables.TYPE_BOOLEAN] = Blockly.KiwifrootVariables.COLOUR_BOOLEAN;
Blockly.KiwifrootVariables.COLOUR_FOR_TYPE[Blockly.KiwifrootVariables.TYPE_NUMBER] = Blockly.KiwifrootVariables.COLOUR_NUMBER;
Blockly.KiwifrootVariables.COLOUR_FOR_TYPE[Blockly.KiwifrootVariables.TYPE_STRING] = Blockly.KiwifrootVariables.COLOUR_STRING;
Blockly.KiwifrootVariables.COLOUR_FOR_TYPE[Blockly.KiwifrootVariables.TYPE_COLOUR] = Blockly.KiwifrootVariables.COLOUR_COLOUR;
Blockly.KiwifrootVariables.COLOUR_FOR_TYPE[Blockly.KiwifrootVariables.TYPE_ARRAY] = Blockly.KiwifrootVariables.COLOUR_ARRAY;
Blockly.KiwifrootVariables.COLOUR_FOR_TYPE[Blockly.KiwifrootVariables.TYPE_INSTANCE] = Blockly.KiwifrootVariables.COLOUR_INSTANCE;
Blockly.KiwifrootVariables.COLOUR_FOR_TYPE[Blockly.KiwifrootVariables.TYPE_CLASS] = Blockly.KiwifrootVariables.COLOUR_CLASS;
Blockly.KiwifrootVariables.COLOUR_FOR_TYPE[Blockly.KiwifrootVariables.TYPE_SOUND] = Blockly.KiwifrootVariables.COLOUR_SOUND;
Blockly.KiwifrootVariables.COLOUR_FOR_TYPE[Blockly.KiwifrootVariables.TYPE_POINTER] = Blockly.KiwifrootVariables.COLOUR_POINTER;
Blockly.KiwifrootVariables.COLOUR_FOR_TYPE[Blockly.KiwifrootVariables.TYPE_COORDINATE] = Blockly.KiwifrootVariables.COLOUR_COORDINATE;

/**
 * A Complete list of all variables types available.
 * Contains a tuple of both the variables display name and
 * it's definition name.
 * @return {Array}
 */
Blockly.KiwifrootVariables.allTypes = function(){
  return [
    /* We don't allow the any type here!
    [Blockly.Msg.VARIABLES_TYPE_ANY,
      Blockly.KiwifrootVariables.TYPE_ANY],*/
    [Blockly.Msg.VARIABLES_TYPE_BOOLEAN || "",
      Blockly.KiwifrootVariables.TYPE_BOOLEAN],
    [Blockly.Msg.VARIABLES_TYPE_NUMBER || "",
      Blockly.KiwifrootVariables.TYPE_NUMBER],
    [Blockly.Msg.VARIABLES_TYPE_STRING || "",
      Blockly.KiwifrootVariables.TYPE_STRING],
    [Blockly.Msg.VARIABLES_TYPE_COLOUR || "",
      Blockly.KiwifrootVariables.TYPE_COLOUR],
    [Blockly.Msg.VARIABLES_TYPE_ARRAY || "",
      Blockly.KiwifrootVariables.TYPE_ARRAY],
    [Blockly.Msg.VARIABLES_TYPE_INSTANCE || "",
      Blockly.KiwifrootVariables.TYPE_INSTANCE],
    [Blockly.Msg.VARIABLES_TYPE_CLASS || "",
      Blockly.KiwifrootVariables.TYPE_CLASS],
    [Blockly.Msg.VARIABLES_TYPE_SOUND || "",
      Blockly.KiwifrootVariables.TYPE_SOUND],
    [Blockly.Msg.VARIABLES_TYPE_POINTER || "",
      Blockly.KiwifrootVariables.TYPE_POINTER],
    [Blockly.Msg.VARIABLES_TYPE_COORDINATE || "",
      Blockly.KiwifrootVariables.TYPE_COORDINATE]
  ];
};



// This function has been updated in mainline Google Blockly and has been converted to
// Gamefroot legacy code for now. Updated name space from Blockly.KiwifrootVariables to Blockly.KiwifrootVariables

/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Array.<!Blockly.Block>} blocks List of blocks to show.
 * @param {!Array.<number>} gaps List of widths between blocks.
 * @param {number} margin Standard margin width for calculating gaps.
 * @param {!Blockly.Workspace} workspace The flyout's workspace.
 */
Blockly.KiwifrootVariables.flyoutCategory = function(blocks, gaps, margin, workspace) {

  function generateBlocks( variableList, getBlockName, setBlockName, getVarsMethodName ) {

    if(!variableList) {
      return;
    }

    variableList.sort(goog.string.caseInsensitiveCompare);

    // In addition to the user's variables, we also want to display the default
    // variable name at the top.  We also don't want this duplicated if the
    // user has created a variable of the same name.
    variableList.unshift(null);
    
    var defaultVariable = undefined;

    for (var i = 0; i < variableList.length; i++) {
      if (variableList[i] === defaultVariable) {
        continue;
      }
      var getBlock = Blockly.Blocks[ getBlockName ] ?
          Blockly.Block.obtain(workspace, getBlockName ) : null;
      var setBlock = Blockly.Blocks[ setBlockName ] ?
          Blockly.Block.obtain(workspace, setBlockName) : null;

      if (variableList[i] === null) {
        defaultVariable = (getBlock || setBlock)[ getVarsMethodName ]()[0];
      }
      else {
        getBlock && getBlock.setFieldValue(variableList[i], 'VAR');
        setBlock && setBlock.setFieldValue(variableList[i], 'VAR');
      }    

      setBlock && blocks.push(setBlock);
      getBlock && blocks.push(getBlock);

      if (getBlock && setBlock) {
        gaps.push(margin, margin * 3);
      } else {
        gaps.push(margin * 2);
      }

      getBlock && typeof getBlock.postInit === 'function' 
        && getBlock.postInit.call(getBlock);
      setBlock && typeof setBlock.postInit === 'function' 
        && setBlock.postInit.call(setBlock);

      getBlock && getBlock.initSvg();
      setBlock && setBlock.initSvg();
    }

  }

  function generateCategory( title ) { 

    if( !Blockly.Blocks["kiwi_block_category"] ) {
      return;
    }

    var catBlock = document.createElement('block');
    catBlock.setAttribute('message', title);
    catBlock.setAttribute('type', 'kiwi_block_category');
    catBlock = Blockly.Block.obtain( workspace, "kiwi_block_category", catBlock );

    if( catBlock ) {
      gaps.push( margin * 2 );
      blocks.push( catBlock );
      catBlock.initSvg();
    }

  }

  generateCategory( 'Global' );
  //Global Scope
  generateBlocks( 
    Blockly.KiwifrootVariables.Global.allVariables(workspace.targetWorkspace),
    'variables_global_get',
    'variables_global_set',
    'globalGetVars'
     );

  generateCategory( 'Properties' );

  //Generate Regular Variables
  generateBlocks( 
    Blockly.KiwifrootVariables.allVariables(workspace.targetWorkspace),
    'variables_get',
    'variables_set',
    'getVars'
     );

  generateCategory( 'Local' );

  //Generate Local Variables 
  generateBlocks( 
    Blockly.KiwifrootVariables.Local.allVariables(workspace.targetWorkspace),
    'variables_local_get',
    'variables_local_set',
    'localGetVars'
     );

};

// Pulled from core/variables.js 

//PROPERTY SCOPE

/**
 * Find all user-created variables.
 * @param {!Blockly.Block|!Blockly.Workspace} root Root block or workspace.
 * @return {!Array.<string>} Array of variable names.
 */
Blockly.KiwifrootVariables.allVariables = function(root) {
  var blocks;
  if (root.getDescendants) {
    // Root is Block.
    blocks = root.getDescendants();
  } else if (root.getAllBlocks) {
    // Root is Workspace.
    blocks = root.getAllBlocks();
  } else {
    throw 'Not Block or Workspace: ' + root;
  }
  var variableHash = Object.create(null);
  // Iterate through every block and add each variable to the hash.
  for (var x = 0; x < blocks.length; x++) {
    if (blocks[x].getVars) {
      var blockVariables = blocks[x].getVars();
      for (var y = 0; y < blockVariables.length; y++) {
        var varName = blockVariables[y];
        // Variable name may be null if the block is only half-built.
        if (varName) {
          variableHash[varName.toLowerCase()] = varName;
        }
      }
    }
  }
  // Flatten the hash into a list.
  var variableList = [];
  for (var name in variableHash) {
    variableList.push(variableHash[name]);
  }
  return variableList;
};

/**
 * Finds all user-created variables and their types. 
 * @param {!Blockly.Block|!Blockly.Workspace} root Root block or workspace.
 * @return {!Array<!Array<string>>}
 */
Blockly.KiwifrootVariables.allVariablesAndTypes = function(root){
  var blocks, workspace;
  if (root.getDescendants) {
    // Root is Block.
    blocks = root.getDescendants();
    workspace = root.workspace;
  } else if (root.getAllBlocks) {
    // Root is Workspace.
    blocks = root.getAllBlocks();
    workspace = root;
  } else {
    throw 'Not Block or Workspace: ' + root;
  }
  var variableHash = Object.create(null);
  // Iterate through every block and add each variable to the hash.
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].getVars;
    if (func) {
      var blockVariables = func.call(blocks[x]);
      for (var y = 0; y < blockVariables.length; y++) {
        var varName = blockVariables[y];
        // Variable name may be null if the block is only half-built.
        if (varName) {
          variableHash[varName.toLowerCase()] = varName;
        }
      }
    }
  }
  // Flatten the hash into a list.
  var variableList = [];
  for (var name in variableHash) {
    var type = Blockly.KiwifrootVariables.typeOf(name,workspace)
      || Blockly.KiwifrootVariables.TYPE_ANY;
    variableList.push([variableHash[name], type]);
  }
  return variableList;
};

/**
 * Sets the type of a variable with the given name
 * @param {string} name The variable name
 * @param {string} type The type to change to
 * @param {!Blockly.Workspace} workspace Workspace edit variables in.
 */
Blockly.KiwifrootVariables.changeType = function(name, type, workspace){
  var blocks = workspace.getAllBlocks();
  // Iterate through every block.
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].changeType;
    if (func) {
      func.call(blocks[x], name, type);
    }
  }
};

/**
 * Gets the type of a variable with the given name
 * @param {string} name The name of the variable to test
 * @param {!Blockly.Workspace} workspace Workspace query variables in.
 */
Blockly.KiwifrootVariables.typeOf = function(name, workspace){
  var blocks = workspace.getAllBlocks();
  // Iterate through every block.
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].typeOf;
    if (func) {
      var type =  func.call(blocks[x], name);
      if (type) return type;
    }
  }
};

/**
 * Find all instances of the specified variable and rename them.
 * @param {string} oldName Variable to rename.
 * @param {string} newName New variable name.
 * @param {!Blockly.Workspace} workspace Workspace rename variables in.
 */
Blockly.KiwifrootVariables.renameVariable = function(oldName, newName, workspace) {
  var blocks = workspace.getAllBlocks();
  // Iterate through every block.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].renameVar) {
      blocks[i].renameVar(oldName, newName);
    }
  }
};


//LOCAL

Blockly.KiwifrootVariables.Local = {};

/**
 * Find all user-created variables.
 * @param {!Blockly.Block|!Blockly.Workspace} root Root block or workspace.
 * @return {!Array.<string>} Array of variable names.
 */
Blockly.KiwifrootVariables.Local.allVariables = function(root) {
  var blocks;
  if (root.getDescendants) {
    // Root is Block.
    blocks = root.getDescendants();
  } else if (root.getAllBlocks) {
    // Root is Workspace.
    blocks = root.getAllBlocks();
  } else {
    throw 'Not Block or Workspace: ' + root;
  }
  var variableHash = Object.create(null);
  // Iterate through every block and add each variable to the hash.
  for (var x = 0; x < blocks.length; x++) {
    if (blocks[x].localGetVars) {
      var blockVariables = blocks[x].localGetVars();
      for (var y = 0; y < blockVariables.length; y++) {
        var varName = blockVariables[y];
        // Variable name may be null if the block is only half-built.
        if (varName) {
          variableHash[varName.toLowerCase()] = varName;
        }
      }
    }
  }
  // Flatten the hash into a list.
  var variableList = [];
  for (var name in variableHash) {
    variableList.push(variableHash[name]);
  }
  return variableList;
};

/**
 * Finds all user-created variables and their types. 
 * @param {!Blockly.Block|!Blockly.Workspace} root Root block or workspace.
 * @return {!Array<!Array<string>>}
 */
Blockly.KiwifrootVariables.Local.allVariablesAndTypes = function(root){
  var blocks, workspace;
  if (root.getDescendants) {
    // Root is Block.
    blocks = root.getDescendants();
    workspace = root.workspace;
  } else if (root.getAllBlocks) {
    // Root is Workspace.
    blocks = root.getAllBlocks();
    workspace = root;
  } else {
    throw 'Not Block or Workspace: ' + root;
  }
  var variableHash = Object.create(null);
  // Iterate through every block and add each variable to the hash.
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].localGetVars;
    if (func) {
      var blockVariables = func.call(blocks[x]);
      for (var y = 0; y < blockVariables.length; y++) {
        var varName = blockVariables[y];
        // Variable name may be null if the block is only half-built.
        if (varName) {
          variableHash[varName.toLowerCase()] = varName;
        }
      }
    }
  }
  // Flatten the hash into a list.
  var variableList = [];
  for (var name in variableHash) {
    var type = Blockly.KiwifrootVariables.Local.typeOf(name,workspace)
      || Blockly.KiwifrootVariables.TYPE_ANY;
    variableList.push([variableHash[name], type]);
  }
  return variableList;
};

/**
 * Sets the type of a variable with the given name
 * @param {string} name The variable name
 * @param {string} type The type to change to
 * @param {!Blockly.Workspace} workspace Workspace edit variables in.
 */
Blockly.KiwifrootVariables.Local.changeType = function(name, type, workspace){
  var blocks = workspace.getAllBlocks();
  // Iterate through every block.
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].localChangeType;
    if (func) {
      func.call(blocks[x], name, type);
    }
  }
};

/**
 * Gets the type of a variable with the given name
 * @param {string} name The name of the variable to test
 * @param {!Blockly.Workspace} workspace Workspace query variables in.
 */
Blockly.KiwifrootVariables.Local.typeOf = function(name, workspace){
  var blocks = workspace.getAllBlocks();
  // Iterate through every block.
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].localTypeOf;
    if (func) {
      var type =  func.call(blocks[x], name);
      if (type) return type;
    }
  }
};

/**
 * Returns a boolean indicating if the current block is immutable or not to prevent type clashes
 * @param name {string}
 * @param {!Blockly.Workspace}
 */
Blockly.KiwifrootVariables.Local.isImmutable = function(name, workspace){
  var blocks = workspace.getAllBlocks(),
    block;

  // Iterate through every block.
  for (var x = 0; x < blocks.length; x++) {
    var block = blocks[x],
      func = block.localIsImmutable;

    if( !func ) continue;

    if( Blockly.Names.equals(name, block.getFieldValue('VAR') ) ) {
      var immutable = func.call(block);
      if (immutable) return immutable;
    }

  }
  return false;
};

/**
 * Find all instances of the specified variable and rename them.
 * @param {string} oldName Variable to rename.
 * @param {string} newName New variable name.
 * @param {!Blockly.Workspace} workspace Workspace rename variables in.
 */
Blockly.KiwifrootVariables.Local.renameVariable = function(oldName, newName, workspace) {
  var blocks = workspace.getAllBlocks();
  // Iterate through every block.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].localRenameVar) {
      blocks[i].localRenameVar(oldName, newName);
    }
  }
};


// GLOBAL - GAME

Blockly.KiwifrootVariables.Global = {
  variables_: []
};

/**
 * Adds a new global variable to workspace. 
 * The type will not be able to be changed in the workspace by the user. 
 * @param {string} name
 * @param {string} type
 */
Blockly.KiwifrootVariables.Global.add = function(name, type) {

  type = type || Blockly.KiwifrootVariables.TYPE_BOOLEAN;

  for( var i = 0; i < Blockly.KiwifrootVariables.Global.variables_.length; i++ ) {
    var vari = Blockly.KiwifrootVariables.Global.variables_[i];
    if( vari[0].toLowerCase() === name.toLowerCase() ) {
       return;
    }
  }

  Blockly.KiwifrootVariables.Global.variables_.push( [ name, type ] );
  
};

/**
 * Clears all external global variables from the list. 
 * Doesn't dispose of any of the variables if they were used in the workspace.
 * @param {string} name
 * @param {string} type
 */
Blockly.KiwifrootVariables.Global.clear = function(workspace) {
  Blockly.KiwifrootVariables.Global.variables_ = [];
};

/**
 * Adds a new global variable to workspace. 
 * The type will not be able to be changed in the workspace by the user. 
 * @param {string} name
 * @param {string} type
 */
Blockly.KiwifrootVariables.Global.remove = function(name) {

  //Remove from the variable list
  for( var i = 0; i < Blockly.KiwifrootVariables.Global.variables_.length; i++) {
    var vari = Blockly.KiwifrootVariables.Global.variables_[i];
    if( vari[0].toLowerCase() === name.toLowerCase() ) {
      Blockly.KiwifrootVariables.Global.variables_.splice(i, 1);
    }
  }

};

/**
 * Find all user-created variables.
 * @param {!Blockly.Block|!Blockly.Workspace} root Root block or workspace.
 * @return {!Array.<string>} Array of variable names.
 */
Blockly.KiwifrootVariables.Global.allVariables = function(root, workspaceOnly) {
  //Get the global variables from the current script
  var blocks;
  if (root.getDescendants) {
    // Root is Block.
    blocks = root.getDescendants();
  } else if (root.getAllBlocks) {
    // Root is Workspace.
    blocks = root.getAllBlocks();
  } else {
    throw 'Not Block or Workspace: ' + root;
  }
  var variableHash = Object.create(null);
  // Iterate through every block and add each variable to the hash.
  for (var x = 0; x < blocks.length; x++) {
    if (blocks[x].globalGetVars) {
      var blockVariables = blocks[x].globalGetVars();
      for (var y = 0; y < blockVariables.length; y++) {
        var varName = blockVariables[y];
        // Variable name may be null if the block is only half-built.
        if (varName) {
          variableHash[varName.toLowerCase()] = varName;
        }
      }
    }
  }

  //Add the global variables from external scripts. Override inner blocks
  if( !workspaceOnly ) {
    for( var x = 0; x < Blockly.KiwifrootVariables.Global.variables_.length; x++ ) {
      variableHash[ Blockly.KiwifrootVariables.Global.variables_[x][0].toLowerCase() ] = Blockly.KiwifrootVariables.Global.variables_[x][0];
    }
  }

  // Flatten the hash into a list.
  var variableList = [];
  for (var name in variableHash) {
    variableList.push(variableHash[name]);
  }
  
  return variableList;
};

/**
 * Finds all user-created variables and their types. 
 * @param {!Blockly.Block|!Blockly.Workspace} root Root block or workspace.
 * @return {!Array<!Array<string>>}
 */
Blockly.KiwifrootVariables.Global.allVariablesAndTypes = function(root, workspaceOnly) {
  //Get the global variables from the current script
  var blocks, workspace;
  if (root.getDescendants) {
    // Root is Block.
    blocks = root.getDescendants();
    workspace = root.workspace;
  } else if (root.getAllBlocks) {
    // Root is Workspace.
    blocks = root.getAllBlocks();
    workspace = root;
  } else {
    throw 'Not Block or Workspace: ' + root;
  }
  var variableHash = Object.create(null);
  // Iterate through every block and add each variable to the hash.
  for (var x = 0; x < blocks.length; x++) {
    if (blocks[x].globalGetVars) {
      var blockVariables = blocks[x].globalGetVars();
      for (var y = 0; y < blockVariables.length; y++) {
        var varName = blockVariables[y];
        // Variable name may be null if the block is only half-built.
        if (varName) {
          variableHash[varName.toLowerCase()] = varName;
        }
      }
    }
  }

  //Add the global variables from external scripts. Override inner blocks
  if( !workspaceOnly ) {
    for( var x = 0; x < Blockly.KiwifrootVariables.Global.variables_.length; x++ ) {
      variableHash[ Blockly.KiwifrootVariables.Global.variables_[x][0].toLowerCase() ] = Blockly.KiwifrootVariables.Global.variables_[x][0];
    }
  }

  // Flatten the hash into a list.
  var variableList = [];
  for (var name in variableHash) {
    var type = Blockly.KiwifrootVariables.Global.typeOf(name,workspace)
      || Blockly.KiwifrootVariables.TYPE_ANY;
    variableList.push([variableHash[name], type]);
  }

  return variableList;
};

/**
 * Sets the type of a variable with the given name
 * @param {string} name The variable name
 * @param {string} type The type to change to
 * @param {!Blockly.Workspace} workspace Workspace edit variables in.
 */
Blockly.KiwifrootVariables.Global.changeType = function(name, type, workspace) {

  function changeBlockTypes(name, type) {
    var blocks = workspace.getAllBlocks();
    // Iterate through every block.
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].globalChangeType;
      if (func) {
        func.call(blocks[x], name, type);
      }
    }
  }

  // Loop through the global variables from external scripts
  // If one is found, then that type is used.
  for( var i = 0; i < Blockly.KiwifrootVariables.Global.variables_.length; i++) {
    var vari = Blockly.KiwifrootVariables.Global.variables_[i];
    if( vari[0].toLowerCase() === name.toLowerCase() ) {
      type = vari[1];

      setTimeout(function(){
        // This type is immutable, change it back!
        changeBlockTypes(name, type);
      },1);

      continue;
    }
  }

  changeBlockTypes(name, type);

};

/**
 * Gets the type of a variable with the given name
 * @param {string} name The name of the variable to test
 * @param {!Blockly.Workspace} workspace Workspace query variables in.
 */
Blockly.KiwifrootVariables.Global.typeOf = function(name, workspace){

  for( var i = 0; i < Blockly.KiwifrootVariables.Global.variables_.length; i++) {
    var vari = Blockly.KiwifrootVariables.Global.variables_[i];
    if( vari[0].toLowerCase() === name.toLowerCase() && vari[1] ) {
      return vari[1];
    }
  }

  var blocks = workspace.getAllBlocks();
  // Iterate through every block.
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].globalTypeOf;
    if (func) {
      var type =  func.call(blocks[x], name);
      if (type) return type;
    }
  }
};

/**
 * Find all instances of the specified variable and rename them.
 * @param {string} oldName Variable to rename.
 * @param {string} newName New variable name.
 * @param {!Blockly.Workspace} workspace Workspace rename variables in.
 */
Blockly.KiwifrootVariables.Global.renameVariable = function(oldName, newName, workspace) {

  var blocks = workspace.getAllBlocks();
  // Iterate through every block.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].globalRenameVar) {
      blocks[i].globalRenameVar(oldName, newName);
    }
  }
};

Blockly.KiwifrootVariables.Global.allTypes = function(){
  return [
    /* We don't allow the any type here!
    [Blockly.Msg.VARIABLES_TYPE_ANY,
      Blockly.KiwifrootVariables.TYPE_ANY],*/
    [Blockly.Msg.VARIABLES_TYPE_BOOLEAN || "",
      Blockly.KiwifrootVariables.TYPE_BOOLEAN],
    [Blockly.Msg.VARIABLES_TYPE_NUMBER || "",
      Blockly.KiwifrootVariables.TYPE_NUMBER],
    [Blockly.Msg.VARIABLES_TYPE_STRING || "",
      Blockly.KiwifrootVariables.TYPE_STRING]
  ];
};