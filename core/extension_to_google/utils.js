/**
 * Created by josh on 16/02/17.
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
 * @fileoverview Utility methods.
 * These methods are not specific to Blockly, and could be factored out into
 * a JavaScript framework such as Closure.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

//goog.provide('Blockly.utils');

goog.require('goog.dom');
goog.require('goog.events.BrowserFeature');
goog.require('goog.math.Coordinate');
goog.require('goog.userAgent');

/**
 * Bind an event to a function call.
 * @param {!Node} node Node upon which to listen.
 * @param {string} name Event name to listen to (e.g. 'mousedown').
 * @param {Object} thisObject The value of 'this' in the function.
 * @param {!Function} func Function to call when event is triggered.
 * @return {!Array.<!Array>} Opaque data that can be passed to unbindEvent_.
 * @private
 */
Blockly.bindEvent_ = function(node, name, thisObject, func) {
  if (thisObject) {
    var wrapFunc = function(e) {
      func.call(thisObject, e);
    };
  } else {
    var wrapFunc = func;
  }
  node.addEventListener(name, wrapFunc, false);
  var bindData = [[node, name, wrapFunc]];
  // Add equivalent touch event.
  if (name in Blockly.bindEvent_.TOUCH_MAP) {
    wrapFunc = function(e) {
      // Punt on multitouch events.
      if (e.changedTouches.length == 1) {
        // Map the touch event's properties to the event.
        var touchPoint = e.changedTouches[0];
        e.clientX = touchPoint.clientX;
        e.clientY = touchPoint.clientY;
      }
      func.call(thisObject, e);
      // Stop the browser from scrolling/zooming the page.
      e.preventDefault();
    };
    for (var i = 0, eventName;
         eventName = Blockly.bindEvent_.TOUCH_MAP[name][i]; i++) {
      node.addEventListener(eventName, wrapFunc, false);
      bindData.push([node, eventName, wrapFunc]);
    }
  }
  return bindData;
};

/**
 * The TOUCH_MAP lookup dictionary specifies additional touch events to fire,
 * in conjunction with mouse events.
 * @type {Object}
 */
Blockly.bindEvent_.TOUCH_MAP = {};
if (goog.events.BrowserFeature.TOUCH_ENABLED) {
  Blockly.bindEvent_.TOUCH_MAP = {
    'mousedown': ['touchstart'],
    'mousemove': ['touchmove'],
    'mouseup': ['touchend', 'touchcancel']
  };
}

/**
 * Unbind one or more events event from a function call.
 * @param {!Array.<!Array>} bindData Opaque data from bindEvent_.  This list is
 *     emptied during the course of calling this function.
 * @return {!Function} The function call.
 * @private
 */
Blockly.unbindEvent_ = function(bindData) {
  while (bindData.length) {
    var bindDatum = bindData.pop();
    var node = bindDatum[0];
    var name = bindDatum[1];
    var func = bindDatum[2];
    node.removeEventListener(name, func, false);
  }
  return func;
};

/**
 * Fire a synthetic event synchronously.
 * @param {!EventTarget} node The event's target node.
 * @param {string} eventName Name of event (e.g. 'click').
 */
Blockly.fireUiEventNow = function(node, eventName) {
  // Remove the event from the anti-duplicate database.
  var list = Blockly.fireUiEvent.DB_[eventName];
  if (list) {
    var i = list.indexOf(node);
    if (i != -1) {
      list.splice(i, 1);
    }
  }
  // Fire the event in a browser-compatible way.
  if (document.createEvent) {
    // W3
    var evt = document.createEvent('UIEvents');
    evt.initEvent(eventName, true, true);  // event type, bubbling, cancelable
    node.dispatchEvent(evt);
  } else if (document.createEventObject) {
    // MSIE
    var evt = document.createEventObject();
    node.fireEvent('on' + eventName, evt);
  } else {
    throw 'FireEvent: No event creation mechanism.';
  }
};

/**
 * Fire a synthetic event asynchronously.  Groups of simultaneous events (e.g.
 * a tree of blocks being deleted) are merged into one event.
 * @param {!EventTarget} node The event's target node.
 * @param {string} eventName Name of event (e.g. 'click').
 */
Blockly.fireUiEvent = function(node, eventName) {
  var list = Blockly.fireUiEvent.DB_[eventName];
  if (list) {
    if (list.indexOf(node) != -1) {
      // This event is already scheduled to fire.
      return;
    }
    list.push(node);
  } else {
    Blockly.fireUiEvent.DB_[eventName] = [node];
  }
  var fire = function() {
    Blockly.fireUiEventNow(node, eventName);
  };
  setTimeout(fire, 0);
};

/**
 * Database of upcoming firing event types.
 * Used to fire only one event after multiple changes.
 * @type {!Object}
 * @private
 */
Blockly.fireUiEvent.DB_ = {};

/**
 * Return the absolute coordinates of the top-left corner of this element,
 * scales that after canvas SVG element, if it's a descendant.
 * The origin (0,0) is the top-left corner of the Blockly SVG.
 * @param {!Element} element Element to find the coordinates of.
 * @param {!Blockly.Workspace} workspace Element must be in this workspace.
 * @return {!goog.math.Coordinate} Object with .x and .y properties.
 * @private
 */
Blockly.getSvgXY_ = function(element, workspace) {
    var x = 0;
    var y = 0;
    var scale = 1;
    if (goog.dom.contains(workspace.getCanvas(), element) ||
        goog.dom.contains(workspace.getBubbleCanvas(), element)) {
        // Before the SVG canvas, scale the coordinates.
        scale = workspace.scale;
    }
    do {
        // Loop through this block and every parent.
        var xy = Blockly.getRelativeXY_(element);
        if (element == workspace.getCanvas() ||
            element == workspace.getBubbleCanvas()) {
            // After the SVG canvas, don't scale the coordinates.
            scale = 1;
        }
        x += xy.x * scale;
        y += xy.y * scale;
        element = element.parentNode;
    } while (element && element !== workspace.options.svg );

    return new goog.math.Coordinate(x, y);
};

/**
 * Deselect any selections on the webpage.
 * Chrome will select text outside the SVG when double-clicking.
 * Deselect this text, so that it doesn't mess up any subsequent drag.
 */
Blockly.removeAllRanges = function() {
  if (window.getSelection) {
    setTimeout(function() {
        try {
          var selection = window.getSelection();
          if (!selection.isCollapsed) {
            selection.removeAllRanges();
          }
        } catch (e) {
          // MSIE throws 'error 800a025e' here.
        }
      }, 0);
  }
};

/**
 * Is the given string a number (includes negative and decimals).
 * @param {string} str Input string.
 * @return {boolean} True if number, false otherwise.
 */
Blockly.isNumber = function(str) {
  return !!str.match(/^\s*-?\d+(\.\d+)?\s*$/);
};