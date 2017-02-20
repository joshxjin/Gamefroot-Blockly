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

goog.provide('Blockly.Variables');

// TODO(scr): Fix circular dependencies
// goog.require('Blockly.Block');
goog.require('Blockly.Workspace');
goog.require('goog.string');

/**
 * Category to separate variable names from procedures and generated functions.
 */
Blockly.Variables.NAME_TYPE = 'VARIABLE';

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

/**
 * A Complete list of all variables types available.
 * Contains a tuple of both the variables display name and
 * it's definition name.
 * @return {Array}
 */
Blockly.Variables.allTypes = function(){
  return [
    /* We don't allow the any type here!
    [Blockly.Msg.VARIABLES_TYPE_ANY,
      Blockly.Variables.TYPE_ANY],*/
    [Blockly.Msg.VARIABLES_TYPE_BOOLEAN || "",
      Blockly.Variables.TYPE_BOOLEAN],
    [Blockly.Msg.VARIABLES_TYPE_NUMBER || "",
      Blockly.Variables.TYPE_NUMBER],
    [Blockly.Msg.VARIABLES_TYPE_STRING || "",
      Blockly.Variables.TYPE_STRING],
    [Blockly.Msg.VARIABLES_TYPE_COLOUR || "",
      Blockly.Variables.TYPE_COLOUR],
    [Blockly.Msg.VARIABLES_TYPE_ARRAY || "",
      Blockly.Variables.TYPE_ARRAY],
    [Blockly.Msg.VARIABLES_TYPE_INSTANCE || "",
      Blockly.Variables.TYPE_INSTANCE],
    [Blockly.Msg.VARIABLES_TYPE_CLASS || "",
      Blockly.Variables.TYPE_CLASS],
    [Blockly.Msg.VARIABLES_TYPE_SOUND || "",
      Blockly.Variables.TYPE_SOUND],
    [Blockly.Msg.VARIABLES_TYPE_POINTER || "",
      Blockly.Variables.TYPE_POINTER],
    [Blockly.Msg.VARIABLES_TYPE_COORDINATE || "",
      Blockly.Variables.TYPE_COORDINATE]
  ];
};


/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Array.<!Blockly.Block>} blocks List of blocks to show.
 * @param {!Array.<number>} gaps List of widths between blocks.
 * @param {number} margin Standard margin width for calculating gaps.
 * @param {!Blockly.Workspace} workspace The flyout's workspace.
 */
Blockly.Variables.flyoutCategory = function(blocks, gaps, margin, workspace) {

  function generateBlocks( variableList, getBlockName, setBlockName, getVarsMethodName ) {

    if(!variableList) {
      return;
    }

    variableList.sort(goog.string.caseInsensitiveCompare);

    // In addition to the user's variables, we also want to display the default
    // variable name at the top.  We also don't want this duplicated if the
    // user has created a variable of the same name.
    variableList.unshift(null);
    
    var defaultVariable = undefined;

    for (var i = 0; i < variableList.length; i++) {
      if (variableList[i] === defaultVariable) {
        continue;
      }
      var getBlock = Blockly.Blocks[ getBlockName ] ?
          Blockly.Block.obtain(workspace, getBlockName ) : null;
      var setBlock = Blockly.Blocks[ setBlockName ] ?
          Blockly.Block.obtain(workspace, setBlockName) : null;

      if (variableList[i] === null) {
        defaultVariable = (getBlock || setBlock)[ getVarsMethodName ]()[0];
      }
      else {
        getBlock && getBlock.setFieldValue(variableList[i], 'VAR');
        setBlock && setBlock.setFieldValue(variableList[i], 'VAR');
      }    

      setBlock && blocks.push(setBlock);
      getBlock && blocks.push(getBlock);

      if (getBlock && setBlock) {
        gaps.push(margin, margin * 3);
      } else {
        gaps.push(margin * 2);
      }

      getBlock && typeof getBlock.postInit === 'function' 
        && getBlock.postInit.call(getBlock);
      setBlock && typeof setBlock.postInit === 'function' 
        && setBlock.postInit.call(setBlock);

      getBlock && getBlock.initSvg();
      setBlock && setBlock.initSvg();
    }

  }

  function generateCategory( title ) { 

    if( !Blockly.Blocks["kiwi_block_category"] ) {
      return;
    }

    var catBlock = document.createElement('block');
    catBlock.setAttribute('message', title);
    catBlock.setAttribute('type', 'kiwi_block_category');
    catBlock = Blockly.Block.obtain( workspace, "kiwi_block_category", catBlock );

    if( catBlock ) {
      gaps.push( margin * 2 );
      blocks.push( catBlock );
      catBlock.initSvg();
    }

  }

  generateCategory( 'Global' );
  //Global Scope
  generateBlocks( 
    Blockly.Variables.Global.allVariables(workspace.targetWorkspace),
    'variables_global_get',
    'variables_global_set',
    'globalGetVars'
     );

  generateCategory( 'Properties' );

  //Generate Regular Variables
  generateBlocks( 
    Blockly.Variables.allVariables(workspace.targetWorkspace),
    'variables_get',
    'variables_set',
    'getVars'
     );

  generateCategory( 'Local' );

  //Generate Local Variables 
  generateBlocks( 
    Blockly.Variables.Local.allVariables(workspace.targetWorkspace),
    'variables_local_get',
    'variables_local_set',
    'localGetVars'
     );

};

/**
* Return a new variable name that is not yet being used. This will try to
* generate single letter variable names in the range 'i' to 'z' to start with.
* If no unique name is located it will try 'i' to 'z', 'a' to 'h',
* then 'i2' to 'z2' etc.  Skip 'l'.
 * @param {!Blockly.Workspace} workspace The workspace to be unique in.
* @return {string} New variable name.
*/
Blockly.Variables.generateUniqueName = function(workspace, getAllVariableFunc) {
  
  if( !getAllVariableFunc ) getAllVariableFunc = Blockly.Variables.allVariables;

  var variableList = getAllVariableFunc( workspace );
  var newName = '';
  if (variableList.length) {
    var nameSuffix = 1;
    var letters = 'ijkmnopqrstuvwxyzabcdefgh';  // No 'l'.
    var letterIndex = 0;
    var potName = letters.charAt(letterIndex);
    while (!newName) {
      var inUse = false;
      for (var i = 0; i < variableList.length; i++) {
        if (variableList[i].toLowerCase() == potName) {
          // This potential name is already used.
          inUse = true;
          break;
        }
      }
      if (inUse) {
        // Try the next potential name.
        letterIndex++;
        if (letterIndex == letters.length) {
          // Reached the end of the character sequence so back to 'i'.
          // a new suffix.
          letterIndex = 0;
          nameSuffix++;
        }
        potName = letters.charAt(letterIndex);
        if (nameSuffix > 1) {
          potName += nameSuffix;
        }
      } else {
        // We can use the current potential name.
        newName = potName;
      }
    }
  } else {
    newName = 'i';
  }
  return newName;
};
