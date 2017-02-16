/**
 * Created by josh on 16/02/17.
 */
/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview Inject Blockly's CSS synchronously.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

//goog.provide('Blockly.Css');

var findAndReplace = function(find, replace) {

};

/**
 *
 * Custom CSS for gamefroot editor
 *
 */
var gamefrootCustomCSS = [
    //Sexy buttons

    '.blocklyHidden, .blocklyTreeRow.blocklyHidden {',
    'display: none;',
    '}',

    '.blocklyTreeRow {',
    'display: block;',
    'text-overflow: ellipsis;',
    'overflow: hidden;',
    'position: relative;',
    'height: 33px;',
    'line-height: 33px;',
    'text-indent: 10px;',
    'background-color: #fff;',
    'border-radius: 3px;',
    'box-shadow: 0 2px 5px rgba(0,0,0,0.2);',
    'margin-bottom: 5px;',
    '}',

    //Dropdown Button

    '.blocklyTreeRow {',
    'padding-left: 0 !important;',
    '}',

    'div[role="treeitem"] > div[role="group"] {',
    'margin-left: 10px;',
    '}',

    '.blocklyFlyout {',
    'max-width: 360px;',
    'width: 100%;',
    '}',

    '.blocklyBlocksCategory .blocklyText {',
    'fill: #8c8c8c;',
    'font-size: 16px;',
    'font-weight: 300;',
    '}',

    '.blocklyBlocksCategory.blocklySelected>.blocklyPath {',
    'stroke: transparent;',
    'stroke-width: 0;',
    '}',

    '.blocklyBlocksCategory .blocklyPathDark, .blocklyBlocksCategory .blocklyPath {',
    'fill: none;',
    '}',
    '.blocklyBlocksCategory .blocklyPathLight {',
    'stroke-width: 0;',
    '}'
];

Blockly.Css.CONTENT.push(gamefrootCustomCSS); //adding Gamefroot Custom CSS