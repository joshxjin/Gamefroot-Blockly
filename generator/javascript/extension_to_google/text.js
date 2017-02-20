/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Generating JavaScript for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// goog.provide('Blockly.JavaScript.texts');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['text_prompt_string'] = function(block) {
    var msg = block.getField('TEXT');
    var code = 'window.prompt(' + msg + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['text_prompt_number'] = function(block) {
    var msg = block.getField('TEXT');
    var code = 'window.prompt(' + msg + ')';
        code = 'parseFloat(' + code + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
