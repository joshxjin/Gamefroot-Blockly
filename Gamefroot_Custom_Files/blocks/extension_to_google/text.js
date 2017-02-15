/**
 * Created by josh on 15/02/17.
 */

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
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

//goog.provide('Blockly.Blocks.texts');

goog.require('Blockly.Blocks');

/**
 * Create an image of an open or closed quote.
 * @param {boolean} open True if open quote, false if closed.
 * @return {!Blockly.FieldImage} The field image of the quote.
 * @private
 */
Blockly.Blocks['text'].newQuote_ = function(open) {
    if (open == Blockly.RTL) {
        var file = 'quote1.png';
    } else {
        var file = 'quote0.png';
    }
    var workspace = Blockly.mainWorkspace || this.workspace;
    return new Blockly.FieldImage(workspace.options.pathToMedia + file, 12, 12, '"');
};

/**
 * Create an object to represent number of text inputs.
 * @return {object} the mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['text_join'].mutationToObject = function(){
    return {
        'items': this.itemCount_
    };
};

/**
 * Parse object to restore the text inputs.
 * @param {object} obj The mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['text_join'].objectToMutation = function(obj) {
    this.itemCount_ = obj['items'];
    this.updateShape_();
};

/**
 * Modify this block to have the correct number of inputs.
 * @private
 * @this Blockly.Block
 */
Blockly.Blocks['text_join'].updateShape_ = function() {
    // Delete everything.
    if (this.getInput('EMPTY')) {
        this.removeInput('EMPTY');
    } else {
        var i = 0;
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
    }
    // Rebuild block.
    if (this.itemCount_ == 0) {
        this.appendDummyInput('EMPTY')
            .appendField(new Blockly.FieldImage(Blockly.mainWorkspace.options.pathToMedia +
                'quote0.png', 12, 12, '"'))
            .appendField(new Blockly.FieldImage(Blockly.mainWorkspace.options.pathToMedia +
                'quote1.png', 12, 12, '"'));
    } else {
        for (var i = 0; i < this.itemCount_; i++) {
            var input = this.appendValueInput('ADD' + i);
            if (i == 0) {
                input.appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH);
            }
        }
    }
};

//deleted by Gamefroot
Blockly.Blocks['text_join'].newQuote_ = null;

/**
 * Iterator is always a number type, return this.
 * @return {string}
 * @this Blockly.Block
 */
Blockly.Blocks['text_append'].typeOf = function(name) {
    if (Blockly.Names.equals(name, this.getFieldValue('VAR'))) {
        return Blockly.Variables.TYPE_STRING;
    }
    else return undefined;
};

/**
 * Notfication that the workspace wants to change this variables type.
 * We can not change type! This is immutable.
 * @this Blockly.Block
 */
Blockly.Blocks['text_append'].changeType = function(name, type) {
    if (Blockly.Names.equals(name, this.getFieldValue('VAR'))) {
        //Is the type different?
        if( type !== this.typeOf(name) ) {
            setTimeout(function(){
                // This type is immutable, change it back!
                Blockly.Variables.changeType(name, Blockly.Variables.TYPE_STRING,
                    Blockly.mainWorkspace);
            },1);
        }
    }
};

/**
 * Create an object to represent number of text inputs.
 * @return {object} the mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['text_charAt'].mutationToObject = function(){
    var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
    return {
        'at': isAt
    };
};

/**
 * Parse object to restore the text inputs.
 * @param {object} obj The mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['text_charAt'].objectToMutation = function(obj) {
    var isAt = obj['at'];
    this.updateAt_(isAt);
};

/**
 * Create an object to represent number of text inputs.
 * @return {object} the mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['text_getSubstring'].mutationToObject = function(){
    var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
    var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
    return {
        'at1': isAt1,
        'at2': isAt2
    };
};

/**
 * Parse object to restore the text inputs.
 * @param {object} obj The mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['text_getSubstring'].objectToMutation = function(obj) {
    var isAt1 = obj['at1'];
    var isAt2 = obj['at2'];
    this.updateAt_(1, isAt1);
    this.updateAt_(2, isAt2);
};

Blockly.Blocks['text_prompt_number'] = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
        this.setColour( Blockly.Variables.COLOUR.OPERATORS);

        this.appendValueInput("TEXT")
            .setCheck("String")
            .appendField(Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER);


        this.setOutput(true, "Number");
        this.setTooltip(Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER);
    }
};

Blockly.Blocks['text_prompt_string'] = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
        this.setColour( Blockly.Variables.COLOUR.OPERATORS );
        this.appendValueInput('TEXT')
            .setCheck("String")
            .appendField(Blockly.Msg.TEXT_PROMPT_TYPE_TEXT);


        this.setOutput(true, "String");
        this.setTooltip(Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT);
    }
};

Blockly.Blocks['text_prompt'] = {
    /**
     * Block for prompt function (internal message).
     * @this Blockly.Block
     */
    init: function() {
        var TYPES =
            [[Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, 'TEXT'],
                [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, 'NUMBER']];
        // Assign 'this' to a variable for use in the closure below.
        var thisBlock = this;
        this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
        this.setColour( Blockly.Variables.COLOUR.OPERATORS );
        var dropdown = new Blockly.FieldDropdown(TYPES, function(newOp) {
            if (newOp == 'NUMBER') {
                thisBlock.setOutput(true, 'Number');
                thisBlock.setColour(Blockly.Variables.COLOUR_NUMBER);
            } else {
                thisBlock.setOutput(true, 'String');
                thisBlock.setColour(Blockly.Variables.COLOUR_STRING);
            }
        });
        this.appendDummyInput()
            .appendField(dropdown, 'TYPE')
            .appendField(this.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(this.newQuote_(false));
        this.setOutput(true, 'String');
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            return (thisBlock.getFieldValue('TYPE') == 'TEXT') ?
                Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT :
                Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER;
        });
    },
    newQuote_: Blockly.Blocks['text'].newQuote_
};

Blockly.Blocks['text_prompt_ext'] = {
    /**
     * Block for prompt function (external message).
     * @this Blockly.Block
     */
    init: function() {
        var TYPES =
            [[Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, 'TEXT'],
                [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, 'NUMBER']];
        // Assign 'this' to a variable for use in the closure below.
        var thisBlock = this;
        this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
        this.setColour( Blockly.Variables.COLOUR.OPERATORS );
        var dropdown = new Blockly.FieldDropdown(TYPES, function( type ) {
            if (type == 'NUMBER') {
                thisBlock.setOutput(true, 'Number');
                thisBlock.setColour(Blockly.Variables.COLOUR_NUMBER);
                thisBlock.getInput('TEXT').setCheck('String');
            } else {
                thisBlock.setOutput(true, 'String');
                thisBlock.setColour(Blockly.Variables.COLOUR_STRING);
                thisBlock.getInput('TEXT').setCheck('String');
            }
        });
        this.appendValueInput('TEXT')
            .appendField(dropdown, 'TYPE');
        this.setOutput(true, 'String');
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            return (thisBlock.getFieldValue('TYPE') == 'TEXT') ?
                Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT :
                Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER;
        });
    }
};