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
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

//goog.provide('Blockly.Blocks.procedures');

goog.require('Blockly.Blocks');

Blockly.Blocks['procedures_mutatorcontainer'] = {
    /**
     * Mutator block for procedure container.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour( Blockly.Variables.COLOUR.FUNCTIONS );
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);
        this.appendStatementInput('STACK');
        this.appendDummyInput('STATEMENT_INPUT')
            .appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS)
            .appendField(new Blockly.FieldCheckbox('TRUE'), 'STATEMENTS');
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['procedures_mutatorarg'] = {
    /**
     * Mutator block for procedure argument.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(Blockly.Variables.COLOUR.FUNCTIONS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE)
            .appendField(new Blockly.FieldTextInput('x', this.validator_), 'NAME');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);
        this.contextMenu = false;
    },
    /**
     * Obtain a valid name for the procedure.
     * Merge runs of whitespace.  Strip leading and trailing whitespace.
     * Beyond this, all names are legal.
     * @param {string} newVar User-supplied name.
     * @return {?string} Valid name, or null if a name was not specified.
     * @private
     * @this Blockly.Block
     */
    validator_: function(newVar) {
        newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
        return newVar || null;
    }
};


Blockly.Blocks['procedures_ifreturn'] = {
    /**
     * Block for conditionally returning a value from a procedure.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl('http://c2.com/cgi/wiki?GuardClause');
        this.setColour( Blockly.Variables.COLOUR.FUNCTIONS );
        this.appendValueInput('CONDITION')
            .setCheck('Boolean')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendValueInput('VALUE')
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_IFRETURN_TOOLTIP);
        this.hasReturnValue_ = true;
    },
    /**
     * Create an object to represent whether this block has a return value.
     * @return {object} mutation data.
     * @this Blockly.Block
     */
    mutationToObject: function(){
        return {
            'value': this.hasReturnValue_
        };
    },
    /**
     * Parse an object to restore whether this block has a return value.
     * @param {object} obj The mutation data
     * @this Blockly.Block
     */
    objectToMutation: function(obj){
        this.hasReturnValue_ = !!obj.value;
        if (!this.hasReturnValue_) {
            this.removeInput('VALUE');
            this.appendDummyInput('VALUE')
                .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        }
    },
    /**
     * Create XML to represent whether this block has a return value.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        var container = document.createElement('mutation');
        container.setAttribute('value', Number(this.hasReturnValue_));
        return container;
    },
    /**
     * Parse XML to restore whether this block has a return value.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        var value = xmlElement.getAttribute('value');
        this.hasReturnValue_ = (value == 1);
        if (!this.hasReturnValue_) {
            this.removeInput('VALUE');
            this.appendDummyInput('VALUE')
                .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        }
    },
    /**
     * Called whenever anything on the workspace changes.
     * Add warning if this flow block is not nested inside a loop.
     * @this Blockly.Block
     */
    onchange: function() {
        var legal = false;
        // Is the block nested in a procedure?
        var block = this;
        do {
            if (block.type == 'procedures_defnoreturn' ||
                block.type == 'procedures_defreturn') {
                legal = true;
                break;
            }
            block = block.getSurroundParent();
        } while (block);
        if (legal) {
            // If needed, toggle whether this block has a return value.
            if (block.type == 'procedures_defnoreturn' && this.hasReturnValue_) {
                this.removeInput('VALUE');
                this.appendDummyInput('VALUE')
                    .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
                this.hasReturnValue_ = false;
            } else if (block.type == 'procedures_defreturn' &&
                !this.hasReturnValue_) {
                this.removeInput('VALUE');
                this.appendValueInput('VALUE')
                    .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
                this.hasReturnValue_ = true;
            }
            this.setWarningText(null);
        } else {
            this.setWarningText(Blockly.Msg.PROCEDURES_IFRETURN_WARNING);
        }
    }
};

// LOCAL

Blockly.Blocks['procedures_defnoreturn_local'] = Blockly.Blocks['procedures_defnoreturn'];

/**
 * Create an object to represent the argument inputs.
 * @return {object} mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['procedures_defnoreturn_local'].mutationToObject = function() {
    return {
        'arguments' : this.arguments_.concat()
        ,'statements' : this.hasStatements_
    };
};

/**
 * Parse mutation data to restore the argument inputs.
 * @param {object} obj The mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['procedures_defnoreturn_local'].objectToMutation = function(obj) {
    this.arguments_ = obj.arguments.concat();
    this.updateParams_();
    this.setStatements_(!!obj.statements);
};

/**
 * Return all variables referenced by this block.
 * @return {!Array.<string>} List of variable names.
 * @this Blockly.Block
 */
Blockly.Blocks['procedures_defnoreturn_local'].localGetVars = Blockly.Blocks['procedures_defnoreturn_local'].getVars;

/**
 * Notification that a variable is renaming.
 * If the name matches one of this block's variables, rename it.
 * @param {string} oldName Previous name of variable.
 * @param {string} newName Renamed variable.
 * @this Blockly.Block
 */
Blockly.Blocks['procedures_defnoreturn_local'].localRenameVar = Blockly.Blocks['procedures_defnoreturn_local'].renameVar;

/**
 * Add custom menu options to this block's context menu.
 * @param {!Array} options List of menu options to add to.
 * @this Blockly.Block
 */
Blockly.Blocks['procedures_defnoreturn_local'].customContextMenu = function(options) {
    // Add option to create caller.
    var option = {enabled: true};
    var name = this.getFieldValue('NAME');
    option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);
    var xmlMutation = goog.dom.createDom('mutation');
    xmlMutation.setAttribute('name', name);
    for (var i = 0; i < this.arguments_.length; i++) {
        var xmlArg = goog.dom.createDom('arg');
        xmlArg.setAttribute('name', this.arguments_[i]);
        xmlMutation.appendChild(xmlArg);
    }
    var xmlBlock = goog.dom.createDom('block', null, xmlMutation);
    xmlBlock.setAttribute('type', this.callType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);

    // Add options to create getters for each parameter.
    if (!this.isCollapsed()) {
        for (var i = 0; i < this.arguments_.length; i++) {
            var option = {enabled: true};
            var name = this.arguments_[i];
            option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
            var xmlField = goog.dom.createDom('field', null, name);
            xmlField.setAttribute('name', 'VAR');
            var xmlBlock = goog.dom.createDom('block', null, xmlField);
            xmlBlock.setAttribute('type', 'variables_local_get');
            option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
            options.push(option);
        }
    }
};

Blockly.Blocks['procedures_defnoreturn_local'].callType_ = 'procedures_callnoreturn_local';

Blockly.Blocks['procedures_defreturn_local'] = {
    /**
     * Block for defining a procedure with a return value.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL);
        this.setColour( Blockly.Variables.COLOUR.FUNCTIONS );
        var nameField = new Blockly.FieldTextInput(
            Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE,
            Blockly.Procedures.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE)
            .appendField(nameField, 'NAME')
            .appendField('', 'PARAMS');
        this.appendValueInput('RETURN')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
        this.arguments_ = [];
        this.setStatements_(true);
        this.statementConnection_ = null;
    },
    setStatements_: Blockly.Blocks['procedures_defnoreturn_local'].setStatements_,
    validate: Blockly.Blocks['procedures_defnoreturn_local'].validate,
    updateParams_: Blockly.Blocks['procedures_defnoreturn_local'].updateParams_,
    mutationToDom: Blockly.Blocks['procedures_defnoreturn_local'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_defnoreturn_local'].domToMutation,
    mutationToObject: Blockly.Blocks['procedures_defnoreturn_local'].mutationToObject,
    objectToMutation: Blockly.Blocks['procedures_defnoreturn_local'].objectToMutation,
    decompose: Blockly.Blocks['procedures_defnoreturn_local'].decompose,
    compose: Blockly.Blocks['procedures_defnoreturn_local'].compose,
    dispose: Blockly.Blocks['procedures_defnoreturn_local'].dispose,
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES have a return value.
     * @this Blockly.Block
     */
    getProcedureDef: function() {
        return [this.getFieldValue('NAME'), this.arguments_, true];
    },
    localGetVars: Blockly.Blocks['procedures_defnoreturn_local'].localGetVars,
    localRenameVar: Blockly.Blocks['procedures_defnoreturn_local'].localRenameVar,
    customContextMenu: Blockly.Blocks['procedures_defnoreturn_local'].customContextMenu,
    callType_: 'procedures_callreturn_local'
};

Blockly.Blocks['procedures_callnoreturn_local'] = Blockly.Blocks['procedures_callnoreturn'];

/**
 * Create an object to represent the (non-editable) name and arguments.
 * @return {object} Mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['procedures_callnoreturn_local'].mutationToObject = function(){
    return {
        'name' : this.getProcedureCall()
        ,'arguments' : this.arguments_.concat()
    };
};

/**
 * Parse an object to restore the (non-editable) name and parameters.
 * @param {object} obj The mutation data.
 * @this Blockly.Block
 */
Blockly.Blocks['procedures_callnoreturn_local'].objectToMutation = function(obj) {
    var name = obj.name;
    this.setFieldValue(name, 'NAME');

    if( this.outputConnection ) {
        var tooltip = Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP || "";
    } else {
        var tooltip = Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP || "";
    }

    this.setTooltip( tooltip.replace('%1', name) );

    var def = Blockly.Procedures.getDefinition(name, this.workspace);
    if (def && def.mutator && def.mutator.isVisible()) {
        // Initialize caller with the mutator's IDs.
        this.setProcedureParameters(def.arguments_, def.paramIds_);
    } else {
        var args = obj.arguments.concat();
        // For the second argument (paramIds) use the arguments list as a dummy
        // list.
        this.setProcedureParameters(args, args);
    }
};

/**
 * Notification that a variable is renaming.
 * If the name matches one of this block's variables, rename it.
 * @param {string} oldName Previous name of variable.
 * @param {string} newName Renamed variable.
 * @this Blockly.Block
 */
Blockly.Blocks['procedures_callnoreturn_local'].localRenameVar = Blockly.Blocks['procedures_callnoreturn_local'].renameVar;

Blockly.Blocks['procedures_callreturn_local'] = {
    /**
     * Block for calling a procedure with a return value.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL);
        this.setColour( Blockly.Variables.COLOUR.FUNCTIONS );
        this.appendDummyInput('TOPROW')
            .appendField(Blockly.Msg.PROCEDURES_CALLRETURN_CALL)
            .appendField('', 'NAME');
        this.setOutput(true);
        // Tooltip is set in domToMutation.
        this.arguments_ = [];
        this.quarkConnections_ = {};
        this.quarkArguments_ = null;
    },
    getProcedureCall: Blockly.Blocks['procedures_callnoreturn_local'].getProcedureCall,
    renameProcedure: Blockly.Blocks['procedures_callnoreturn_local'].renameProcedure,
    setProcedureParameters:
    Blockly.Blocks['procedures_callnoreturn_local'].setProcedureParameters,
    renderArgs_: Blockly.Blocks['procedures_callnoreturn_local'].renderArgs_,
    mutationToDom: Blockly.Blocks['procedures_callnoreturn_local'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_callnoreturn_local'].domToMutation,
    mutationToObject: Blockly.Blocks['procedures_callnoreturn_local'].mutationToObject,
    objectToMutation: Blockly.Blocks['procedures_callnoreturn_local'].objectToMutation,
    localRenameVar: Blockly.Blocks['procedures_callnoreturn_local'].localRenameVar,
    customContextMenu: Blockly.Blocks['procedures_callnoreturn_local'].customContextMenu
};