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
 * @fileoverview Flyout tray containing blocks which may be created.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// goog.provide('Blockly.Flyout');

goog.require('Blockly.Block');
goog.require('Blockly.Comment');
goog.require('Blockly.WorkspaceSvg');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.math.Rect');
goog.require('goog.userAgent');


Blockly.Flyout.prototype.GAP = 10;

Blockly.Flyout.prototype.CORNER_RADIUS = 1;

Blockly.Flyout.prototype.MARGIN = 5;

//NB: "Custom hack" comment comes from GameFroot
Blockly.Flyout.prototype.show = function (xmlList) {
    this.hide();
    // Delete any blocks from a previous showing.
    var blocks = this.workspace_.getTopBlocks(false);
    for (var x = 0, block; block = blocks[x]; x++) {
        if (block.workspace == this.workspace_) {
            block.dispose(false, false);
        }
    }

    // Delete any background buttons from a previous showing.
    for (var x = 0, rect; rect = this.buttons_[x]; x++) {
        goog.dom.removeNode(rect);
    }
    this.buttons_.length = 0;

    var margin = this.CORNER_RADIUS + this.MARGIN;
    this.svgGroup_.style.display = 'block';

    // Create the blocks to be shown in this flyout.
    var blocks = [];
    var gaps = [];
    if (xmlList == Blockly.Variables.NAME_TYPE) {
        // Special category for variables.
        Blockly.Variables.flyoutCategory(blocks, gaps, margin, /** @type {!Blockly.Workspace} */ (this.workspace_));

    } else if (xmlList == Blockly.Procedures.NAME_TYPE) {
        // Special category for procedures.
        Blockly.Procedures.flyoutCategory(blocks, gaps, margin, /** @type {!Blockly.Workspace} */ (this.workspace_));

    } else {

        //CUSTOM HACK: Support blocks with variables...

        for (var i = 0, xml; xml = xmlList[i]; i++) {
            if (xml.tagName && xml.tagName.toUpperCase() == 'BLOCK') {
                var block = Blockly.Xml.domToBlock(/** @type {!Blockly.Workspace} */ (this.workspace_), xml);
                blocks.push(block);
                gaps.push(margin * 3);
            } else if (xml === Blockly.Variables.NAME_TYPE) {
                Blockly.Variables.flyoutCategory(blocks, gaps, margin, (this.workspace_));

            } else if (xml === Blockly.Procedures.NAME_TYPE) {
                Blockly.Procedures.flyoutCategory(blocks, gaps, margin, (this.workspace_));

            }

        }
    }
};

//NB: "Custom hack" comment comes from GameFroot
Blockly.Flyout.prototype.filterForCapacity_ = function () {
    var remainingCapacity = this.targetWorkspace_.remainingCapacity();
    var blocks = this.workspace_.getTopBlocks(false);
    for (var i = 0, block; block = blocks[i]; i++) {
        var allBlocks = block.getDescendants();
        //CUSTOM HACK: Only disable the block if it isn't already
        if (!block.disabled) {
            var disabled = allBlocks.length > remainingCapacity;
            block.setDisabled(disabled);
        }
    }
};