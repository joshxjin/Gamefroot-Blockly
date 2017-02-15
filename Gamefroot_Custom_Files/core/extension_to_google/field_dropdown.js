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
 * @fileoverview Dropdown input field.  Used for editable titles and variables.
 * In the interests of a consistent UI, the toolbox shares some functions and
 * properties with the context menu.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

//goog.provide('Blockly.FieldDropdown');

goog.require('Blockly.Field');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.style');
goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuItem');
goog.require('goog.userAgent');

/**
 * Factor out common words in statically defined options.
 * Create prefix and/or suffix labels.
 * @private
 */
Blockly.FieldDropdown.prototype.trimOptions_ = function() {
    this.prefixField = null;
    this.suffixField = null;
    var options = this.menuGenerator_;
    if (!goog.isArray(options) || options.length < 2) {
        return;
    }
    var strings = options.map(function(t) {return String( t[0] ); });
    var shortest = Blockly.shortestStringLength(strings);
    var prefixLength = Blockly.commonWordPrefix(strings, shortest);
    var suffixLength = Blockly.commonWordSuffix(strings, shortest);
    if (!prefixLength && !suffixLength) {
        return;
    }
    if (shortest <= prefixLength + suffixLength) {
        // One or more strings will entirely vanish if we proceed.  Abort.
        return;
    }
    if (prefixLength) {
        this.prefixField = strings[0].substring(0, prefixLength - 1);
    }
    if (suffixLength) {
        this.suffixField = strings[0].substr(1 - suffixLength);
    }
    // Remove the prefix and suffix from the options.
    var newOptions = [];
    for (var x = 0; x < options.length; x++) {
        var text = options[x][0];
        var value = options[x][1];
        text = text.substring(prefixLength, text.length - suffixLength);
        newOptions[x] = [text, value];
    }
    this.menuGenerator_ = newOptions;
};