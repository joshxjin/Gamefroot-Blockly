/**
 * Created by josh on 15/02/17.
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
 * @fileoverview Math blocks for Blockly.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

//goog.provide('Blockly.Blocks.math');

goog.require('Blockly.Blocks');

/**
 * Create object to represent whether the 'divisorInput' should be present.
 * @return {object} JSON storage element.
 * @this Blockly.Block
 */
Blockly.Blocks['math_number_property'].mutationToObject = function() {
    return {
        'divisor_input' : (this.getFieldValue('PROPERTY') == 'DIVISIBLE_BY')
    };
};

/**
 * Restore the 'divisorInput'.
 * @param {!object} obj JSON storage element.
 * @this Blockly.Block
 */
Blockly.Blocks['math_number_property'].objectToMutation = function(obj) {
    this.updateShape_(obj.divisor_input);
};

/**
 * Iterator is always a number type, return this.
 * @return {string}
 * @this Blockly.Block
 */
Blockly.Blocks['math_change'].typeOf = function(name) {
    if (Blockly.Names.equals(name, this.getFieldValue('VAR'))) {
        return Blockly.Variables.TYPE_NUMBER;
    }
    else return undefined;
};

/**
 * Notfication that the workspace wants to change this variables type.
 * We can not change type! This is immutable.
 * @this Blockly.Block
 */
Blockly.Blocks['math_change'].changeType = function(name, type) {
    if (Blockly.Names.equals(name, this.getFieldValue('VAR'))) {
        //Is the type different?
        if( type !== this.typeOf(name) ) {
            setTimeout(function(){
                // This type is immutable, change it back!
                Blockly.Variables.changeType(name, Blockly.Variables.TYPE_NUMBER,
                    Blockly.mainWorkspace);
            },1);
        }
    }
};

Blockly.Blocks['math_on_list'] = {
    /**
     * Block for evaluating a list of numbers to return sum, average, min, max,
     * etc.  Some functions also work on text (min, max, mode, median).
     * @this Blockly.Block
     */
    init: function() {
        var OPERATORS =
            [[Blockly.Msg.MATH_ONLIST_OPERATOR_SUM, 'SUM'],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_MIN, 'MIN'],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_MAX, 'MAX'],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_AVERAGE, 'AVERAGE'],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_MEDIAN, 'MEDIAN'],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_MODE, 'MODE'],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_STD_DEV, 'STD_DEV'],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_RANDOM, 'RANDOM']];
        // Assign 'this' to a variable for use in the closures below.
        var thisBlock = this;
        this.setHelpUrl(Blockly.Msg.MATH_ONLIST_HELPURL);
        this.setColour( Blockly.Variables.COLOUR.OPERATORS );
        this.setOutput(true, 'Number');
        var dropdown = new Blockly.FieldDropdown(OPERATORS, function(newOp) {
            if (newOp == 'MODE') {
                thisBlock.outputConnection.setCheck('Array');
            } else {
                thisBlock.outputConnection.setCheck('Number');
            }
        });
        this.appendValueInput('LIST')
            .setCheck('Array')
            .appendField(dropdown, 'OP');
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'SUM': Blockly.Msg.MATH_ONLIST_TOOLTIP_SUM,
                'MIN': Blockly.Msg.MATH_ONLIST_TOOLTIP_MIN,
                'MAX': Blockly.Msg.MATH_ONLIST_TOOLTIP_MAX,
                'AVERAGE': Blockly.Msg.MATH_ONLIST_TOOLTIP_AVERAGE,
                'MEDIAN': Blockly.Msg.MATH_ONLIST_TOOLTIP_MEDIAN,
                'MODE': Blockly.Msg.MATH_ONLIST_TOOLTIP_MODE,
                'STD_DEV': Blockly.Msg.MATH_ONLIST_TOOLTIP_STD_DEV,
                'RANDOM': Blockly.Msg.MATH_ONLIST_TOOLTIP_RANDOM
            };
            return TOOLTIPS[mode];
        });

    /* Block of code that Gamefroot have removed from Google's default code
    },
    /!**
     * Modify this block to have the correct output type.
     * @param {string} newOp Either 'MODE' or some op than returns a number.
     * @private
     * @this Blockly.Block
     *!/
    updateType_: function(newOp) {
        if (newOp == 'MODE') {
            this.outputConnection.setCheck('Array');
        } else {
            this.outputConnection.setCheck('Number');
        }
    },
    /!**
     * Create XML to represent the output type.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     *!/
    mutationToDom: function() {
        var container = document.createElement('mutation');
        container.setAttribute('op', this.getFieldValue('OP'));
        return container;
    },
    /!**
     * Parse XML to restore the output type.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     *!/
    domToMutation: function(xmlElement) {
        this.updateType_(xmlElement.getAttribute('op'));
        */
    }
};