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

/*
    This is a kiwifroot created file
 */
/*
 This function add Gamefroot specific functionality to the default
 Google Blockly.makecolour function in core/blockly.js and contains
 an extra if statement Google Blockly calls to the Blockly.makecolour
 function should be unaffaected.

 This file needs to be added after blockly.js to ensure it overrides it
 so Kiwifroot code can use the functionality. Build.py may need to be editted to
 ensure this gets added after blockly.js is processed
 */

// Store old funciton in old_function variable for later use
var old_function = Blockly.makeColour;

Blockly.makeColour = function() {
    //Already hex
    if( typeof hue === "string" && hue.charAt(0) === '#' ) {
        return hue;
    }
    old_function();
}
