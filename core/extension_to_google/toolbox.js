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
 * @fileoverview Toolbox from whence to create blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Toolbox');

goog.require('Blockly.Flyout');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.BrowserFeature');
goog.require('goog.html.SafeHtml');
goog.require('goog.math.Rect');
goog.require('goog.style');
goog.require('goog.ui.tree.TreeControl');
goog.require('goog.ui.tree.TreeNode');


/**
 * Configuration constants for Closure's tree UI.
 * @type {Object.<string,*>}
 * @const
 * @private
 */
Blockly.Toolbox.prototype.CONFIG_ = {
    indentWidth: 0,
    cssRoot: 'blocklyTreeRoot',
    cssHideRoot: 'blocklyHidden',
    cssItem: '',
    cssTreeRow: 'blocklyTreeRow',
    cssItemLabel: 'blocklyTreeLabel',
    cssTreeIcon: 'blocklyTreeIcon',
    cssExpandedFolderIcon: '',
    cssFileIcon: '',
    cssSelectedRow: 'blocklyTreeSelected'
};



/**
 * Initializes the toolbox.
 */
Blockly.Toolbox.prototype.init = function() {
    var workspace = this.workspace_;

    // Create an HTML container for the Toolbox menu.
    this.HtmlDiv = goog.dom.createDom('div', 'blocklyToolboxDiv');
    this.HtmlDiv.setAttribute('dir', workspace.RTL ? 'RTL' : 'LTR');
    workspace.options.svg.parentNode.appendChild( this.HtmlDiv );

    // Clicking on toolbar closes popups.
    Blockly.bindEvent_(this.HtmlDiv, 'mousedown', this,
        function(e) {
            if (Blockly.isRightButton(e) || e.target == this.HtmlDiv) {
                // Close flyout.
                Blockly.hideChaff(false);
            } else {
                // Just close popups.
                Blockly.hideChaff(true);
            }
        });
    var workspaceOptions = {
        parentWorkspace: workspace,
        RTL: workspace.RTL,
        svg: workspace.options.svg
    };
    /**
     * @type {!Blockly.Flyout}
     * @private
     */
    this.flyout_ = new Blockly.Flyout(workspaceOptions);
    goog.dom.insertSiblingAfter(this.flyout_.createDom(), workspace.svgGroup_);
    this.flyout_.init(workspace);

    this.CONFIG_['cleardotPath'] = workspace.options.pathToMedia + '1x1.gif';
    this.CONFIG_['cssCollapsedFolderIcon'] =
        'blocklyTreeIconClosed' + (workspace.RTL ? 'Rtl' : 'Ltr');
    var tree = new Blockly.Toolbox.TreeControl(this, this.CONFIG_);
    this.tree_ = tree;
    tree.setShowRootNode(false);
    tree.setShowLines(false);
    tree.setShowExpandIcons(false);
    tree.setSelectedItem(null);
    this.populate_(workspace.options.languageTree);
    tree.render(this.HtmlDiv);
    this.hasColours_ = true;
    if (this.hasColours_) {
        this.addColour_(tree);
    }
    this.position();
};

/**
 * Move the toolbox to the edge.
 */
Blockly.Toolbox.prototype.position = function() {
    var treeDiv = this.HtmlDiv;
    if (!treeDiv) {
        // Not initialized yet.
        return;
    }
    var svg = this.workspace_.options.svg;
    var svgPosition = goog.style.getPageOffset(svg);
    var svgSize = Blockly.svgSize(svg);
    treeDiv.style.left = '0px';
    if (this.workspace_.RTL) {
        //treeDiv.style.left = (svgPosition.x + svgSize.width - treeDiv.offsetWidth) + 'px';
    } else {
        //treeDiv.style.left = svgPosition.x + 'px';
    }
    treeDiv.style.height = svgSize.height + 'px';
    treeDiv.style.top = '0px';
    this.width = treeDiv.offsetWidth;
    if (!this.workspace_.RTL) {
        // For some reason the LTR toolbox now reports as 1px too wide.
        this.width -= 1;
    }
    this.flyout_.position();
};

/**
 * Fill the toolbox with categories and blocks.
 * @param {Node} newTree DOM tree of blocks, or null.
 * @private
 */
Blockly.Toolbox.prototype.populate_ = function(newTree) {
    var rootOut = this.tree_;
    rootOut.removeChildren();  // Delete any existing content.
    rootOut.blocks = [];
    var hasColours = false;
    function syncTrees(treeIn, treeOut) {
        for (var i = 0, childIn; childIn = treeIn.childNodes[i]; i++) {
            if (!childIn.tagName) {
                // Skip over text.
                continue;
            }
            switch (childIn.tagName.toUpperCase()) {
                case 'CATEGORY':
                    var childOut = rootOut.createNode(childIn.getAttribute('name'));
                    childOut.blocks = [];
                    treeOut.add(childOut);
                    var custom = childIn.getAttribute('custom');

                    //HACK: To support adding blocks to custom categories
                    syncTrees(childIn, childOut);

                    if (custom) {
                        // Variables and procedures are special dynamic categories.
                        childOut.blocks.push( custom );
                    }

                    var hue = childIn.getAttribute('colour');
                    if (goog.isString(hue)) {
                        //HACK
                        childOut.hexColour = Blockly.makeColour(hue);
                        hasColours = true;
                    } else {
                        childOut.hexColour = '';
                    }
                    if (childIn.getAttribute('expanded') == 'true') {
                        if (childOut.blocks.length) {
                            rootOut.setSelectedItem(childOut);
                        }
                        childOut.setExpanded(true);
                    }
                    break;
                case 'SEP':
                    treeOut.add(new Blockly.Toolbox.TreeSeparator());
                    break;
                case 'BLOCK':
                    treeOut.blocks.push(childIn);
                    break;
            }
        }
    }
    syncTrees(newTree, this.tree_);
    this.hasColours_ = hasColours;

    if (rootOut.blocks.length) {
        throw 'Toolbox cannot have both blocks and categories in the root level.';
    }

    // Fire a resize event since the toolbox may have changed width and height.
    Blockly.fireUiEvent(window, 'resize');
};

/**
 * Recursively add colours to this toolbox.
 * @param {!Blockly.Toolbox.TreeNode}
 * @private
 */
Blockly.Toolbox.prototype.addColour_ = function(tree) {
    var children = tree.getChildren();
    for (var i = 0, child; child = children[i]; i++) {
        var element = child.getRowElement();
        if (element) {
            var border = '8px solid ' + (child.hexColour || '#57e');
            if (this.workspace_.RTL) {
                element.style.borderRight = border;
            } else {
                element.style.borderLeft = border;
            }
        }
        this.addColour_(child);
    }
};