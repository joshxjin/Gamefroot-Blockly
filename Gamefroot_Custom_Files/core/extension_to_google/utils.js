/**
 * Created by josh on 16/02/17.
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
 * @fileoverview Utility methods.
 * These methods are not specific to Blockly, and could be factored out into
 * a JavaScript framework such as Closure.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

//goog.provide('Blockly.utils');

goog.require('goog.dom');
goog.require('goog.events.BrowserFeature');
goog.require('goog.math.Coordinate');
goog.require('goog.userAgent');

/**
 * Return the absolute coordinates of the top-left corner of this element,
 * scales that after canvas SVG element, if it's a descendant.
 * The origin (0,0) is the top-left corner of the Blockly SVG.
 * @param {!Element} element Element to find the coordinates of.
 * @param {!Blockly.Workspace} workspace Element must be in this workspace.
 * @return {!goog.math.Coordinate} Object with .x and .y properties.
 * @private
 */
Blockly.getSvgXY_ = function(element, workspace) {
    var x = 0;
    var y = 0;
    var scale = 1;
    if (goog.dom.contains(workspace.getCanvas(), element) ||
        goog.dom.contains(workspace.getBubbleCanvas(), element)) {
        // Before the SVG canvas, scale the coordinates.
        scale = workspace.scale;
    }
    do {
        // Loop through this block and every parent.
        var xy = Blockly.getRelativeXY_(element);
        if (element == workspace.getCanvas() ||
            element == workspace.getBubbleCanvas()) {
            // After the SVG canvas, don't scale the coordinates.
            scale = 1;
        }
        x += xy.x * scale;
        y += xy.y * scale;
        element = element.parentNode;
    } while (element && element !== workspace.options.svg );

    return new goog.math.Coordinate(x, y);
};