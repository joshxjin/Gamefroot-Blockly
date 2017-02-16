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
 * @fileoverview Functions for injecting Blockly into a web page.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// goog.provide('Blockly.inject');

goog.require('Blockly.Css');
goog.require('Blockly.WorkspaceSvg');
goog.require('goog.dom');
goog.require('goog.ui.Component');
goog.require('goog.userAgent');


/**
 * Create the SVG image.
 * @param {!Element} container Containing element.
 * @param {Object} options Dictionary of options.
 * @return {!Element} Newly created SVG image.
 * @private
 */
Blockly.createDom_ = function(container, options) {


    // Sadly browsers (Chrome vs Firefox) are currently inconsistent in laying
    // out content in RTL mode.  Therefore Blockly forces the use of LTR,
    // then manually positions content in RTL as needed.
    container.setAttribute('dir', 'LTR');
    // Closure can be trusted to create HTML widgets with the proper direction.
    goog.ui.Component.setDefaultRightToLeft(options.RTL);

    // Load CSS.
    Blockly.Css.inject(options.hasCss, options.pathToMedia);

    // Build the SVG DOM.
    /*
     <svg
     xmlns="http://www.w3.org/2000/svg"
     xmlns:html="http://www.w3.org/1999/xhtml"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     version="1.1"
     class="blocklySvg">
     ...
     </svg>
     */
    var svg = Blockly.utils.createSvgElement('svg', {
        'xmlns': 'http://www.w3.org/2000/svg',
        'xmlns:html': 'http://www.w3.org/1999/xhtml',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        'version': '1.1',
        'class': 'blocklySvg'
    }, container);
    /*
     <defs>
     ... filters go here ...
     </defs>
     */
    var defs = Blockly.utils.createSvgElement('defs', {}, svg);
    var rnd = String(Math.random()).substring(2);
    /*
     <filter id="blocklyEmbossFilter837493">
     <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/>
     <feSpecularLighting in="blur" surfaceScale="1" specularConstant="0.5"
     specularExponent="10" lighting-color="white"
     result="specOut">
     <fePointLight x="-5000" y="-10000" z="20000"/>
     </feSpecularLighting>
     <feComposite in="specOut" in2="SourceAlpha" operator="in"
     result="specOut"/>
     <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic"
     k1="0" k2="1" k3="1" k4="0"/>
     </filter>
     */
    var embossFilter = Blockly.utils.createSvgElement('filter',
        {'id': 'blocklyEmbossFilter' + rnd}, defs);
    Blockly.utils.createSvgElement('feGaussianBlur',
        {'in': 'SourceAlpha', 'stdDeviation': 1, 'result': 'blur'}, embossFilter);
    var feSpecularLighting = Blockly.utils.createSvgElement('feSpecularLighting',
        {'in': 'blur', 'surfaceScale': 0.5, 'specularConstant': 0.1,
            'specularExponent': 10, 'lighting-color': 'white', 'result': 'specOut'},
        embossFilter);
    Blockly.utils.createSvgElement('fePointLight',
        {'x': -5000, 'y': -10000, 'z': 20000}, feSpecularLighting);
    Blockly.utils.createSvgElement('feComposite',
        {'in': 'specOut', 'in2': 'SourceAlpha', 'operator': 'in',
            'result': 'specOut'}, embossFilter);
    Blockly.utils.createSvgElement('feComposite',
        {'in': 'SourceGraphic', 'in2': 'specOut', 'operator': 'arithmetic',
            'k1': 0, 'k2': 1, 'k3': 1, 'k4': 0}, embossFilter);
    options.embossFilterId = embossFilter.id;

    /*
     *
     */
    var filter = Blockly.utils.createSvgElement('filter',
        {'id': 'blocklyTrashcanShadowFilter'}, defs);
    Blockly.utils.createSvgElement('feGaussianBlur',
        {'in': 'SourceAlpha', 'stdDeviation': 2, 'result': 'blur'}, filter);
    Blockly.utils.createSvgElement('feOffset',
        {'in': 'blur', 'dx': 0, 'dy': 1, 'result': 'offsetBlur'}, filter);
    var feMerge = Blockly.utils.createSvgElement('feMerge', {}, filter);
    Blockly.utils.createSvgElement('feMergeNode', {'in': 'offsetBlur'}, feMerge);
    Blockly.utils.createSvgElement('feMergeNode', {'in': 'SourceGraphic'}, feMerge);

    /*
     <pattern id="blocklyDisabledPattern837493" patternUnits="userSpaceOnUse"
     width="10" height="10">
     <rect width="10" height="10" fill="#aaa" />
     <path d="M 0 0 L 10 10 M 10 0 L 0 10" stroke="#cc0" />
     </pattern>
     */
    var disabledPattern = Blockly.utils.createSvgElement('pattern',
        {'id': 'blocklyDisabledPattern' + rnd,
            'patternUnits': 'userSpaceOnUse',
            'width': 10, 'height': 10}, defs);
    Blockly.utils.createSvgElement('rect',
        {'width': 10, 'height': 10, 'fill': '#aaa'}, disabledPattern);
    Blockly.utils.createSvgElement('path',
        {'d': 'M 0 0 L 10 10 M 10 0 L 0 10', 'stroke': '#cc0'}, disabledPattern);
    options.disabledPatternId = disabledPattern.id;
    /*
     <pattern id="blocklyGridPattern837493" patternUnits="userSpaceOnUse">
     <rect stroke="#888" />
     <rect stroke="#888" />
     </pattern>
     */
    var gridPattern = Blockly.utils.createSvgElement('pattern',
        {'id': 'blocklyGridPattern' + rnd,
            'patternUnits': 'userSpaceOnUse'}, defs);
    if (options.gridOptions['length'] > 0 && options.gridOptions['spacing'] > 0) {
        Blockly.utils.createSvgElement('line',
            {'stroke': options.gridOptions['colour']},
            gridPattern);
        if (options.gridOptions['length'] > 1) {
            Blockly.utils.createSvgElement('line',
                {'stroke': options.gridOptions['colour']},
                gridPattern);
        }
        // x1, y1, x1, x2 properties will be set later in updateGridPattern_.
    }
    options.gridPattern = gridPattern;
    options.svg = svg;
    return svg;
};