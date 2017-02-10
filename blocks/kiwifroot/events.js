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
 * @fileoverview Event blocks for Kiwifroot.
 * @author rani_sputnik@hotmail.com (Ryan Loader)
 * @author benjamin.p.harding@gmail.com (Benjamin Harding)
 */
'use strict';

goog.provide('Blockly.Blocks.Kiwifroot.events');

goog.require('Blockly.Blocks');

Blockly.Blocks['kiwi_event_animation'] = {
  init: function() {
    this.setHelpUrl( Blockly.Msg.KF_EVENT_ANIMATION_HELPURL );
    this.setColour( Blockly.Variables.COLOUR.ANIMATION );
    this.appendValueInput("ANIM")
        .setCheck("String")
        .appendField( Blockly.Msg.KF_EVENT_ANIMATION_MESSAGE_BEFORE );
    this.appendDummyInput()
        .appendField( Blockly.Msg.KF_EVENT_ANIMATION_MESSAGE_AFTER )
        .appendField(new Blockly.FieldDropdown([
            ["completed", "onComplete"], 
            ["stopped", "onStop"], 
            ["started", "onPlay"], 
            ["looped", "onLoop"], 
            ["updated", "onUpdate"]
        ]), "TYPE");
    this.appendStatementInput("STACK");
    this.setInputsInline(true);
    this.setTooltip( Blockly.Msg.KF_EVENT_ANIMATION_TOOLTIP );
  }
};