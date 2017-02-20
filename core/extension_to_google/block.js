/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2011 Google Inc.
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
 * @fileoverview The class representing one block.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// 'provide" commented out
//goog.provide('Blockly.Block');

goog.require('Blockly.Blocks');
goog.require('Blockly.Comment');
goog.require('Blockly.Connection');
goog.require('Blockly.Input');
goog.require('Blockly.Mutator');
goog.require('Blockly.Warning');
goog.require('Blockly.Workspace');
goog.require('Blockly.Xml');

//The following two "requires" are specific to Kiwifroot
goog.require('Blockly.Json');
goog.require('goog.Timer');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.math.Coordinate');
goog.require('goog.string');


//Kiwifroot code

/**
 * Obtain a newly created block.
 * @param {!Blockly.Workspace} workspace The block's workspace.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @return {!Blockly.Block} The created block
 */

//'xmlBlock' variable added to function in Kiwifroot code
Blockly.Block.obtain = function(workspace, prototypeName, xmlBlock) {
  if (Blockly.Realtime.isEnabled()) {
    return Blockly.Realtime.obtainBlock(workspace, prototypeName, xmlBlock);
  } else {
    if (workspace.rendered) {
      var newBlock = new Blockly.BlockSvg();
    } else {
      var newBlock = new Blockly.Block();
    }
    newBlock.initialize(workspace, prototypeName, xmlBlock);
    return newBlock;
  }
};

/**
 * Initialization for one block.
 * @param {!Blockly.Workspace} workspace The new block's workspace.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 */

//'xmlBlock' variable added to function in Kiwifroot code
Blockly.Block.prototype.initialize = function(workspace, prototypeName, xmlBlock) {
  /** @type {string} */
  this.id = Blockly.Blocks.genUid();
  workspace.addTopBlock(this);
  this.fill(workspace, prototypeName, xmlBlock);
};

/**
 * Fill a block with initial values.
 * @param {!Blockly.Workspace} workspace The workspace to use.
 * @param {string} prototypeName The typename of the block.
 */

//'xmlBlock' variable added to function in Kiwifroot code
Blockly.Block.prototype.fill = function(workspace, prototypeName, xmlBlock) {
  /** @type {Blockly.Connection} */
  this.outputConnection = null;
  /** @type {Blockly.Connection} */
  this.nextConnection = null;
  /** @type {Blockly.Connection} */
  this.previousConnection = null;
  /** @type {!Array.<!Blockly.Input>} */
  this.inputList = [];
  /** @type {boolean|undefined} */
  this.inputsInline = undefined;
  /** @type {boolean} */
  this.rendered = false;
  /** @type {boolean} */
  this.disabled = false;
  /** @type {string|!Function} */
  this.tooltip = '';
  /** @type {boolean} */
  this.contextMenu = true;

  /** @type {Blockly.Block} */
  this.parentBlock_ = null;
  /** @type {!Array.<!Blockly.Block>} */
  this.childBlocks_ = [];
  /** @type {boolean} */
  this.deletable_ = true;
  /** @type {boolean} */
  this.movable_ = true;
  /** @type {boolean} */
  this.editable_ = true;
  /** @type {boolean} */
  this.isShadow_ = false;
  /** @type {boolean} */
  this.collapsed_ = false;

  /** @type {string|Blockly.Comment} */
  this.comment = null;

  /** @type {!goog.math.Coordinate} */
  this.xy_ = new goog.math.Coordinate(0, 0);

  /** @type {!Blockly.Workspace} */
  this.workspace = workspace;
  /** @type {boolean} */
  this.isInFlyout = workspace.isFlyout;
  /** @type {boolean} */
  this.RTL = workspace.RTL;

  // Copy the type-specific functions and data from the prototype.
  if (prototypeName) {
    /** @type {string} */
    this.type = prototypeName;
    var prototype = Blockly.Blocks[prototypeName];
    goog.asserts.assertObject(prototype,
        'Error: "%s" is an unknown language block.', prototypeName);
    goog.mixin(this, prototype);
  }
  // Call an initialization function, if it exists.
  if (goog.isFunction(this.init)) {
    this.init(xmlBlock);
  }
  // Record initial inline state.
  /** @type {boolean|undefined} */
  this.inputsInlineDefault = this.inputsInline;
};

/**
 * Interpolate a message description onto the block.
 * @param {string} message Text contains interpolation tokens (%1, %2, ...)
 *     that match with fields or inputs defined in the args array.
 * @param {!Array} args Array of arguments to be interpolated.
 * @param {=string} lastDummyAlign If a dummy input is added at the end,
 *     how should it be aligned?
 * @private
 */
Blockly.Block.prototype.interpolate_ = function(message, args, lastDummyAlign) {
  var tokens = Blockly.tokenizeInterpolation(message);
  // Interpolate the arguments.  Build a list of elements.
  var indexDup = [];
  var indexCount = 0;
  var elements = [];
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (typeof token == 'number') {
      goog.asserts.assert(token > 0 && token <= args.length,
          'Message index "%s" out of range.', token);
      goog.asserts.assert(!indexDup[token],
          'Message index "%s" duplicated.', token);
      indexDup[token] = true;
      indexCount++;
      elements.push(args[token - 1]);
    } else {
      token = token.trim();
      if (token) {
        elements.push(token);
      }
    }
  }
  goog.asserts.assert(indexCount == args.length,
      'Message does not reference all %s arg(s).', args.length);
  // Add last dummy input if needed.
  if (elements.length && (typeof elements[elements.length - 1] == 'string' ||
      elements[elements.length - 1]['type'].indexOf('field_') == 0)) {
    var input = {type: 'input_dummy'};
    if (lastDummyAlign) {
      input['align'] = lastDummyAlign;
    }
    elements.push(input);
  }
  // Lookup of alignment constants.
  var alignmentLookup = {
    'LEFT': Blockly.ALIGN_LEFT,
    'RIGHT': Blockly.ALIGN_RIGHT,
    'CENTRE': Blockly.ALIGN_CENTRE
  };
  // Populate block with inputs and fields.
  var fieldStack = [];
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (typeof element == 'string') {
      fieldStack.push([element, undefined]);
    } else {
      var field = null;
      var input = null;
      do {
        var altRepeat = false;
        switch (element['type']) {
          case 'input_value':
            input = this.appendValueInput(element['name']);
            break;
          case 'input_statement':
            input = this.appendStatementInput(element['name']);
            break;
          case 'input_dummy':
            input = this.appendDummyInput(element['name']);
            break;
          case 'field_label':
            field = new Blockly.FieldLabel(element['text']);
            break;
          case 'field_input':
            field = new Blockly.FieldTextInput(element['text']);
            if (typeof element['spellcheck'] == 'boolean') {
              field.setSpellcheck(element['spellcheck']);
            }
            break;
          case 'field_angle':
            field = new Blockly.FieldAngle(element['angle']);
            break;
          case 'field_checkbox':
            field = new Blockly.FieldCheckbox(
                element['checked'] ? 'TRUE' : 'FALSE');
            break;
          case 'field_colour':
            field = new Blockly.FieldColour(element['colour']);
            break;
          case 'field_variable':

            //This is a line of Kiwifroot code
            field = new Blockly.FieldVariable(element['variable'], null, element['scope']);

            break;
          case 'field_dropdown':
            field = new Blockly.FieldDropdown(element['options']);
            break;
          case 'field_image':
            field = new Blockly.FieldImage(element['src'],
                element['width'], element['height'], element['alt']);
            break;
          case 'field_date':
            if (Blockly.FieldDate) {
              field = new Blockly.FieldDate(element['date']);
              break;
            }
            // Fall through if FieldDate is not compiled in.
          default:
            // Unknown field.
            if (element['alt']) {
              element = element['alt'];
              altRepeat = true;
            }
        }
      } while (altRepeat);
      if (field) {
        fieldStack.push([field, element['name']]);
      } else if (input) {
        if (element['check']) {
          input.setCheck(element['check']);
        }
        if (element['align']) {
          input.setAlign(alignmentLookup[element['align']]);
        }
        for (var j = 0; j < fieldStack.length; j++) {
          input.appendField(fieldStack[j][0], fieldStack[j][1]);
        }
        fieldStack.length = 0;
      }
    }
  }
};
