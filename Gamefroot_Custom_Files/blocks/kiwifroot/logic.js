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
 * @fileoverview Logic blocks for Blockly.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.logic');

goog.require('Blockly.Blocks');

/**
 * Create object to represent the number of else-if and else inputs.
 * @return {object} Object to store mutation.
 * @this Blockly.Block
 */
Blockly.Blocks['controls_if'].mutationToObject = function(){
    if (!this.elseifCount_ && !this.elseCount_) {
        return null;
    }
    var obj = {};
    if (this.elseifCount_) {
        obj['elseif'] = this.elseifCount_;
    }
    if (this.elseCount_) {
        obj['else'] = 1;
    }
    return obj;
};

/**
 * Restores a mutation from a JSON object.
 * @param {object} obj JSON storage element.
 * @this Blockly.Block
 */
Blockly.Blocks['controls_if'].objectToMutation = function(obj){
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    if (obj['elseif']) this.elseifCount_ = obj['elseif'];
    if (obj['else']) this.elseCount_ = obj['else'];
    for (var i = 1; i <= this.elseifCount_; i++) {
        this.appendValueInput('IF' + i)
            .setCheck('Boolean')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
        this.appendStatementInput('DO' + i)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    }
    if (this.elseCount_) {
        this.appendStatementInput('ELSE')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    }
};

/**
 * Override this method to add custom Gamefroot code, then run the default onchange() method.
 *
 * Called whenever anything on the workspace changes.
 * Prevent mismatched types from being compared.
 * @this Blockly.Block
 */
Blockly.Blocks['logic_compare'].onchange = function() {
    if (!this.workspace) {
        // Block has been deleted.
        return;
    }
    Blockly.Blocks['logic_compare'].onchange(); //run default onchange() method.
};

/**
 * This is a deleted method by Gamefroot, override to make it do nothing.
 * Commented out code is the original Google code.
 *
 * Called whenever anything on the workspace changes.
 * Prevent mismatched types.
 * @this Blockly.Block
 */
Blockly.Blocks['logic_ternary'].onchange = function() {
    /*
    var blockA = this.getInputTargetBlock('THEN');
    var blockB = this.getInputTargetBlock('ELSE');
    var parentConnection = this.outputConnection.targetConnection;
    // Disconnect blocks that existed prior to this change if they don't match.
    if ((blockA || blockB) && parentConnection) {
        for (var i = 0; i < 2; i++) {
            var block = (i == 1) ? blockA : blockB;
            if (block && !block.outputConnection.checkType_(parentConnection)) {
                if (parentConnection === this.prevParentConnection_) {
                    this.setParent(null);
                    parentConnection.sourceBlock_.bumpNeighbours_();
                } else {
                    block.setParent(null);
                    block.bumpNeighbours_();
                }
            }
        }
    }
    this.prevParentConnection_ = parentConnection;
    */
};