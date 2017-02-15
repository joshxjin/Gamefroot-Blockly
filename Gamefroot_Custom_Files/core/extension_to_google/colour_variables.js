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
 * @fileoverview Utility functions for handling variables.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// Commented this out as the Blockly.Variables namespace is
// provided in the core/variables.js file.

// goog.provide('Blockly.Variables');

/**
 * The definition name of the any type
 * @const
 */
Blockly.Variables.TYPE_ANY = '';
/**
 * The definition name of the boolean type
 * @const
 */
Blockly.Variables.TYPE_BOOLEAN = 'Boolean';
/**
 * The definition name of the number type
 * @const
 */
Blockly.Variables.TYPE_NUMBER = 'Number';
/**
 * The definition name of the string type
 * @const
 */
Blockly.Variables.TYPE_STRING = 'String';
/**
 * The definition name of the colour type
 * @const
 */
Blockly.Variables.TYPE_COLOUR = 'Colour';
/**
 * The definition name of the array type
 * @const
 */
Blockly.Variables.TYPE_ARRAY = 'Array';
/**
 * The definition name of the array type
 * @const
 */
Blockly.Variables.TYPE_INSTANCE = 'Instance';
/**
 * The definition name of the class type
 * @const
 */
Blockly.Variables.TYPE_CLASS = 'Class';
/**
 * The definition name of the sound type
 * @const
 */
Blockly.Variables.TYPE_SOUND = 'Sound';
/**
 * The definition name of the finger type
 * @const
 */
Blockly.Variables.TYPE_POINTER = 'Pointer';
/**
 * The definition name of the location type
 * @const
 */
Blockly.Variables.TYPE_COORDINATE = 'Coordinate';

/**
 * The colour that should be applied to a block that outputs type 'any'
 * @const
 */
Blockly.Variables.COLOUR_ANY = '#71cd04';
/**
 * The colour that should be applied to a block that outputs type 'boolean'
 * @const
 */
Blockly.Variables.COLOUR_BOOLEAN = '#2db1f9';
/**
 * The colour that should be applied to a block that outputs type 'number'
 * @const
 */
Blockly.Variables.COLOUR_NUMBER = '#1b6fe9';
/**
 * The colour that should be applied to a block that outputs type 'string'
 * @const
 */
Blockly.Variables.COLOUR_STRING = '#40ce9e';
/**
 * The colour that should be applied to a block that outputs type 'colour'
 * @const
 */
Blockly.Variables.COLOUR_COLOUR = '#b24ac5';
/**
 * The colour that should be applied to a block that outputs type 'array'
 * @const
 */
Blockly.Variables.COLOUR_ARRAY = '#8230e7';
/**
 * The colour that should be applied to a block that outputs type 'instance'
 * @const
 */
Blockly.Variables.COLOUR_INSTANCE = '#e74e48';
/**
 * The colour that should be applied to a block that outputs type 'class'
 * @const
 */
Blockly.Variables.COLOUR_CLASS = '#fc8607';
/**
 * The colour that should be applied to a block that outputs type 'sound'
 * @const
 */
Blockly.Variables.COLOUR_SOUND = '#d147ea';
/**
 * The colour that should be applied to a block that outputs type 'finger'
 * @const
 */
Blockly.Variables.COLOUR_POINTER = '#ea8847';
/**
 * The colour that should be applied to a block that outs type 'location'
 * @const
 */
Blockly.Variables.COLOUR_COORDINATE = '#388e3c';

/*
 * New Colour Blocks....
 * Based on the category a block is in now.
 */
Blockly.Variables.COLOUR = {
    'EVENT': "#edae00",
    'CONTROL': "#ff8601",
    'MOTION': "#e54e43",
    'ANIMATION': "#df358e",
    'LOOKS': "#b443c9",
    'SENSING': "#8121e7",
    'SOUND': "#0f6bf0",
    'OPERATORS': "#21aefe",
    'PHYSICS': "#e66b2f",
    'DRAW': "#38ce9e",
    'VARIABLES': "#348f32",
    'FUNCTIONS': "#6bd101",
    'LOCAL_VARIABLES': "#56ae02",
    'GLOBAL_VARIABLES': "#006d00"
};

// This version adds the variables to the default Blockly.Variables namespace for the
// code in the blocks/extensions_to_google folder as this has not been converted to
// calling Variables namespace

/*
 * New Colour Blocks....
 * Based on the category a block is in now.
 */
Blockly.Variables.COLOUR = {
    'EVENT': "#edae00",
    'CONTROL': "#ff8601",
    'MOTION': "#e54e43",
    'ANIMATION': "#df358e",
    'LOOKS': "#b443c9",
    'SENSING': "#8121e7",
    'SOUND': "#0f6bf0",
    'OPERATORS': "#21aefe",
    'PHYSICS': "#e66b2f",
    'DRAW': "#38ce9e",
    'VARIABLES': "#348f32",
    'FUNCTIONS': "#6bd101",
    'LOCAL_VARIABLES': "#56ae02",
    'GLOBAL_VARIABLES': "#006d00"
};

/**
 * The hue that corresponds to each variable type
 */
Blockly.Variables.COLOUR_FOR_TYPE = {};
Blockly.Variables.COLOUR_FOR_TYPE[Blockly.Variables.TYPE_BOOLEAN] = Blockly.Variables.COLOUR_BOOLEAN;
Blockly.Variables.COLOUR_FOR_TYPE[Blockly.Variables.TYPE_NUMBER] = Blockly.Variables.COLOUR_NUMBER;
Blockly.Variables.COLOUR_FOR_TYPE[Blockly.Variables.TYPE_STRING] = Blockly.Variables.COLOUR_STRING;
Blockly.Variables.COLOUR_FOR_TYPE[Blockly.Variables.TYPE_COLOUR] = Blockly.Variables.COLOUR_COLOUR;
Blockly.Variables.COLOUR_FOR_TYPE[Blockly.Variables.TYPE_ARRAY] = Blockly.Variables.COLOUR_ARRAY;
Blockly.Variables.COLOUR_FOR_TYPE[Blockly.Variables.TYPE_INSTANCE] = Blockly.Variables.COLOUR_INSTANCE;
Blockly.Variables.COLOUR_FOR_TYPE[Blockly.Variables.TYPE_CLASS] = Blockly.Variables.COLOUR_CLASS;
Blockly.Variables.COLOUR_FOR_TYPE[Blockly.Variables.TYPE_SOUND] = Blockly.Variables.COLOUR_SOUND;
Blockly.Variables.COLOUR_FOR_TYPE[Blockly.Variables.TYPE_POINTER] = Blockly.Variables.COLOUR_POINTER;
Blockly.Variables.COLOUR_FOR_TYPE[Blockly.Variables.TYPE_COORDINATE] = Blockly.Variables.COLOUR_COORDINATE;
