/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview All the deprecated Kiwifroot Javascript generators
 * @author rani_sputnik@hotmail.com (Ryan Loader)
 */
'use strict';

goog.require('Blockly.Kiwifroot');

// 12 - 02 - 2015

Blockly.Kiwifroot['kiwi_classes_selector'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var code = "'" + dropdown_name + "'";
  return [code, Blockly.Kiwifroot.ORDER_ATOMIC];
};

// 12 - 02 - 2015

Blockly.Kiwifroot['kiwi_messaging_class'] = function(block) {
  var value_message = Blockly.Kiwifroot.valueToCode(block, 'MESSAGE', Blockly.Kiwifroot.ORDER_ATOMIC);
  var value_class = Blockly.Kiwifroot.valueToCode(block, 'CLASS', Blockly.Kiwifroot.ORDER_ATOMIC);

  var code  = 'var classes = this.state.getAllChildrenByName(' + value_class +');\n' +
  			  'for( var i = 0; i < classes.length; i++) {\n' +
  			  '\tclasses[ i ].properties.set("_messaging_", ' + value_message + ');\n' +
  			  '}\n';

  return code;
};

// 12 - 02 - 2015

Blockly.Kiwifroot['kiwi_event_stage_press'] = function(block) {
  var funcName = defineFunctionFromBranch('onStagePress', block);
  var constructorCode = 'this.game.input.onDown.add(this.'+funcName+', this, 25);';
  var destructorCode = 'this.game.input.onDown.remove(this.'+funcName+', this, 25);';

  Blockly.Kiwifroot.provideAddition(Blockly.Kiwifroot.CONSTRUCTOR,constructorCode);
  Blockly.Kiwifroot.provideAddition(Blockly.Kiwifroot.DESTRUCTOR, destructorCode);
  return null;
};

// 12 - 02 - 2015

Blockly.Kiwifroot['kiwi_event_stage_release'] = function(block) {
  var funcName = defineFunctionFromBranch('onStageRelease', block);
  var constructorCode = 'this.game.input.onUp.add(this.'+funcName+', this, 25);';
  var destructorCode = 'this.game.input.onUp.remove(this.'+funcName+', this, 25);';

  Blockly.Kiwifroot.provideAddition(Blockly.Kiwifroot.CONSTRUCTOR,constructorCode);
  Blockly.Kiwifroot.provideAddition(Blockly.Kiwifroot.DESTRUCTOR, destructorCode);
  return null;
};

// 12 - 02 - 2015

Blockly.Kiwifroot['kiwi_event_inst_press'] = function(block) {
  // Create an onPressed function with the onPressed section
  var t = Blockly.Kiwifroot.INDENT;
  var SECTION_EVENT_PRESSED = 'EVENT_PRESSED';
  var funcName = Blockly.Kiwifroot.provideFunction_(
    'onInstancePressed',
    [ Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + ' = function(x,y) {',
        '{{,'+SECTION_EVENT_PRESSED+',\n}}',
        '};']);
  // Add the add/remove listeners in the constructor/desctructor
  var constructorCode = 'this.game.input.onDown.add(this.'+funcName+', this, 50);';
  var destructorCode = 'this.game.input.onDown.remove(this.'+funcName+', this);';
  Blockly.Kiwifroot.provideAdditionOnce('EventPressed',Blockly.Kiwifroot.CONSTRUCTOR, constructorCode);
  Blockly.Kiwifroot.provideAdditionOnce('EventPressed',Blockly.Kiwifroot.DESTRUCTOR, destructorCode);
  // Add the code into the onPressed function
  var inst = Blockly.Kiwifroot.valueToCode(block, 'INST', Blockly.Kiwifroot.ORDER_ATOMIC) || '(null)';
  var branch = Blockly.Kiwifroot.statementToCode(block, 'STACK');
    var code = 'if ('+inst+'.box.worldHitbox.contains(x,y)) {\n' + branch + '}';  
    code = Blockly.Kiwifroot.prefixLines(code, Blockly.Kiwifroot.INDENT);
  Blockly.Kiwifroot.provideAddition(SECTION_EVENT_PRESSED,code);
  return null;
};

// 12 - 02 - 2015

Blockly.Kiwifroot['kiwi_event_inst_release'] = function(block) {
  // Create an onPressed function with the onPressed section
  var t = Blockly.Kiwifroot.INDENT;
  var SECTION_EVENT_RELEASED = 'EVENT_RELEASED';
  var funcName = Blockly.Kiwifroot.provideFunction_(
    'onInstanceReleased',
    [ Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + ' = function(x,y) {',
        '{{,'+SECTION_EVENT_RELEASED+',\n}}',
        '};']);
  // Add the add/remove listeners in the constructor/desctructor
  var constructorCode = 'this.game.input.onUp.add(this.'+funcName+', this, 50);';
  var destructorCode = 'this.game.input.onUp.remove(this.'+funcName+', this);';
  Blockly.Kiwifroot.provideAdditionOnce('EventReleased',Blockly.Kiwifroot.CONSTRUCTOR, constructorCode);
  Blockly.Kiwifroot.provideAdditionOnce('EventReleased',Blockly.Kiwifroot.DESTRUCTOR, destructorCode);
  // Add the code into the onPressed function
  var inst = Blockly.Kiwifroot.valueToCode(block, 'INST', Blockly.Kiwifroot.ORDER_ATOMIC) || '(null)';
  var branch = Blockly.Kiwifroot.statementToCode(block, 'STACK');
    var code = 'if ('+inst+'.box.worldHitbox.contains(x,y)) {\n' + branch + '}';  
    code = Blockly.Kiwifroot.prefixLines(code, Blockly.Kiwifroot.INDENT);
  Blockly.Kiwifroot.provideAddition(SECTION_EVENT_RELEASED,code);
  return null;
};

// 12 - 02 - 2015

Blockly.Kiwifroot['kiwi_event_key_press'] = function(block) {
  var t = Blockly.Kiwifroot.INDENT;
  var funcName = Blockly.Kiwifroot.provideFunction_(
    'onKeyPressed',
    [ Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + ' = function(keyCode) {',
        t + 'switch (keyCode) {',
        '{{'+t+t+',EVENT_KEY_PRESSED,\n}}',
        t + '}',
        '};']);
  // Add the remove function
  var destructorCode = 'this.game.input.keyboard.onKeyDownOnce.remove(this.' + funcName + ', this);';
  Blockly.Kiwifroot.provideAdditionOnce('removeOnKeyPressed',Blockly.Kiwifroot.DESTRUCTOR, destructorCode);

  // Generate the new function
  var keyCode = Blockly.Kiwifroot.valueToCode(block, 'KEY', Blockly.Kiwifroot.ORDER_ASSIGNMENT)
  var constructorCode = 'this.game.input.keyboard.onKeyDownOnce.add(this.' + funcName + ', this);';
  Blockly.Kiwifroot.provideAdditionOnce('EventKeyPressed', Blockly.Kiwifroot.CONSTRUCTOR, constructorCode);
  var funcName = defineFunctionFromBranch('onKeyPressed', block);
  // Generate the code for the switch statement and add it
  var code = 'case '+keyCode+': this.'+funcName+'(); break;';

  Blockly.Kiwifroot.provideAddition('EVENT_KEY_PRESSED', code);
  return null;
};

// 12 - 02 - 2015

Blockly.Kiwifroot['kiwi_event_key_release'] = function(block) {
  var t = Blockly.Kiwifroot.INDENT;
  var funcName = Blockly.Kiwifroot.provideFunction_(
    'onKeyReleased',
    [ Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + ' = function(keyCode) {',
        t + 'switch (keyCode) {',
        '{{'+t+t+',EVENT_KEY_RELEASED,\n}}',
        t + '}',
        '};']);
  // Add the remove function
  var destructorCode = 'this.game.input.keyboard.onKeyUp.remove(this.' + funcName + ', this);';
  Blockly.Kiwifroot.provideAdditionOnce('removeOnKeyReleased',Blockly.Kiwifroot.DESTRUCTOR, destructorCode);

  // Generate the code for the new function
  var keyCode = Blockly.Kiwifroot.valueToCode(block, 'KEY', Blockly.Kiwifroot.ORDER_ASSIGNMENT);
  var constructorCode = 'this.game.input.keyboard.onKeyUp.add(this.' + funcName + ', this);';

  Blockly.Kiwifroot.provideAdditionOnce('EventKeyReleased', Blockly.Kiwifroot.CONSTRUCTOR, constructorCode);

  var funcName = defineFunctionFromBranch('onKeyReleased', block);

  // Generate the code for the switch
  var code = 'case '+keyCode+': this.'+funcName+'(); break;';
  Blockly.Kiwifroot.provideAddition('EVENT_KEY_RELEASED', code);
  return null;
};