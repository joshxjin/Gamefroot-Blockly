/**
 * Created by claire on 16/02/2017.
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
 * @fileoverview XML reader and writer.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

//goog.provide('Blockly.Xml');

// TODO(scr): Fix circular dependencies
// goog.require('Blockly.Block');
goog.require('goog.dom');

/**
 * Decode an XML block tag and create a block (and possibly sub blocks) on the
 * workspace.
 * @param {!Blockly.Workspace} workspace The workspace.
 * @param {!Element} xmlBlock XML block element.
 * @param {boolean=} opt_reuseBlock Optional arg indicating whether to
 *     reinitialize an existing block.
 * @return {!Blockly.Block} The root block created.
 * @private
 */
Blockly.Xml.domToBlockHeadless_ = function (workspace, xmlBlock, opt_reuseBlock) {
    var block = null;
    var prototypeName = xmlBlock.getAttribute('type');
    if (!prototypeName) {
        throw 'Block type unspecified: \n' + xmlBlock.outerHTML;
    }
    var id = xmlBlock.getAttribute('id');
    if (opt_reuseBlock && id) {
        // Only used by realtime.
        block = Blockly.Block.getById(id, workspace);
        // TODO: The following is for debugging.  It should never actually happen.
        if (!block) {
            throw 'Couldn\'t get Block with id: ' + id;
        }
        var parentBlock = block.getParent();
        // If we've already filled this block then we will dispose of it and then
        // re-fill it.
        if (block.workspace) {
            block.dispose(true, false, true);
        }
        block.fill(workspace, prototypeName);
        block.parent_ = parentBlock;
    } else {
        block = Blockly.Block.obtain(workspace, prototypeName, xmlBlock);
    }

    var blockChild = null;
    for (var i = 0, xmlChild; xmlChild = xmlBlock.childNodes[i]; i++) {
        if (xmlChild.nodeType == 3) {
            // Ignore any text at the <block> level.  It's all whitespace anyway.
            continue;
        }
        var input;

        // Find any enclosed blocks or shadows in this tag.
        var childBlockNode = null;
        var childShadowNode = null;
        var shadowActive = false;
        for (var j = 0, grandchildNode; grandchildNode = xmlChild.childNodes[j];
             j++) {
            if (grandchildNode.nodeType == 1) {
                if (grandchildNode.nodeName.toLowerCase() == 'block') {
                    childBlockNode = grandchildNode;
                } else if (grandchildNode.nodeName.toLowerCase() == 'shadow') {
                    childShadowNode = grandchildNode;
                }
            }
        }
        // Use the shadow block if there is no child block.
        if (!childBlockNode && childShadowNode) {
            childBlockNode = childShadowNode;
            shadowActive = true;
        }

        var name = xmlChild.getAttribute('name');
        switch (xmlChild.nodeName.toLowerCase()) {
            case 'mutation':
                // Custom data for an advanced block.
                if (block.domToMutation) {
                    block.domToMutation(xmlChild);
                    if (block.initSvg) {
                        // Mutation may have added some elements that need initalizing.
                        block.initSvg();
                    }
                }
                break;
            case 'comment':
                block.setCommentText(xmlChild.textContent);
                var visible = xmlChild.getAttribute('pinned');
                if (visible) {
                    // Give the renderer a millisecond to render and position the block
                    // before positioning the comment bubble.
                    setTimeout(function () {
                        if (block.comment && block.comment.setVisible) {
                            block.comment.setVisible(visible == 'true');
                        }
                    }, 1);
                }
                var bubbleW = parseInt(xmlChild.getAttribute('w'), 10);
                var bubbleH = parseInt(xmlChild.getAttribute('h'), 10);
                if (!isNaN(bubbleW) && !isNaN(bubbleH) &&
                    block.comment && block.comment.setVisible) {
                    block.comment.setBubbleSize(bubbleW, bubbleH);
                }
                break;
            case 'data':
                // Optional text data that round-trips beween blocks and XML.
                // Has no effect.  May be used by 3rd parties for meta information.
                block.data = xmlChild.textContent;
                break;
            case 'title':
            // Titles were renamed to field in December 2013.
            // Fall through.
            case 'field':
                var field = block.getField(name);
                if (!field) {
                    console.warn('Ignoring non-existent field ' + name + ' in block ' +
                        prototypeName);
                    break;
                }
                field.setValue(xmlChild.textContent);
                break;
            case 'value':
            case 'statement':
                input = block.getInput(name);
                if (!input) {
                    console.warn('Ignoring non-existent input ' + name + ' in block ' +
                        prototypeName);
                    break;
                }
                if (childShadowNode) {
                    input.connection.setShadowDom(childShadowNode);
                }
                if (childBlockNode) {
                    blockChild = Blockly.Xml.domToBlockHeadless_(workspace,
                        childBlockNode, opt_reuseBlock);
                    if (blockChild.outputConnection) {
                        input.connection.connect(blockChild.outputConnection);
                    } else if (blockChild.previousConnection) {
                        input.connection.connect(blockChild.previousConnection);
                    } else {
                        throw 'Child block does not have output or previous statement.';
                    }
                }
                break;
            case 'next':
                if (childShadowNode && block.nextConnection) {
                    block.nextConnection.setShadowDom(childShadowNode);
                }
                if (childBlockNode) {
                    if (!block.nextConnection) {
                        throw 'Next statement does not exist.';
                    } else if (block.nextConnection.targetConnection) {
                        // This could happen if there is more than one XML 'next' tag.
                        throw 'Next statement is already connected.';
                    }
                    blockChild = Blockly.Xml.domToBlockHeadless_(workspace,
                        childBlockNode, opt_reuseBlock);
                    if (!blockChild.previousConnection) {
                        throw 'Next block does not have previous statement.';
                    }
                    block.nextConnection.connect(blockChild.previousConnection);
                }
                break;
            default:
                // Unknown tag; ignore.  Same principle as HTML parsers.
                console.warn('Ignoring unknown tag: ' + xmlChild.nodeName);
        }
    }

    var inline = xmlBlock.getAttribute('inline');
    if (inline) {
        block.setInputsInline(inline == 'true');
    }
    var disabled = xmlBlock.getAttribute('disabled');
    if (disabled) {
        block.setDisabled(disabled == 'true');
    }
    var deletable = xmlBlock.getAttribute('deletable');
    if (deletable) {
        block.setDeletable(deletable == 'true');
    }
    var movable = xmlBlock.getAttribute('movable');
    if (movable) {
        block.setMovable(movable == 'true');
    }
    var editable = xmlBlock.getAttribute('editable');
    if (editable) {
        block.setEditable(editable == 'true');
    }
    var collapsed = xmlBlock.getAttribute('collapsed');
    if (collapsed) {
        block.setCollapsed(collapsed == 'true');
    }
    if (xmlBlock.nodeName.toLowerCase() == 'shadow') {
        block.setShadow(true);
    }

    // Give the block a chance to clean up any initial inputs.
    if (block.validate) {
        block.validate();
    }

    // Once the block is all set up, call post init
    var func = block.postInit;
    if (func) func.call(block);

    return block;
};
