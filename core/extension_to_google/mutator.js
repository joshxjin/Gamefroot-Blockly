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
 * @fileoverview Object representing a mutator dialog.  A mutator allows the
 * user to change the shape of a block using a nested blocks editor.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// goog.provide('Blockly.Mutator');

goog.require('Blockly.Bubble');
goog.require('Blockly.Icon');
goog.require('Blockly.WorkspaceSvg');
goog.require('goog.Timer');
goog.require('goog.dom');


/**
 * Icon in base64 format.
 * @private
 */
Blockly.Mutator.prototype.png_ = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAQAAAD8x0bcAAAA0UlEQVR4AZ3RMUoDURSF4edMZ1yAKKJiEFK4KkHBKpPaQrDQwlILbVQQXVGSVtEFSDJoN58Bc5kJOk3+Ux344Z7HS0vgxNksx1IzC8WKbzD9X+rKJT1BV5Lba0pbvry7Uwqmbn0obdTSszYeQzpQM1ToGwoqvV8pd6GaK6uSpGM0V85lcS4OFqIX4GHxdS+gL/qgXhTnrmKRjiRZMwaVS3kMrwQjhYHx3+HJkzbu602bSq9uTASfrr2ZWG8O35FJ9gW7ksz2Eh8cOXI6y2G71JofA6mmTQxd6S0AAAAASUVORK5CYII=';

Blockly.Mutator.prototype.SIZE = 18;


/**
 * Show or hide the mutator bubble.
 * @param {boolean} visible True if the bubble should be visible.
 */
Blockly.Mutator.prototype.setVisible = function(visible) {
    if (visible == this.isVisible()) {
        // No change.
        return;
    }
    if (visible) {
        // Create the bubble.
        this.bubble_ = new Blockly.Bubble(this.block_.workspace,
            this.createEditor_(), this.block_.svgPath_,
            this.iconX_, this.iconY_, null, null);
        var thisObj = this;
        this.workspace_.flyout_.init(this.workspace_);
        this.workspace_.flyout_.show(
            this.workspace_.options.languageTree.childNodes);

        this.rootBlock_ = this.block_.decompose(this.workspace_);
        var blocks = this.rootBlock_.getDescendants();
        for (var i = 0, child; child = blocks[i]; i++) {
            child.render();
        }
        // The root block should not be dragable or deletable.
        this.rootBlock_.setMovable(false);
        this.rootBlock_.setDeletable(false);
        var margin = this.workspace_.flyout_.GAP * 2;
        var x = this.workspace_.flyout_.width_ + margin;
        if (this.block_.RTL) {
            x = -x;
        }
        this.rootBlock_.moveBy(x, margin);
        // Save the initial connections, then listen for further changes.
        if (this.block_.saveConnections) {
            this.block_.saveConnections(this.rootBlock_);
            this.sourceListener_ = Blockly.bindEvent_(
                this.block_.workspace.getCanvas(),
                'blocklyWorkspaceChange', this.block_,
                function() {thisObj.block_.saveConnections(thisObj.rootBlock_)});
        }
        this.resizeBubble_();
        // When the mutator's workspace changes, update the source block.
        Blockly.bindEvent_(this.workspace_.getCanvas(), 'blocklyWorkspaceChange',
            this.block_, function() {thisObj.workspaceChanged_();});
        this.updateColour();
    } else {
        // Dispose of the bubble.
        this.svgDialog_ = null;
        this.workspace_.dispose();
        this.workspace_ = null;
        this.rootBlock_ = null;
        this.bubble_.dispose();
        this.bubble_ = null;
        this.workspaceWidth_ = 0;
        this.workspaceHeight_ = 0;
        if (this.sourceListener_) {
            Blockly.unbindEvent_(this.sourceListener_);
            this.sourceListener_ = null;
        }
    }
};