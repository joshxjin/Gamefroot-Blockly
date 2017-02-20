/**
 * Created by josh on 14/02/17.
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
 * @fileoverview List blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

//goog.provide('Blockly.Blocks.lists');

goog.require('Blockly.Blocks');

/**
 * Create an object to represent list inputs.
 * @return {object} mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['lists_create_with'].mutationToObject = function() {
    return {
        'items': this.itemCount_
    };
};

/**
 * Parse mutation data to restore the list inputs.
 * @param {object} obj Mutation data object.
 * @this Blockly.Block
 */
Blockly.Blocks['lists_create_with'].objectToMutation = function(obj) {
    this.itemCount_ = obj['items'];
    this.updateShape_();
};

/**
 * Create an object to represent mutation
 * @return {object} mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['lists_getIndex'].mutationToObject = function(){
    var isStatement = !this.outputConnection;
    var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
    return {
        'statement':isStatement,
        'at':isAt
    };
};

/**
 * Parse mutation data to restore mutation.
 * @param {object} obj Mutation data object.
 * @this Blockly.Block
 */
Blockly.Blocks['lists_getIndex'].objectToMutation = function(obj){
    var isStatement = obj.statement;
    this.updateStatement_(isStatement);
    var isAt = obj.at;
    this.updateAt_(isAt);
};

/**
 * Create an object to represent mutation
 * @return {object} mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['lists_setIndex'].mutationToObject = function(){
    var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
    return {
        'at':isAt
    };
};

/**
 * Parse mutation data to restore mutation.
 * @param {object} obj Mutation data object.
 * @this Blockly.Block
 */
Blockly.Blocks['lists_setIndex'].objectToMutation = function(obj){
    var isAt = obj.at;
    this.updateAt_(isAt);
};

/**
 * Create an object to represent mutation
 * @return {object} mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['lists_getSublist'].mutationToObject = function(){
    var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
    var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
    return {
        'at1':isAt1,
        'at2':isAt2
    };
};

/**
 * Parse mutation data to restore mutation.
 * @param {object} obj Mutation data object.
 * @this Blockly.Block
 */
Blockly.Blocks['lists_getSublist'].objectToMutation = function(obj){
    var isAt1 = obj.at1;
    var isAt2 = obj.at2;
    this.updateAt_(1, isAt1);
    this.updateAt_(2, isAt2);
};

/**
 * Create an object to represent mutation
 * @return {object} mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['lists_split'].mutationToObject = function(){
    return {
        'mode': this.getFieldValue('MODE')
    };
};

/**
 * Parse mutation data to restore mutation.
 * @param {object} obj Mutation data object.
 * @this Blockly.Block
 */
Blockly.Blocks['lists_split'].objectToMutation = function(obj){
    this.updateType_( obj.mode );
};

Blockly.Blocks['lists_add'] = {
    init: function() {
        this.setHelpUrl( Blockly.Msg.LISTS_ADD_HELPURL );
        this.setColour(Blockly.Variables.COLOUR.OPERATORS);
        this.appendValueInput("LIST")
            .setCheck("Array")
            .appendField( Blockly.Msg.LISTS_ADD_MESSAGE_ONE );
        this.appendValueInput("INPUT")
            .appendField( Blockly.Msg.LISTS_ADD_MESSAGE_TWO );
        this.appendDummyInput()
            .appendField( Blockly.Msg.LISTS_ADD_MESSAGE_THREE )
            .appendField(new Blockly.FieldDropdown([
                ["end", "end"],
                ["front", "front"]
            ]), "POSITION");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip( Blockly.Msg.LISTS_ADD_TOOLTIP );
    }
};