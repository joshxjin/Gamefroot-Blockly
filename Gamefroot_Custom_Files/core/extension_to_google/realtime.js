/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2014 Google Inc.
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
 * This file contains functions used by any Blockly app that wants to provide
 * realtime collaboration functionality.
 */

/**
 * @fileoverview Common support code for Blockly apps using realtime
 * collaboration.
 * Note that to use this you must set up a project via the Google Developers
 * Console. Instructions on how to do that can be found at
 * https://developers.google.com/blockly/realtime-collaboration
 * Once you do that you can set the clientId in
 * Blockly.Realtime.rtclientOptions_
 * @author markf@google.com (Mark Friedman)
 */
'use strict';

//goog.provide('Blockly.Realtime');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('rtclient');

/**
 * Setup the Blockly container for realtime authorization.
 * @param {!Element} uiContainer A DOM container element for the Blockly UI.
 * @return {!Element} The DOM element for the authorization UI.
 * @private
 */
Blockly.Realtime.addAuthUi_ = function(uiContainer) {
    // Add progress indicator to the UI container.
    uiContainer.style.background = 'url(' + Blockly.mainWorkspace.options.pathToMedia +
        Blockly.Realtime.PROGRESS_URL_ + ') no-repeat center center';
    // Setup authorization button
    var blocklyDivBounds = goog.style.getBounds(uiContainer);
    var authButtonDiv = goog.dom.createDom('div');
    authButtonDiv.id = Blockly.Realtime.rtclientOptions_['authDivElementId'];
    var authText = goog.dom.createDom('p', null, Blockly.Msg.AUTH);
    authButtonDiv.appendChild(authText);
    var authButton = goog.dom.createDom('button', null, 'Authorize');
    authButton.id = Blockly.Realtime.rtclientOptions_.authButtonElementId;
    authButtonDiv.appendChild(authButton);
    uiContainer.appendChild(authButtonDiv);

    // TODO: I would have liked to set the style for the authButtonDiv in css.js
    // but that CSS doesn't get injected until after this code gets run.
    authButtonDiv.style.display = 'none';
    authButtonDiv.style.position = 'relative';
    authButtonDiv.style.textAlign = 'center';
    authButtonDiv.style.border = '1px solid';
    authButtonDiv.style.backgroundColor = '#f6f9ff';
    authButtonDiv.style.borderRadius = '15px';
    authButtonDiv.style.boxShadow = '10px 10px 5px #888';
    authButtonDiv.style.width = (blocklyDivBounds.width / 3) + 'px';
    var authButtonDivBounds = goog.style.getBounds(authButtonDiv);
    authButtonDiv.style.left =
        (blocklyDivBounds.width - authButtonDivBounds.width) / 3 + 'px';
    authButtonDiv.style.top =
        (blocklyDivBounds.height - authButtonDivBounds.height) / 4 + 'px';
    return authButtonDiv;
};