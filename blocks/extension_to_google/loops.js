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
 * @fileoverview Loop blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

//goog.provide('Blockly.Blocks.loops');

goog.require('Blockly.Blocks');

/**
 * Block for repeat n times (internal number).
 * @this Blockly.Block
 */
Blockly.Blocks['controls_repeat'].init = function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_REPEAT_HELPURL);
    this.setColour( Blockly.Variables.COLOUR.CONTROL );
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
        .appendField(new Blockly.FieldTextInput('10',
            Blockly.FieldTextInput.nonnegativeIntegerValidator), 'TIMES')
        .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_TIMES);
    this.appendStatementInput('DO')
        .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_REPEAT_TOOLTIP);
};

/**
 * Block for 'for' loop.
 * @this Blockly.Block
 */
Blockly.Blocks['controls_for_local'].init = function() {

    //Statement input
    this.jsonInit({
        "message0": Blockly.Msg.CONTROLS_FOR_TITLE,
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": null,
                "scope": Blockly.FieldVariable.SCOPE.LOCAL
            },
            {
                "type": "input_value",
                "name": "FROM",
                "check": "Number",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "TO",
                "check": "Number",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "BY",
                "check": "Number",
                "align": "RIGHT"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": Blockly.Variables.COLOUR.CONTROL,
        "helpUrl": Blockly.Msg.CONTROLS_FOR_HELPURL
    });
    this.appendStatementInput('DO')
        .appendField(Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO);
};

Blockly.Blocks['controls_for_local'].localGetVars = function() {
    return [this.getFieldValue('VAR')];
};

/**
 * Iterator is always a number type, return this.
 * @return {string}
 * @this Blockly.Block
 */
Blockly.Blocks['controls_for_local'].localTypeOf = function(name) {
    if (Blockly.Names.equals(name, this.getFieldValue('VAR'))) {
        return Blockly.Variables.TYPE_NUMBER;
    }
    else return undefined;
};
/**
 * Indicates whether the variable used is immutable or not.
 * @return {boolean}
 */
Blockly.Blocks['controls_for_local'].localIsImmutable = function() {
    return true;
};
/**
 * Notfication that the workspace wants to change this variables type.
 * We can not change type! This is immutable.
 * @this Blockly.Block
 */
Blockly.Blocks['controls_for_local'].localChangeType = function(name, type) {
    if (Blockly.Names.equals(name, this.getFieldValue('VAR'))) {
        //Is the type different?
        if( type !== this.localTypeOf(name) ) {
            setTimeout(function(){
                // This type is immutable, change it back!
                Blockly.Variables.Local.changeType(name, Blockly.Variables.TYPE_NUMBER,
                    Blockly.mainWorkspace);
            },1);
        }
    }
};
/**
 * Notification that a variable is renaming.
 * If the name matches one of this block's variables, rename it.
 * @param {string} oldName Previous name of variable.
 * @param {string} newName Renamed variable.
 * @this Blockly.Block
 */
Blockly.Blocks['controls_for_local'].localRenameVar = function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
        this.setFieldValue(newName, 'VAR');
    }
};
/**
 * Add menu option to create getter block for loop variable.
 * @param {!Array} options List of menu options to add to.
 * @this Blockly.Block
 */
Blockly.Blocks['controls_for_local'].customContextMenu = function(options) {
    if (!this.isCollapsed()) {
        var option = {enabled: true};
        var name = this.getFieldValue('VAR');
        option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
        var xmlField = goog.dom.createDom('field', null, name);
        xmlField.setAttribute('name', 'VAR');
        var xmlBlock = goog.dom.createDom('block', null, xmlField);
        xmlBlock.setAttribute('type', 'variables_local_get');
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);
    }
};

Blockly.Blocks['controls_forEach_local'] = {
    /**
     * Block for 'for each' loop.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_FOREACH_HELPURL);
        this.setColour(Blockly.Variables.COLOUR.CONTROL);
        this.appendValueInput('LIST')
            .setCheck('Array')
            .appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_ITEM)
            .appendField(new Blockly.FieldVariable(null, null, Blockly.FieldVariable.SCOPE.LOCAL), 'VAR')
            .appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST);
        if (Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST_TAIL) {
            this.appendDummyInput()
                .appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST_TAIL);
            this.setInputsInline(true);
        }
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            return Blockly.Msg.CONTROLS_FOREACH_TOOLTIP.replace('%1',
                thisBlock.getFieldValue('VAR'));
        });
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    localGetVars: function() {
        return [this.getFieldValue('VAR')];
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    localRenameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    },
    customContextMenu: Blockly.Blocks['controls_for_local'].customContextMenu
};