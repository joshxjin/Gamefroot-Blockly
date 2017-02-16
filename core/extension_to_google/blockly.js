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
 * @fileoverview Core JavaScript library for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// Top level object for Blockly.
// goog.provide('Blockly');

goog.require('Blockly.BlockSvg');
goog.require('Blockly.FieldAngle');
goog.require('Blockly.FieldCheckbox');
goog.require('Blockly.FieldColour');
// Date picker commented out since it increases footprint by 60%.
// Add it only if you need it.
//goog.require('Blockly.FieldDate');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldImage');
goog.require('Blockly.FieldTextInput');
goog.require('Blockly.FieldVariable');
goog.require('Blockly.Generator');
goog.require('Blockly.Msg');
goog.require('Blockly.Procedures');
// Realtime is currently badly broken.  Stub it out.
//goog.require('Blockly.Realtime');
// Blockly.Realtime = {
//     isEnabled: function() {return false;},
//     blockChanged: function() {},
//     doCommand: function(cmdThunk) {cmdThunk();}
// };
goog.require('Blockly.Toolbox');
goog.require('Blockly.WidgetDiv');
goog.require('Blockly.WorkspaceSvg');
goog.require('Blockly.inject');
goog.require('Blockly.utils');
goog.require('goog.color');
goog.require('goog.userAgent');

/*
    This is a kiwifroot created file
 */
/*
 This function add Gamefroot specific functionality to the default
 Google Blockly.makecolour function in core/blockly.js and contains
 an extra if statement Google Blockly calls to the Blockly.makecolour
 function should be unaffaected.

 This file needs to be added after blockly.js to ensure it overrides it
 so Kiwifroot code can use the functionality. Build.py may need to be edited to
 ensure this gets added after blockly.js is processed
 */

Blockly.makeColour = function(hue) {
    //Already hex
    if( typeof hue === "string" && hue.charAt(0) === '#' ) {
        return hue;
    }
    Blockly.hueToRgb(hue);
};
