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
 * @fileoverview Components for creating connections between blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// goog.provide('Blockly.Connection');
// goog.provide('Blockly.ConnectionDB');

goog.require('goog.dom');

/**
 * Returns whether or not the connection accepts the given type
 * @param {string} type The type to check the connection for
 * @return {boolean}
 */


Blockly.Connection.prototype.acceptsType = function(type){
    // If it accepts anything
    if (!this.check_) return true;
    // If it contains the type
    if (this.check_.indexOf(type) != -1) {
        return true;
    }
    return false;
};

