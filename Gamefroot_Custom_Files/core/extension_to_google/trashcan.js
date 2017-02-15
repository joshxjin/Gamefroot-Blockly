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
 * @fileoverview Object representing a trash can icon.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// goog.provide('Blockly.Trashcan');

goog.require('goog.Timer');
goog.require('goog.dom');
goog.require('goog.math');
goog.require('goog.math.Rect');


/**
 * The colour of the background cirlce when not highlighted
 * @type {string}
 * @private
 */
Blockly.Trashcan.prototype.CIRCLE_COLOUR_ = '#333';

/**
 * The colour of the background cirlce when highlighted
 * @type {string}
 * @private
 */
Blockly.Trashcan.prototype.CIRCLE_HIGHLIGHT_ = '#0091fa';

Blockly.Trashcan.prototype.createDom = function() {
    /* Here's the markup that will be generated:
     <g class="blocklyTrash">
     <clippath id="blocklyTrashBodyClipPath837493">
     <rect width="47" height="45" y="15"></rect>
     </clippath>
     <image width="64" height="92" y="-32" xlink:href="media/sprites.png"
     clip-path="url(#blocklyTrashBodyClipPath837493)"></image>
     <clippath id="blocklyTrashLidClipPath837493">
     <rect width="47" height="15"></rect>
     </clippath>
     <image width="84" height="92" y="-32" xlink:href="media/sprites.png"
     clip-path="url(#blocklyTrashLidClipPath837493)"></image>
     </g>
     */
    this.svgGroup_ = Blockly.createSvgElement('g',
        {'class': 'blocklyTrash','filter': 'url(#blocklyTrashcanShadowFilter)' }, null);

    this.svgBackground_ = Blockly.createSvgElement('circle',
        {'cx':23, 'cy':32, 'r':40 },
        this.svgGroup_);

    var rnd = String(Math.random()).substring(2);
    var clip = Blockly.createSvgElement('clipPath',
        {'id': 'blocklyTrashBodyClipPath' + rnd},
        this.svgGroup_);

    Blockly.createSvgElement('rect',
        {'width': this.WIDTH_, 'height': this.BODY_HEIGHT_,
            'y': this.LID_HEIGHT_},
        clip);
    var body = Blockly.createSvgElement('image',
        {'width': Blockly.SPRITE.width, 'height': Blockly.SPRITE.height, 'y': -32,
            'clip-path': 'url(#blocklyTrashBodyClipPath' + rnd + ')'},
        this.svgGroup_);
    body.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
        this.workspace_.options.pathToMedia + Blockly.SPRITE.url);

    var clip = Blockly.createSvgElement('clipPath',
        {'id': 'blocklyTrashLidClipPath' + rnd},
        this.svgGroup_);
    Blockly.createSvgElement('rect',
        {'width': this.WIDTH_, 'height': this.LID_HEIGHT_}, clip);
    this.svgLid_ = Blockly.createSvgElement('image',
        {'width': Blockly.SPRITE.width, 'height': Blockly.SPRITE.height, 'y': -32,
            'clip-path': 'url(#blocklyTrashLidClipPath' + rnd + ')'},
        this.svgGroup_);
    this.svgLid_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
        this.workspace_.options.pathToMedia + Blockly.SPRITE.url);

    this.animateLid_();
    return this.svgGroup_;
};

/**
 * Rotate the lid open or closed by one step.  Then wait and recurse.
 * @private
 */
Blockly.Trashcan.prototype.animateLid_ = function() {
    this.lidOpen_ += this.isOpen ? 0.2 : -0.2;
    this.lidOpen_ = goog.math.clamp(this.lidOpen_, 0, 1);
    var lidAngle = this.lidOpen_ * 15;
    this.svgLid_.setAttribute('transform', 'rotate(' +
        (this.workspace_.RTL ? -lidAngle : lidAngle) + ',' +
        (this.workspace_.RTL ? 4 : this.WIDTH_ - 4) + ',' +
        (this.LID_HEIGHT_ - 2) + ')');

    // var opacity = goog.math.lerp(0.4, 0.8, this.lidOpen_);
    // this.svgGroup_.style.opacity = opacity;

    this.svgBackground_.style.fill = this.CIRCLE_HIGHLIGHT_;

    if (this.lidOpen_ > 0 && this.lidOpen_ < 1) {
        this.lidTask_ = goog.Timer.callOnce(this.animateLid_, 20, this);
    }
};