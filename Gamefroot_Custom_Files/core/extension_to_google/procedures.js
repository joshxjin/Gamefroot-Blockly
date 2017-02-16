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
 * @fileoverview Utility functions for handling procedures.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';


// This is Gamefroot customised google core blockly code from
// /core/procedures.js and overrides the core defined
// Blockly.Procedures.flyoutCategory function

// TODO(scr): Fix circular dependencies
// goog.require('Blockly.Block');
goog.require('Blockly.Field');
goog.require('Blockly.Names');
goog.require('Blockly.Workspace');

/**
 * Construct the blocks required by the flyout for the procedure category.
 * @param {!Array.<!Blockly.Block>} blocks List of blocks to show.
 * @param {!Array.<number>} gaps List of widths between blocks.
 * @param {number} margin Standard margin width for calculating gaps.
 * @param {!Blockly.Workspace} workspace The flyout's workspace.
 */
Blockly.Procedures.flyoutCategory = function(blocks, gaps, margin, workspace) {
    if (Blockly.Blocks['procedures_defnoreturn_local']) {
        var block = Blockly.Block.obtain(workspace, 'procedures_defnoreturn_local');
        typeof block.postInit === 'function' && block.postInit.call(block);
        block.initSvg();
        blocks.push(block);
        gaps.push(margin * 2);
    }
    if (Blockly.Blocks['procedures_defreturn_local']) {
        var block = Blockly.Block.obtain(workspace, 'procedures_defreturn_local');
        typeof block.postInit === 'function' && block.postInit.call(block);
        block.initSvg();
        blocks.push(block);
        gaps.push(margin * 2);
    }
    if (Blockly.Blocks['procedures_ifreturn']) {
        var block = Blockly.Block.obtain(workspace, 'procedures_ifreturn');
        typeof block.postInit === 'function' && block.postInit.call(block);
        block.initSvg();
        blocks.push(block);
        gaps.push(margin * 2);
    }
    if (gaps.length) {
        // Add slightly larger gap between system blocks and user calls.
        gaps[gaps.length - 1] = margin * 3;
    }

    function populateProcedures(procedureList, templateName) {
        for (var x = 0; x < procedureList.length; x++) {
            var block = Blockly.Block.obtain(workspace, templateName);
            block.setFieldValue(procedureList[x][0], 'NAME');
            var tempIds = [];
            for (var t = 0; t < procedureList[x][1].length; t++) {
                tempIds[t] = 'ARG' + t;
            }
            block.setProcedureParameters(procedureList[x][1], tempIds);
            typeof block.postInit === 'function' && block.postInit.call(block);
            block.initSvg();
            blocks.push(block);
            gaps.push(margin * 2);
        }
    }

    var tuple = Blockly.Procedures.allProcedures(workspace.targetWorkspace);

    populateProcedures(tuple[0], 'procedures_callnoreturn_local');
    populateProcedures(tuple[1], 'procedures_callreturn_local');
};