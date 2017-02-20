/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview English strings.
 * @author fraser@google.com (Neil Fraser)
 *
 * After modifying this file, either run "build.py" from the parent directory,
 * or run (from this directory):
 * ../i18n/js_to_json.py
 * to regenerate json/{en,qqq,synonyms}.json.
 *
 * To convert all of the json files to .js files, run:
 * ../i18n/create_messages.py json/*.json
 */
'use strict';

// Blockly.Msg.en is alaready provided in the /msg/messages.js file

// goog.provide('Blockly.Msg.en');

goog.require('Blockly.Msg');

//--------------------------------------------------------------------------------------
/**This section was originally google blockly code that has since been removed by google; but is still being used by blockly*/

/**This has since been removed, but is used in blocks/kiwifroot/deprecated.js
It is in a file called deprecated.js; we don't know if it's actually deprecated or not
*/

/// block text - In most (if not all) languages, this will be the empty string.
/// It precedes the name of the function that should be run.  See, for example,
/// the "draw square" block in [https://blockly-demo.appspot.com/static/apps/turtle/index.html#ztz96g].
Blockly.Msg.PROCEDURES_CALLNORETURN_CALL = '';
/**This came with no comment, same as above for context*/
Blockly.Msg.PROCEDURES_CALLRETURN_CALL = Blockly.Msg.PROCEDURES_CALLNORETURN_CALL;

/// helpurl -
Blockly.Msg.LISTS_ADD_HELPURL = '';
/// message one -
Blockly.Msg.LISTS_ADD_MESSAGE_ONE = 'in list';
/// message two -
Blockly.Msg.LISTS_ADD_MESSAGE_TWO = 'add';
/// message three-
Blockly.Msg.LISTS_ADD_MESSAGE_THREE = 'to the';
/// tooltip -
Blockly.Msg.LISTS_ADD_TOOLTIP = 'Adds a value to either the front or to the end of a list provided.';

//--------------------------------------------------------------------------------------
/**The below is gamefroot's custom code*/

/// warning - This appears when a block is being removed from use and can be replaced with another block
Blockly.Msg.KF_BLOCK_DEPRECATED = 'Warning: This block is being discontinued';

/// The display name of the boolean type
Blockly.Msg.KF_TYPE_BOOLEAN = 'True/False';
/// The display name of the boolean type
Blockly.Msg.KF_TYPE_NUMBER = 'Number';
/// The display name of the boolean type
Blockly.Msg.KF_TYPE_STRING = 'Text';
/// The display name of the boolean type
Blockly.Msg.KF_TYPE_INSTANCE = 'Instance';

/// Label text for the kiwifroot create event
Blockly.Msg.KF_EVENT_CREATE_MESSAGE = 'When created';
/// tooltip - The event dispatched when the game object this script is attached to is created
Blockly.Msg.KF_EVENT_CREATE_TOOLTIP = 'The event triggered when this game object is created';
/// url - Information on the kiwifroot create event
Blockly.Msg.KF_EVENT_CREATE_HELPURL = '';
/// Label text for the kiwifroot constantly event
Blockly.Msg.KF_EVENT_CONSTANTLY_MESSAGE = 'Constantly';
/// tooltip - The event triggered every frame
Blockly.Msg.KF_EVENT_CONSTANTLY_TOOLTIP = 'The event triggered every frame';
/// url - Information on the kiwifroot constantly event
Blockly.Msg.KF_EVENT_CONSTANTLY_HELPURL = '';
/// Label text for the kiwifroot stage pressed event
Blockly.Msg.KF_EVENT_STAGE_PRESS_MESSAGE = 'When stage is pressed';
/// tooltip - The event dispatched when the player clicks/touches the game stage
Blockly.Msg.KF_EVENT_STAGE_PRESS_TOOLTIP = 'The event triggered when the player presses a click/touch down anywhere in the game scene.';
/// url - Information on the kiwifroot stage press event
Blockly.Msg.KF_EVENT_STAGE_PRESS_HELPURL = '';
/// Label - text for the kiwifroot stage released event
Blockly.Msg.KF_EVENT_STAGE_RELEASE_MESSAGE = 'When stage is released';
/// tooltip - The event dispatched when the player releases a click/touch of the game stage
Blockly.Msg.KF_EVENT_STAGE_RELEASE_TOOLTIP = 'The event triggered when the player releases a click/touch anywhere in the game scene.';
/// url - Information on the kiwifroot stage release event
Blockly.Msg.KF_EVENT_STAGE_RELEASE_HELPURL = '';

/// helpurl -
Blockly.Msg.KF_EVENT_PRE_CONSTANTLY_HELPURL = '';
/// message -
Blockly.Msg.KF_EVENT_PRE_CONSTANTLY_MESSAGE = 'Pre Constantly';
/// tooltip -
Blockly.Msg.KF_EVENT_PRE_CONSTANTLY_TOOLTIP = 'Triggered every frame BEFORE the constantly event blocks.';

/// helpurl -
Blockly.Msg.KF_EVENT_POST_CONSTANTLY_HELPURL = '';
/// message -
Blockly.Msg.KF_EVENT_POST_CONSTANTLY_MESSAGE = 'Post Constantly';
/// tooltip -
Blockly.Msg.KF_EVENT_POST_CONSTANTLY_TOOLTIP = 'Triggered every frame AFTER the constantly event blocks.';


/// url -
Blockly.Msg.KF_EVENT_STAGE_INPUT_HELPURL = '';
/// Label -
Blockly.Msg.KF_EVENT_STAGE_INPUT_MESSAGE = 'When the stage is';
/// tooltip -
Blockly.Msg.KF_EVENT_STAGE_INPUT_TOOLTIP = 'The event is trggered when the player either pressed or releases anywhere in the game scene.';

/// Label text for the kiwifroot instance pressed event.
Blockly.Msg.KF_EVENT_INST_PRESS_MESSAGE = 'When the player presses on ';
/// tooltip - The event triggered when the player presses a click/touch on the given instance.
Blockly.Msg.KF_EVENT_INST_PRESS_TOOLTIP = 'The event triggered when the player presses a click/touch on the given instance.';
/// url - Information on the kiwifroot instance pressed event.
Blockly.Msg.KF_EVENT_INST_PRESS_HELPURL = '';
/// Label text for the kiwifroot instance pressed event.
Blockly.Msg.KF_EVENT_INST_RELEASE_MESSAGE = 'When the player releases over ';
//// tooltip - The event triggered when the player presses a click/touch on the given instance.
Blockly.Msg.KF_EVENT_INST_RELEASE_TOOLTIP = 'The event triggered when the player releases a click/touch on the given instance.';
/// url - Information on the kiwifroot instance pressed event.
Blockly.Msg.KF_EVENT_INST_RELEASE_HELPURL = '';

/// url -
Blockly.Msg.KF_EVENT_INST_INPUT_HELPURL = '';
/// Label -
Blockly.Msg.KF_EVENT_INST_INPUT_MESSAGE = 'When the player ';
/// tooltip -
Blockly.Msg.KF_EVENT_INST_INPUT_TOOLTIP = 'The event is triggered when the player releases/presses (click/touch) a given instance';

/// Label - text for the kiwifroot key pressed event
Blockly.Msg.KF_EVENT_KEY_PRESS_MESSAGE = 'When the player presses';
/// tooltip - The event triggered when the player presses the given key on their keyboard.
Blockly.Msg.KF_EVENT_KEY_PRESS_TOOLTIP = 'The event triggered when the player presses the given key on their keyboard.';
/// url - Information on the kiwifroot key press event
Blockly.Msg.KF_EVENT_KEY_PRESS_HELPURL = '';
/// Label text for the kiwifroot key released event
Blockly.Msg.KF_EVENT_KEY_RELEASE_MESSAGE = 'When the player releases';
/// tooltip - The event triggered when the player releases the given key on their keyboard.
Blockly.Msg.KF_EVENT_KEY_RELEASE_TOOLTIP = 'The event triggered when the player releases the given key on their keyboard.';
/// url - Information on the kiwifroot key release event
Blockly.Msg.KF_EVENT_KEY_RELEASE_HELPURL = '';

/// url -
Blockly.Msg.KF_EVENT_KEY_INPUT_HELPURL = '';
/// Label -
Blockly.Msg.KF_EVENT_KEY_INPUT_MESSAGE = 'When the player';
/// tooltip -
Blockly.Msg.KF_EVENT_KEY_INPUT_TOOLTIP = 'The event is triggered when the player presses/releases the given key on their keyboard.';

/// url -
Blockly.Msg.KF_EVENT_TIME_HELPURL = '';

/// Label -
Blockly.Msg.KF_EVENT_TIME_MESSAGE_BEFORE = 'Every' ;
/// Label -
Blockly.Msg.KF_EVENT_TIME_MESSAGE_AFTER = 'milliseconds';
/// tooltip -
Blockly.Msg.KF_EVENT_TIME_TOOLTIP = 'Triggers the event when the number of milliseconds set has passed. The number of milliseconds passed is not dynamic, meaning that it will not update once set.';
/// url -
Blockly.Msg.KF_EVENT_TIME_SINGLE_HELPURL = '';
/// Label -
Blockly.Msg.KF_EVENT_TIME_SINGLE_MESSAGE_BEFORE = 'After' ;
/// Label -
Blockly.Msg.KF_EVENT_TIME_SINGLE_MESSAGE_AFTER = 'milliseconds have passed';
/// tooltip -
Blockly.Msg.KF_EVENT_TIME_SINGLE_TOOLTIP = 'Triggers the inner blocks after the set period of time has occured. Warning: Does not check to see if the object was destroyed before the event fires.';
/// url -
Blockly.Msg.KF_EVENT_ANIMATION_HELPURL = '';
/// Label -
Blockly.Msg.KF_EVENT_ANIMATION_MESSAGE_BEFORE = 'When the animation';
/// Label -
Blockly.Msg.KF_EVENT_ANIMATION_MESSAGE_AFTER = 'has';
/// tooltip -
Blockly.Msg.KF_EVENT_ANIMATION_TOOLTIP = 'Fires events when a selected event occurs on the animation passed.';
/// url -
Blockly.Msg.KF_EVENT_TOUCH_ON_HELPURL = '';
/// Label -
Blockly.Msg.KF_EVENT_TOUCH_ON_MESSAGE = 'When I am touched by';
/// tooltip -
Blockly.Msg.KF_EVENT_TOUCH_ON_TOOLTIP = 'Triggers the inner blocks when this instance collides with the instance passed.';
/// helpurl -
Blockly.Msg.KF_EVENT_STAGE_TOUCHED_HELPURL = '';
/// message -
Blockly.Msg.KF_EVENT_STAGE_TOUCHED_MESSAGE = 'When the stage is';
/// tooltip -
Blockly.Msg.KF_EVENT_STAGE_TOUCHED_TOOLTIP = 'Executes when the stage is touched.';

/// helpurl -
Blockly.Msg.KF_EVENT_TOUCH_RETURN_HELPURL = '';
/// message -
Blockly.Msg.KF_EVENT_TOUCH_RETURN_MESSAGE = 'When I am touched get';
/// tooltip -
Blockly.Msg.KF_EVENT_TOUCH_RETURN_TOOLTIP = 'Whenever this instance is touched by another instance (using arcadephysics) it will set a variable to that instance who touched it.';

/// url -
Blockly.Msg.KF_EVENT_REMOVE_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_EVENT_REMOVE_TOOLTIP = 'The event is triggered when this gameobject is destroyed.';
/// Label -
Blockly.Msg.KF_EVENT_REMOVE_MESSAGE = 'When removed';
/// url -
Blockly.Msg.KF_EVENT_MESSAGE_HELPURL = '';
/// Label -
Blockly.Msg.KF_EVENT_MESSAGE_MESSAGE_BEFORE = 'When a message of';
/// Label -
Blockly.Msg.KF_EVENT_MESSAGE_MESSAGE_AFTER = 'is retrieved';
/// tooltip -
Blockly.Msg.KF_EVENT_MESSAGE_TOOLTIP = 'Send events when the player';
/// helpurl -
Blockly.Msg.KF_EVENT_MESSAGE_VALUE_HELPURL = '';
/// message one -
Blockly.Msg.KF_EVENT_MESSAGE_VALUE_MESSAGE_ONE = 'When a message of';
/// message two -
Blockly.Msg.KF_EVENT_MESSAGE_VALUE_MESSAGE_TWO = 'is retrieved';
/// tooltip -
Blockly.Msg.KF_EVENT_MESSAGE_VALUE_TOOLTIP = 'Executed when a message is retrieved. You can use this block to get a value send from the message with value blocks.';

/// helpurl -
Blockly.Msg.KF_EVENT_LEVEL_START_HELPURL = '';
/// message -
Blockly.Msg.KF_EVENT_LEVEL_START_MESSAGE = 'When the level';
/// tooltip -
Blockly.Msg.KF_EVENT_LEVEL_START_TOOLTIP = 'Executes when the current level starts. Only executes when a level starts up.';

/// url -
Blockly.Msg.KF_EVENT_INSTANCE_PROPERTIES_SET_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_EVENT_INSTANCE_PROPERTIES_SET_TOOLTIP = '';
/// message -
Blockly.Msg.KF_EVENT_INSTANCE_PROPERTIES_SET_MESSAGE_ONE = 'When key';
/// message -
Blockly.Msg.KF_EVENT_INSTANCE_PROPERTIES_SET_MESSAGE_TWO = 'updates';


/// tooltip - A list of special levels, they include previous/current/next and the first/last levels
Blockly.Msg.KF_GAME_LEVEL_SPECIAL_TOOLTIP = 'A list of special levels, they include previous/current/next and the first/last levels.';
/// url - Information on the special level block
Blockly.Msg.KF_GAME_LEVEL_SPECIAL_HELPURL = '';
/// Label - for the 'go to level numbered' block
Blockly.Msg.KF_GAME_GOTO_LEVEL_NUM_MESSAGE = 'go to';
/// tooltip - Changes the current level to the level specified
Blockly.Msg.KF_GAME_GOTO_LEVEL_NUM_TOOLTIP = 'Changes the current level to the level specified.';
/// url - Information on the goto level block
Blockly.Msg.KF_GAME_GOTO_LEVEL_NUM_HELPURL = '';
/// tooltip - Sets the size of the games viewport on the screen
Blockly.Msg.KF_GAME_STAGE_SET_SIZE_TOOLTIP = 'Sets the size of the games viewport on the screen.';
/// url - Information on the set position block
Blockly.Msg.KF_GAME_STAGE_SET_SIZE_HELPURL = '';
/// tooltip - Sets the size of the games viewport on the screen
Blockly.Msg.KF_GAME_STAGE_GET_SIZE_TOOLTIP = 'Gets the size of the games viewport on the screen.';
/// url - Information on the set position block
Blockly.Msg.KF_GAME_STAGE_GET_SIZE_HELPURL = '';
/// Label for the kiwifroot get stage colour block
Blockly.Msg.KF_GAME_STAGE_SET_COLOUR_MESSAGE = 'set stage colour to';
/// tooltip - Sets the size of the games viewport on the screen
Blockly.Msg.KF_GAME_STAGE_SET_COLOUR_TOOLTIP = 'Sets the colour of the game background.';
/// url - Information on the set stage colour block
Blockly.Msg.KF_GAME_STAGE_SET_COLOUR_HELPURL = '';
/// Label for the kiwifroot get stage colour block
Blockly.Msg.KF_GAME_STAGE_GET_COLOUR_MESSAGE = 'stage colour';
/// tooltip - Gets the colour of the game background
Blockly.Msg.KF_GAME_STAGE_GET_COLOUR_TOOLTIP = 'Gets the colour of the game background.';
/// url - Information on the get stage colour block
Blockly.Msg.KF_GAME_STAGE_GET_COLOUR_HELPURL = '';
/// url -
Blockly.Msg.KF_GAME_GET_TIME_HELPURL = '';
/// Label -
Blockly.Msg.KF_GAME_GET_TIME_MESSAGE = 'time';
/// tooltip -
Blockly.Msg.KF_GAME_GET_TIME_TOOLTIP = 'Returns the associate time method associated.';
/// url -
Blockly.Msg.KF_GAME_TIME_METHOD_HELPURL = '';
/// Label -
Blockly.Msg.KF_GAME_TIME_METHOD_MESSAGE = 'time';
/// tooltip -
Blockly.Msg.KF_GAME_TIME_METHOD_TOOLTIP = 'Pauses or resumes the clock, thus pausing/resume gameplay.';

/// Label for the kiwifroot self block
Blockly.Msg.KF_INSTANCE_SELF_MESSAGE = 'myself';
/// tooltip - This block returns the game object that the script is attached to
Blockly.Msg.KF_INSTANCE_SELF_TOOLTIP = 'The game object that this script is attached to.';
/// url - Information on the self block
Blockly.Msg.KF_INSTANCE_SELF_HELPURL = '';
/// Label -
Blockly.Msg.KF_INSTANCE_SELECT_MESSAGE = 'instance ';
/// url -
Blockly.Msg.KF_INSTANCE_SELECT_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_INSTANCE_SELECT_TOOLTIP = 'Selects a game object with the corresponding id.';
/// tooltip - Sets the selected property of a given instance to a new value
Blockly.Msg.KF_INSTANCE_SET_TOOLTIP = 'Sets the selected property of a given instance to a new value.';
/// url - Information on the self block
Blockly.Msg.KF_INSTANCE_SET_HELPURL = '';
/// tooltip - This block returns the game object that the script is attached to
Blockly.Msg.KF_INSTANCE_GET_TOOLTIP = 'Gets the value of a selected property of the given instance.';
/// url - Information on the self block
Blockly.Msg.KF_INSTANCE_GET_HELPURL = '';
/// url -
Blockly.Msg.KF_INSTANCE_GET_DIMENSIONS_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_INSTANCE_GET_DIMENSIONS_TOOLTIP = 'Width or height of this object. Actual height includes current scale. Raw height is simply image size.';
/// tooltip -
Blockly.Msg.KF_INSTANCE_GET_LOCATION_FROM_POSITION_TOOLTIP = 'Gets the location of the given instance.';
/// url -
Blockly.Msg.KF_INSTANCE_GET_LOCATION_FROM_POSITION_HELPURL = '';
/// url -
Blockly.Msg.KF_INSTANCE_GET_VISIBLE_HELPURL = '';
/// Label -
Blockly.Msg.KF_INSTANCE_GET_VISIBLE_MESSAGE = 'get visibility of';
/// tooltip -
Blockly.Msg.KF_INSTANCE_GET_VISIBLE_TOOLTIP = 'Returns visibility state of this gameobject. An alpha of zero is does not mean that the visiblity is false.';
/// url -
Blockly.Msg.KF_INSTANCE_SET_POSITION_FROM_LOCATION_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_INSTANCE_SET_POSITION_FROM_LOCATION_TOOLTIP = 'Sets the object X and Y to a given location.';
/// url -
Blockly.Msg.KF_INSTANCE_SET_VISIBLE_HELPURL = '';
/// Label -
Blockly.Msg.KF_INSTANCE_SET_VISIBLE_MESSAGE_BEFORE = 'set visibility of';
/// Label -
Blockly.Msg.KF_INSTANCE_SET_VISIBLE_MESSAGE_AFTER = 'to';
/// tooltip -
Blockly.Msg.KF_INSTANCE_SET_VISIBLE_TOOLTIP = 'Sets whether the gameobject should be renderer or not. An alpha of zero is does not mean that the visiblity is false.';
/// url -
Blockly.Msg.KF_INSTANCE_DEATH_HELPURL = '';
/// Label -
Blockly.Msg.KF_INSTANCE_DEATH_MESSAGE = 'destroy';
/// tooltip -
Blockly.Msg.KF_INSTANCE_DEATH_TOOLTIP = 'Destroys the selected instance. Destruction cannot be reverted!';
/// Label -
Blockly.Msg.KF_INSTANCE_ADD_TAG_MESSAGE_BEFORE = 'tag';
/// Label -
Blockly.Msg.KF_INSTANCE_ADD_TAG_MESSAGE_AFTER = 'on';
/// url -
Blockly.Msg.KF_INSTANCE_ADD_TAG_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_INSTANCE_ADD_TAG_TOOLTIP = 'Adds a tag passed to the given gameobject.';
/// url -
Blockly.Msg.KF_INSTANCE_HAS_TAG_HELPURL = '';
/// Label -
Blockly.Msg.KF_INSTANCE_HAS_TAG_MESSAGE = 'has tag';
/// tooltip -
Blockly.Msg.KF_INSTANCE_HAS_TAG_TOOLTIP = 'Returns a boolean indicating if the gameobject has the tag or not.';
/// url -
Blockly.Msg.KF_INSTANCE_GET_BY_TAG_HELPURL = '';
/// Label -
Blockly.Msg.KF_INSTANCE_GET_BY_TAG_MESSAGE = 'instance by tag';
/// tooltip -
Blockly.Msg.KF_INSTANCE_GET_BY_TAG_TOOLTIP = 'Returns a single instance by the tag passed.';
/// url -
Blockly.Msg.KF_INSTANCE_GET_ALL_BY_TAG_HELPURL = '';
/// Label -
Blockly.Msg.KF_INSTANCE_GET_ALL_BY_TAG_MESSAGE = 'get all children by tag';
/// tooltip -
Blockly.Msg.KF_INSTANCE_GET_ALL_BY_TAG_TOOLTIP = 'Returns a list of all the instances that have the tag passed.';
/// message -
Blockly.Msg.KF_INSTANCE_EXECUTE_MESSAGE = 'Execute';
/// tooltip -
Blockly.Msg.KF_INSTANCE_EXECUTE_TOOLTIP = 'Executes the text directly pasted as code.';
/// helpurl
Blockly.Msg.KF_INSTANCE_EXECUTE_HELPURL = '';

/// tooltip -
Blockly.Msg.KF_INSTANCE_PROPERTIES_SET_TOOLTIP = '';
/// url -
Blockly.Msg.KF_INSTANCE_PROPERTIES_SET_HELPURL = '';
/// message -
Blockly.Msg.KF_INSTANCE_PROPERTIES_SET_MESSAGE_ONE = 'set key';
/// message -
Blockly.Msg.KF_INSTANCE_PROPERTIES_SET_MESSAGE_TWO = 'to';
/// message -
Blockly.Msg.KF_INSTANCE_PROPERTIES_SET_MESSAGE_THREE = 'on';

/// url -
Blockly.Msg.KF_INSTANCE_PROPERTIES_GET_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_INSTANCE_PROPERTIES_GET_TOOLTIP = '';
/// message -
Blockly.Msg.KF_INSTANCE_PROPERTIES_GET_MESSAGE_ONE = 'get key';
/// message -
Blockly.Msg.KF_INSTANCE_PROPERTIES_GET_MESSAGE_TWO = 'on';

/// url -
Blockly.Msg.KF_INTERSECTS_OVERLAPS_HELPURL = '';
/// Label -
Blockly.Msg.KF_INTERSECTS_OVERLAPS_MESSAGE = 'overlaps';
/// tooltip -
Blockly.Msg.KF_INTERSECTS_OVERLAPS_TOOLTIP = 'Checks to see if the two passed instances overlap.';
/// url -
Blockly.Msg.KF_INTERSECTS_CONTAINS_HELPURL = '';
/// Label -
Blockly.Msg.KF_INTERSECTS_CONTAINS_MESSAGE = 'contains';
/// tooltip -
Blockly.Msg.KF_INTERSECTS_CONTAINS_TOOLTIP = 'Checks to see if an x/y location is within an instance\'s hitbox.';

/// Label for the keyboard key block
Blockly.Msg.KF_KEY_SPECIAL_MESSAGE = 'key:';
/// tooltip - A special keyboard key
Blockly.Msg.KF_KEY_SPECIAL_TOOLTIP = 'A special keyboard key';
/// url - information on the special key block
Blockly.Msg.KF_KEY_SPECIAL_HELPURL = '';
/// Label for the mouse position block
Blockly.Msg.KF_INPUT_MOUSE_MESSAGE = 'of mouse';
/// tooltip - The position of the mouse in the level
Blockly.Msg.KF_INPUT_MOUSE_TOOLTIP = 'The position of the mouse in the current level';
/// url - Information on the mouse position block
Blockly.Msg.KF_INPUT_MOUSE_HELPURL = '';
/// helpurl -
Blockly.Msg.KF_INPUT_FINGERS_HELPURL = '';
/// message -
Blockly.Msg.KF_INPUT_FINGERS_MESSAGE = 'all fingers';
/// tooltip -
Blockly.Msg.KF_INPUT_FINGERS_TOOLTIP = 'Returns a list of all the finger objects.';
/// helpurl -
Blockly.Msg.KF_INPUT_FINGER_SELECT_HELPURL = '';
/// message -
Blockly.Msg.KF_INPUT_FINGER_SELECT_MESSAGE = 'finger';
/// tooltip -
Blockly.Msg.KF_INPUT_FINGER_SELECT_TOOLTIP = 'Returns the finger associated with the number passed.';
/// helpurl -
Blockly.Msg.KF_INPUT_FINGER_GET_COORDS_HELPURL = '';
/// message -
Blockly.Msg.KF_INPUT_FINGER_GET_COORDS_MESSAGE = 'of';
/// tooltip
Blockly.Msg.KF_INPUT_FINGER_GET_COORDS_TOOLTIP = '';
/// helpurl -
Blockly.Msg.KF_INPUT_FINGER_GET_BOOL_HELPURL = '';
/// message -
Blockly.Msg.KF_INPUT_FINGER_GET_BOOL_MESSAGE = 'is';
/// tooltip -
Blockly.Msg.KF_INPUT_FINGER_GET_BOOL_TOOLTIP = 'Returns a boolean associated with the selected statement.';
/// helpurl -
Blockly.Msg.KF_INPUT_FINGER_GET_TIMES_HELPURL = '';
/// message -
Blockly.Msg.KF_INPUT_FINGER_GET_TIMES_MESSAGE = 'of';
/// tooltip -
Blockly.Msg.KF_INPUT_FINGER_GET_TIMES_TOOLTIP = 'A number associated with the time selected.';
/// helpurl -
Blockly.Msg.KF_INPUT_FINGER_LATEST_HELPURL = '';
/// message -
Blockly.Msg.KF_INPUT_FINGER_LATEST_MESSAGE = 'latest finger';
/// tooltip -
Blockly.Msg.KF_INPUT_FINGER_LATEST_TOOLTIP = 'The finger which was used in the last event.';

/// tooltip - A list of all the sounds included in the game
Blockly.Msg.KF_SOUND_TOOLTIP = 'A list of all the sounds included in the game.';
/// url - Information on the sound block
Blockly.Msg.KF_SOUND_HELPURL = '';
/// Label for the 'play music' block
Blockly.Msg.KF_SOUND_PLAY_BACKGROUND_MESSAGE = 'play music';
/// tooltip - Starts playing the specified music from the beginning
Blockly.Msg.KF_SOUND_PLAY_BACKGROUND_TOOLTIP = 'Starts playing the specified music from the beginning.';
/// url - Information on the play background music block
Blockly.Msg.KF_SOUND_PLAY_BACKGROUND_HELPURL = '';
/// Label for the 'stop music' block
Blockly.Msg.KF_SOUND_STOP_BACKGROUND_MESSAGE = 'stop the current music';
/// tooltip - Stops playing the current music and clears the playhead. If resumed it will start from the beginning.
Blockly.Msg.KF_SOUND_STOP_BACKGROUND_TOOLTIP = 'Stops playing the current music and clears the playhead. If resumed it will start from the beginning.';
/// url - Information on the stop background music block
Blockly.Msg.KF_SOUND_STOP_BACKGROUND_HELPURL = '';
/// Label for the 'stop music' block
Blockly.Msg.KF_SOUND_PLAY_EFFECT_MESSAGE = 'play sound effect';
/// tooltip - Plays the given sound effect once.
Blockly.Msg.KF_SOUND_PLAY_EFFECT_TOOLTIP = 'Plays the given sound effect once.';
/// url - Information on the play sound effect block
Blockly.Msg.KF_SOUND_PLAY_EFFECT_HELPURL = '';
/// url -
Blockly.Msg.KF_SOUND_BACKGROUND_STATE_HELPURL = '';
/// Label -
Blockly.Msg.KF_SOUND_BACKGROUND_STATE_MESSAGE = 'music';
/// tooltip -
Blockly.Msg.KF_SOUND_BACKGROUND_STATE_TOOLTIP = 'Pauses or resumes the current background track.';
/// url -
Blockly.Msg.KF_SOUND_SET_MUTE_HELPURL = '';
/// Label -
Blockly.Msg.KF_SOUND_SET_MUTE_MESSAGE = 'mute';
/// tooltip -
Blockly.Msg.KF_SOUND_SET_MUTE_TOOLTIP = 'Sets the mute state of the selected piece of audio by a boolean passed.';
/// url -
Blockly.Msg.KF_SOUND_GET_MUTE_HELPURL = '';
/// Label -
Blockly.Msg.KF_SOUND_GET_MUTE_MESSAGE = 'mute';
/// tooltip -
Blockly.Msg.KF_SOUND_GET_MUTE_TOOLTIP = 'Sets the mute state of the selected piece of audio by a boolean passed.';
/// url -
Blockly.Msg.KF_SOUND_GET_VOLUME_HELPURL = '';
/// Label -
Blockly.Msg.KF_SOUND_GET_VOLUME_MESSAGE = 'get volume';
/// tooltip -
Blockly.Msg.KF_SOUND_GET_VOLUME_TOOLTIP = 'Gets the volume of all sounds played. A number from 0 - 100.';
/// url -
Blockly.Msg.KF_SOUND_SET_VOLUME_HELPURL = '';
/// Label -
Blockly.Msg.KF_SOUND_SET_VOLUME_MESSAGE = 'set volume';
/// tooltip -
Blockly.Msg.KF_SOUND_SET_VOLUME_TOOLTIP = 'Sets the volume of all sounds played. A number from 0 - 100.';
/// url -
Blockly.Msg.KF_SOUND_GET_EDITOR_HELPURL = '';
/// Label -
Blockly.Msg.KF_SOUND_GET_EDITOR_MESSAGE = 'audio';
/// tooltip -
Blockly.Msg.KF_SOUND_GET_EDITOR_TOOLTIP = 'Gets audio from the Editor';
/// message -
Blockly.Msg.KF_ANIMATION_PLAY_MESSAGE = 'play animation';
/// url -
Blockly.Msg.KF_ANIMATION_PLAY_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_ANIMATION_PLAY_TOOLTIP = 'Starts playing an animation on this gameobject.';
/// message -
Blockly.Msg.KF_ANIMATION_STATE_MESSAGE = 'current animation';
/// url -
Blockly.Msg.KF_ANIMATION_STATE_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_ANIMATION_STATE_TOOLTIP = ' The state of the current animation.';
/// message before -
Blockly.Msg.KF_ANIMATION_FRAME_MESSAGE_BEFORE = 'goto';
/// message after -
Blockly.Msg.KF_ANIMATION_FRAME_MESSAGE_AFTER = 'animation frame';
/// url -
Blockly.Msg.KF_ANIMATION_FRAME_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_ANIMATION_FRAME_TOOLTIP = 'Goes to the selected frame in the current animation. If at the end of an animation it will go to the first frame, or the start if at the end.';

/// message -
Blockly.Msg.KF_ANIMATION_CURRENT_MESSAGE = 'current animation';
/// url -
Blockly.Msg.KF_ANIMATION_CURRENT_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_ANIMATION_CURRENT_TOOLTIP = 'Returns the current animation that is playing on this game object.';

/// message -
Blockly.Msg.KF_ANIMATION_NUMBERS_MESSAGE = 'current animation';
/// url -
Blockly.Msg.KF_ANIMATION_NUMBERS_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_ANIMATION_NUMBERS_TOOLTIP = 'Returns a number related to the selected field..';

/// message -
Blockly.Msg.KF_ANIMATION_BOOLEAN_MESSAGE = 'current animation';
/// url -
Blockly.Msg.KF_ANIMATION_BOOLEAN_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_ANIMATION_BOOLEAN_TOOLTIP = 'Returns true if the statement is true. False if the statement isn\'t.';


/// message -
Blockly.Msg.KF_CAMERA_PAN_TO_MESSAGE = 'camera to';
/// url -
Blockly.Msg.KF_CAMERA_PAN_TO_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_CAMERA_PAN_TO_TOOLTIP = 'Returns true if the statement is true. False if the statement isn\'t.';

/// message -
Blockly.Msg.KF_CAMERA_SET_MESSAGE_BEFORE = 'set camera';
/// message -
Blockly.Msg.KF_CAMERA_SET_MESSAGE_AFTER = 'to';
/// url -
Blockly.Msg.KF_CAMERA_SET_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_CAMERA_SET_TOOLTIP = 'Sets a selected property on the camera to the value passed.';

/// message -
Blockly.Msg.KF_CAMERA_GET_MESSAGE = 'camera';
/// url -
Blockly.Msg.KF_CAMERA_GET_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_CAMERA_GET_TOOLTIP = 'Returns a selected property on the camera.';

/// url -
Blockly.Msg.KF_CAMERA_GET_READ_ONLY_HELPURL = '';
/// message -
Blockly.Msg.KF_CAMERA_GET_READ_ONLY_MESSAGE = 'camera';
/// tooltip -
Blockly.Msg.KF_CAMERA_GET_READ_ONLY_TOOLTIP = 'Returns a selected read only property on the camera.';

/// message -
Blockly.Msg.KF_CAMERA_LOCK_ON_MESSAGE = 'lock camera on';
/// url -
Blockly.Msg.KF_CAMERA_LOCK_ON_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_CAMERA_LOCK_ON_TOOLTIP = 'Locks the camera to an Instance passed.';

/// message -
Blockly.Msg.KF_CAMERA_UNLOCK_MESSAGE = 'unlock camera';
/// url -
Blockly.Msg.KF_CAMERA_UNLOCK_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_CAMERA_UNLOCK_TOOLTIP = 'Unlocks the camera.';


/// message -
Blockly.Msg.KF_CAMERA_STATE_MESSAGE = 'is camera';
/// url -
Blockly.Msg.KF_CAMERA_STATE_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_CAMERA_STATE_TOOLTIP = 'Returns true if the statement is correct.';

/// url -
Blockly.Msg.KF_CAMERA_SCALE_HELPURL = '';
/// message -
Blockly.Msg.KF_CAMERA_SCALE_MESSAGE = 'camera scale';
/// tooltip -
Blockly.Msg.KF_CAMERA_SCALE_TOOLTIP = 'Sets the camera scale on the selected axis to a value passed.';
/// url -
Blockly.Msg.KF_CAMERA_SCALE_GET_HELPURL = '';
/// message -
Blockly.Msg.KF_CAMERA_SCALE_GET_MESSAGE = 'camera scale';
/// tooltip -
Blockly.Msg.KF_CAMERA_SCALE_GET_TOOLTIP = 'Returns the values for the cameras scale on the selected axis.';

/// url -
Blockly.Msg.KF_CAMERA_SET_SPEED_HELPURL = '';
/// message -
Blockly.Msg.KF_CAMERA_SET_SPEED_MESSAGE = 'set camera pan speed';
/// tooltip -
Blockly.Msg.KF_CAMERA_SET_SPEED_TOOLTIP = 'Sets the cameras pan speed to a value passed.';

/// url -
Blockly.Msg.KF_CAMERA_GET_SPEED_HELPURL = '';
/// message -
Blockly.Msg.KF_CAMERA_GET_SPEED_MESSAGE = 'camera pan speed';
/// tooltip -
Blockly.Msg.KF_CAMERA_GET_SPEED_TOOLTIP = 'Returns the cameras pan speed.';

/// url -
Blockly.Msg.KF_CAMERA_CENTER_ON_INSTANCE_HELPURL = '';
/// message -
Blockly.Msg.KF_CAMERA_CENTER_ON_INSTANCE_MESSAGE = 'center camera on';
/// tooltip -
Blockly.Msg.KF_CAMERA_CENTER_ON_INSTANCE_TOOLTIP = 'Centers the cameras to the instances current position.';

/// helpurl -
Blockly.Msg.KF_MATH_LERP_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_MATH_LERP_MESSAGE_TOOLTIP = '';
/// message -
Blockly.Msg.KF_MATH_LERP_MESSAGE_ONE = 'linear interpolation from';
/// message -
Blockly.Msg.KF_MATH_LERP_MESSAGE_TWO = 'to';
/// message -
Blockly.Msg.KF_MATH_LERP_MESSAGE_THREE = 'by';

/// url -
Blockly.Msg.KF_MATH_INSTANCE_HELPURL = '';
/// Label -
Blockly.Msg.KF_MATH_INSTANCE_MESSAGE_BEFORE = 'from';
/// Label -
Blockly.Msg.KF_MATH_INSTANCE_MESSAGE_AFTER = 'to';
/// tooltip -
Blockly.Msg.KF_MATH_INSTANCE_TOOLTIP = 'Returns the selected value between two instances.';

/// url -
Blockly.Msg.KF_MATH_XY_TO_XY_HELPURL = '';
/// message -
Blockly.Msg.KF_MATH_XY_TO_XY_MESSAGE_BEFORE = Blockly.Msg.KF_MATH_INSTANCE_MESSAGE_BEFORE;
/// message
Blockly.Msg.KF_MATH_XY_TO_XY_MESSAGE_AFTER = Blockly.Msg.KF_MATH_INSTANCE_MESSAGE_AFTER;

/// tooltip -
Blockly.Msg.KF_MATH_XY_TO_XY_TOOLTIP = 'Returns the selected value between an instance and a location passed.';
/// url -
Blockly.Msg.KF_MATH_UTILS_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_MATH_UTILS_TOOLTIP = '';

/// message -
Blockly.Msg.KF_WRITE_MSG = "write";
/// url -
Blockly.Msg.KF_WRITE_URL = "";
/// tooltip -
Blockly.Msg.KF_WRITE_TOOLTIP = "Used to log a message in the console and to display it on the debug screen.";

/// Label -
Blockly.Msg.KF_CLASSES_INSTANCE_MESSAGE = 'class of';
/// url -
Blockly.Msg.KF_CLASSES_INSTANCE_HELPURL = '';
/// tooltip
Blockly.Msg.KF_CLASSES_INSTANCE_TOOLTIP = 'Returns the class of the selected instance.';

/// url -
Blockly.Msg.KF_CLASSES_SELECTOR_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_CLASSES_SELECTOR_TOOLTIP = 'Returns the class selected.';

/// url -
Blockly.Msg.KF_CLASSES_GET_INSTANCE_HELPURL = '';
/// message -
Blockly.Msg.KF_CLASSES_GET_INSTANCE_MESSAGE = 'instance of';
/// tooltip -
Blockly.Msg.KF_CLASSES_GET_INSTANCE_TOOLTIP = 'Selects the corresponding instance.';

/// url -
Blockly.Msg.KF_CLASSES_GET_ALL_INSTANCES_HELPURL = '';
/// message -
Blockly.Msg.KF_CLASSES_GET_ALL_INSTANCES_MESSAGE = 'get all instances of';
/// tooltip -
Blockly.Msg.KF_CLASSES_GET_ALL_INSTANCES_TOOLTIP = 'Returns a list of all the instances with that class.';

/// url -
Blockly.Msg.KF_CLASSES_CREATE_INSTANCE_HELPURL = '';
/// Label -
Blockly.Msg.KF_CLASSES_CREATE_INSTANCE_MESSAGE_BEFORE = 'create new instance of';
/// Label -
Blockly.Msg.KF_CLASSES_CREATE_INSTANCE_MESSAGE_AFTER = 'at';
/// tooltip -
Blockly.Msg.KF_CLASSES_CREATE_INSTANCE_TOOLTIP = 'Creates a new instance of a class type at the location specified.';

/// url -
Blockly.Msg.KF_CLASSES_CREATE_INSTANCE_WITH_VAR_HELPURL = '';
/// label -
Blockly.Msg.KF_CLASSES_CREATE_INSTANCE_WITH_VAR_MESSAGE_BEFORE = 'create new';
/// label -
Blockly.Msg.KF_CLASSES_CREATE_INSTANCE_WITH_VAR_MESSAGE_AFTER = 'of';
/// tooltip -
Blockly.Msg.KF_CLASSES_CREATE_INSTANCE_WITH_VAR_TOOLTIP = 'Creates a new instance of a class and assigns a variable to the instance.';

/// url -
Blockly.Msg.KF_ARCADEPHYSICS_GET_NUMERIC_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_ARCADEPHYSICS_GET_NUMERIC_TOOLTIP = 'Returns a value for the selected property.';
/// url -
Blockly.Msg.KF_ARCADEPHYSICS_SET_NUMERIC_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_ARCADEPHYSICS_SET_NUMERIC_TOOLTIP = 'Sets a numeric property selected.';
/// message -
Blockly.Msg.KF_ARCADEPHYSICS_SET_NUMERIC_MESSAGE = 'set';
/// url -
Blockly.Msg.KF_ARCADEPHYSICS_SET_BOOLEAN_HELPURL = '';
/// message -
Blockly.Msg.KF_ARCADEPHYSICS_SET_BOOLEAN_MESSAGE = 'set';
/// tooltip -
Blockly.Msg.KF_ARCADEPHYSICS_SET_BOOLEAN_TOOLTIP = 'Sets a boolean property selected.';
/// url -
Blockly.Msg.KF_ARCADEPHYSICS_GET_BOOLEAN_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_ARCADEPHYSICS_GET_BOOLEAN_TOOLTIP = 'Returns the state of a property selected.';
/// message -
Blockly.Msg.KF_ARCADEPHYSICS_GET_ROTATION_FROM_MESSAGE = 'get rotation based on';
/// helpurl -
Blockly.Msg.KF_ARCADEPHYSICS_GET_ROTATION_FROM_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_ARCADEPHYSICS_GET_ROTATION_FROM_TOOLTIP = 'Returns a rotation for the property based on a selected property.';


/// url -
Blockly.Msg.KF_ARCADEPHYSICS_GET_COLLISIONS_HELPURL = '';
/// message -
Blockly.Msg.KF_ARCADEPHYSICS_GET_COLLISIONS_MESSAGE_BEFORE = 'on';
/// message -
Blockly.Msg.KF_ARCADEPHYSICS_GET_COLLISIONS_MESSAGE_AFTER = 'side';
/// tooltip -
Blockly.Msg.KF_ARCADEPHYSICS_GET_COLLISIONS_TOOLTIP = 'Returns a Boolean indiciating the state of the selected statement for this gameobject.';

/// url -
Blockly.Msg.KF_ARCADEPHYSICS_SET_COLLISIONS_HELPURL = '';
/// message -
Blockly.Msg.KF_ARCADEPHYSICS_SET_COLLISIONS_MESSAGE_BEFORE = 'set';
/// message -
Blockly.Msg.KF_ARCADEPHYSICS_SET_COLLISIONS_MESSAGE_AFTER = 'side collisions to';
/// tooltip -
Blockly.Msg.KF_ARCADEPHYSICS_SET_COLLISIONS_TOOLTIP = 'Sets the sides of this gameobject that can collide with other gameobjects.';

/// url -
Blockly.Msg.KF_ARCADEPHYSICS_SET_GRAVITY_HELPURL = '';
/// message -
Blockly.Msg.KF_ARCADEPHYSICS_SET_GRAVITY_MESSAGE = 'set gravity';
/// tooltip -
Blockly.Msg.KF_ARCADEPHYSICS_SET_GRAVITY_TOOLTIP = 'Sets the global gravity property to a value passed.';
/// url -
Blockly.Msg.KF_ARCADEPHYSICS_GET_GRAVITY_HELPURL = '';
/// message -
Blockly.Msg.KF_ARCADEPHYSICS_GET_GRAVITY_MESSAGE = 'gravity';
/// tooltip -
Blockly.Msg.KF_ARCADEPHYSICS_GET_GRAVITY_TOOLTIP = 'Returns the selected gravity value.';
/// helpurl -
Blockly.Msg.KF_ARCADEPHYSICS_SET_PHYSICS_ENABLED_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_ARCADEPHYSICS_SET_PHYSICS_ENABLED_TOOLTIP = 'Set the state of this objects arcadephysics component.';
/// message -
Blockly.Msg.KF_ARCADEPHYSICS_SET_PHYSICS_ENABLED_MESSAGE = 'set physics enabled';
/// helpurl -
Blockly.Msg.KF_ARCADEPHYSICS_GET_PHYSICS_ENABLED_HELPURL = '';
///message -
Blockly.Msg.KF_ARCADEPHYSICS_GET_PHYSICS_ENABLED_MESSAGE = 'get physics enabled';
/// tooltip -
Blockly.Msg.KF_ARCADEPHYSICS_GET_PHYSICS_ENABLED_TOOLTIP = 'A boolean indicating if physics are enabled or not.';

/// url -
Blockly.Msg.KF_MESSAGING_INSTANCE_HELPURL = '';
/// message -
Blockly.Msg.KF_MESSAGING_INSTANCE_MESSAGE_BEFORE = 'send message';
/// message -
Blockly.Msg.KF_MESSAGING_INSTANCE_MESSAGE_AFTER = 'to';
/// tooltip -
Blockly.Msg.KF_MESSAGING_INSTANCE_TOOLTIP = 'Sends a message to a singular instance you passed.';
/// url -
Blockly.Msg.KF_MESSAGING_CLASS_HELPURL = '';
/// message -
Blockly.Msg.KF_MESSAGING_CLASS_MESSAGE_BEFORE = 'send message';
/// message -
Blockly.Msg.KF_MESSAGING_CLASS_MESSAGE_AFTER = 'to all';
/// tooltip -
Blockly.Msg.KF_MESSAGING_CLASS_TOOLTIP = 'Sends a message to all instances of a class you pass.';
/// url -
Blockly.Msg.KF_MESSAGING_EVERYONE_HELPURL = '';
/// message -
Blockly.Msg.KF_MESSAGING_EVERYONE_MESSAGE = 'send every gameobject a message of';
/// tooltip -
Blockly.Msg.KF_MESSAGING_EVERYONE_TOOLTIP = 'Sends a message to every gameobject.';
/// url -
Blockly.Msg.KF_MESSAGING_LIST_HELPURL = '';
/// message -
Blockly.Msg.KF_MESSAGING_LIST_MESSAGE_BEFORE = 'send message';
/// message -
Blockly.Msg.KF_MESSAGING_LIST_MESSAGE_AFTER = 'to each instance in';
/// tooltip -
Blockly.Msg.KF_MESSAGING_LIST_TOOLTIP = 'Sends a message to every instance in a list.';
/// helpurl
Blockly.Msg.KF_MESSAGING_EVERYONE_VALUE_HELPURL = '';
/// message one -
Blockly.Msg.KF_MESSAGING_EVERYONE_VALUE_MESSAGE_ONE = 'send message to everyone';
/// message two -
Blockly.Msg.KF_MESSAGING_EVERYONE_VALUE_MESSAGE_TWO = 'with a value of';
/// tooltip -
Blockly.Msg.KF_MESSAGING_EVERYONE_VALUE_TOOLTIP = 'Sends a message and value defined to every gameobject.';
/// tooltip -
Blockly.Msg.KF_MESSAGING_INSTANCE_VALUE_TOOLTIP = 'Sends a message and value to an instance.';
/// helpurl -
Blockly.Msg.KF_MESSAGING_INSTANCE_VALUE_HELPURL = '';
/// message one -
Blockly.Msg.KF_MESSAGING_INSTANCE_VALUE_MESSAGE_ONE = 'send message';
/// message two -
Blockly.Msg.KF_MESSAGING_INSTANCE_VALUE_MESSAGE_TWO = 'to';
/// message three -
Blockly.Msg.KF_MESSAGING_INSTANCE_VALUE_MESSAGE_THREE = 'with a value of';

/// url -
Blockly.Msg.KF_ARCADEPHYSICS_PROBE_HELPURL = '';
/// message -
Blockly.Msg.KF_ARCADEPHYSICS_PROBE_MESSAGE = 'collidable object exists at';
/// tooltip -
Blockly.Msg.KF_ARCADEPHYSICS_PROBE_TOOLTIP = 'Returns a boolean indiciating if a colliable object exists at the cooridnates passed. ';
/// tooltip -
Blockly.Msg.KF_ARCADEPHYSICS_PROBE_LAYER_TOOLTIP = 'Returns a boolean indiciating if a colliable object (with the collision shape AND layer as passed) exists at the location passed.';
/// message -
Blockly.Msg.KF_ARCADEPHYSICS_PROBE_LAYER_MESSAGE_ONE = 'collidable object of';
/// message -
Blockly.Msg.KF_ARCADEPHYSICS_PROBE_LAYER_MESSAGE_TWO = 'side exists at';
/// message -
Blockly.Msg.KF_ARCADEPHYSICS_PROBE_LAYER_MESSAGE_THREE = 'and is on the layer';
/// url -
Blockly.Msg.KF_ARCADEPHYSICS_PROBE_LAYER_HELPURL = '';

/// url -
Blockly.Msg.KF_INSTANCE_MOVE_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_INSTANCE_MOVE_TOOLTIP = 'Changes the depth (layer ordering) of an instance passed by the selected dropdown method.';

/// Label -
Blockly.Msg.LOG_MESSAGE  = 'Log';
/// url -
Blockly.Msg.LOG_HELPURL = '';
/// tooltip -
Blockly.Msg.LOG_TOOLTIP = 'Log a value to the console';


/// helpurl -
Blockly.Msg.KF_PRIMITIVES_CREATE_RECTANGLE_HELPURL = '';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_RECTANGLE_MESSAGE_BEFORE = 'create new';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_RECTANGLE_MESSAGE_AFTER = 'with a width/height of';
/// tooltip -
Blockly.Msg.KF_PRIMITIVES_CREATE_RECTANGLE_TOOLTIP = 'Creates a new rectangle with a width and height that you set.';


/// helpurl -
Blockly.Msg.KF_PRIMITIVES_CREATE_CIRCLE_HELPURL = '';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_CIRCLE_MESSAGE_BEFORE = 'create new';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_CIRCLE_MESSAGE_AFTER = 'with a radius of';
/// tooltip -
Blockly.Msg.KF_PRIMITIVES_CREATE_CIRCLE_TOOLTIP = 'Creates a new circle with a radius that you set.';


/// helpurl -
Blockly.Msg.KF_PRIMITIVES_CREATE_LINE_HELPURL = '';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_LINE_MESSAGE_ONE = 'create new';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_LINE_MESSAGE_TWO = 'from origin to';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_LINE_MESSAGE_THREE = 'with a width of';
/// tooltip -
Blockly.Msg.KF_PRIMITIVES_CREATE_LINE_TOOLTIP = 'Creates a new line from the transforms origin to a point in space.';

/// helpurl -
Blockly.Msg.KF_PRIMITIVES_CREATE_STAR_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_PRIMITIVES_CREATE_STAR_TOOLTIP = 'Creates a new star with a specified number of points.';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_STAR_MESSAGE_ONE = 'create new';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_STAR_MESSAGE_TWO = 'with a radius of';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_STAR_MESSAGE_THREE = 'and';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_STAR_MESSAGE_FOUR = 'points';

/// helpurl -
Blockly.Msg.KF_PRIMITIVES_CHANGE_COLOUR_HELPURL = '';
/// message -
Blockly.Msg.KF_PRIMITIVES_CHANGE_COLOUR_MESSAGE_ONE = 'set colour of shape';
/// message -
Blockly.Msg.KF_PRIMITIVES_CHANGE_COLOUR_MESSAGE_TWO = 'to';
/// tooltip -
Blockly.Msg.KF_PRIMITIVES_CHANGE_COLOUR_TOOLTIP = 'Sets the colour a shape will render to a particular value.';

/// helpurl -
Blockly.Msg.KF_PRIMITIVES_GET_COLOUR_HELPURL = '';
/// message -
Blockly.Msg.KF_PRIMITIVES_GET_COLOUR_MESSAGE = 'get colour of shape';
/// tooltip -
Blockly.Msg.KF_PRIMITIVES_GET_COLOUR_TOOLTIP = 'Returns the colour of a shape passed.';

/// helpurl -
Blockly.Msg.KF_PRIMITIVES_CREATE_POLYGON_HELPURL = '';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_POLYGON_MESSAGE_ONE = 'create new';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_POLYGON_MESSAGE_TWO = 'with a radius of';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_POLYGON_MESSAGE_THREE = ' and ';
/// message -
Blockly.Msg.KF_PRIMITIVES_CREATE_POLYGON_MESSAGE_FOUR = ' edges';
/// tooltip -
Blockly.Msg.KF_PRIMITIVES_CREATE_POLYGON_TOOLTIP = 'Creates a new polygon.';

/// helpurl -
Blockly.Msg.KF_TEXT_CREATE_HELPURL = '';
/// message -
Blockly.Msg.KF_TEXT_CREATE_MESSAGE_ONE = 'create new';
/// message -
Blockly.Msg.KF_TEXT_CREATE_MESSAGE_TWO = 'with text';
/// tooltip -
Blockly.Msg.KF_TEXT_CREATE_TOOLTIP = 'Creates a new textfield.';

/// helpurl -
Blockly.Msg.KF_TEXT_NUMERIC_SET_HELPURL = '';
/// message -
Blockly.Msg.KF_TEXT_NUMERIC_SET_MESSAGE_ONE = 'set';
/// message -
Blockly.Msg.KF_TEXT_NUMERIC_SET_MESSAGE_TWO = 'of';
/// message -
Blockly.Msg.KF_TEXT_NUMERIC_SET_MESSAGE_THREE = 'to';
/// tooltip -
Blockly.Msg.KF_TEXT_NUMERIC_SET_TOOLTIP = 'Sets the numeric value of a textfield to the value passed';

/// helpurl -
Blockly.Msg.KF_TEXT_COLOUR_SET_HELPURL = '';
/// message -
Blockly.Msg.KF_TEXT_COLOUR_SET_MESSAGE_ONE = 'set font colour of';
/// message -
Blockly.Msg.KF_TEXT_COLOUR_SET_MESSAGE_TWO = 'to';
/// tooltip -
Blockly.Msg.KF_TEXT_COLOUR_SET_TOOLTIP = 'Sets the font colour of a passed textfield to a colour passed';


/// helpurl -
Blockly.Msg.KF_TEXT_TEXT_SET_HELPURL = '';
/// message -
Blockly.Msg.KF_TEXT_TEXT_SET_MESSAGE_ONE = 'set text of';
/// message -
Blockly.Msg.KF_TEXT_TEXT_SET_MESSAGE_TWO = 'to';
/// tooltip -
Blockly.Msg.KF_TEXT_TEXT_SET_TOOLTIP = 'Sets the text which a textfield should display textfield to a string passed';


/// helpurl -
Blockly.Msg.KF_TEXT_ALIGNMENT_SET_HELPURL = '';
/// message -
Blockly.Msg.KF_TEXT_ALIGNMENT_SET_MESSAGE_ONE = 'set text alignment of';
/// message -
Blockly.Msg.KF_TEXT_ALIGNMENT_SET_MESSAGE_TWO = 'to';
/// tooltip -
Blockly.Msg.KF_TEXT_ALIGNMENT_SET_TOOLTIP = 'Sets the alignment of a textfield to a selected value in the dropdown';

/// helpurl -
Blockly.Msg.KF_TEXT_WEIGHT_SET_HELPURL = '';
/// message -
Blockly.Msg.KF_TEXT_WEIGHT_SET_MESSAGE_ONE = 'set text weight of';
/// message -
Blockly.Msg.KF_TEXT_WEIGHT_SET_MESSAGE_TWO = 'to';
/// tooltip -
Blockly.Msg.KF_TEXT_WEIGHT_SET_TOOLTIP = 'Sets the font weight of a textfield to a selected value in the dropdown';


/// helpurl -
Blockly.Msg.KF_TEXT_FAMILY_SET_HELPURL = '';
/// message -
Blockly.Msg.KF_TEXT_FAMILY_SET_MESSAGE_ONE = 'set font family of';
/// message -
Blockly.Msg.KF_TEXT_FAMILY_SET_MESSAGE_TWO = 'to';
/// tooltip -
Blockly.Msg.KF_TEXT_FAMILY_SET_TOOLTIP = 'Sets the font family that a textfield should use.';

/// helpurl -
Blockly.Msg.KF_TEXT_FONT_PRESETS_HELPURL = '';
/// tooltip -
Blockly.Msg.KF_TEXT_FONT_PRESETS_TOOLTIP = 'Returns the string which identifies the font family selected';

/// helpurl -
Blockly.Msg.KF_TEXT_NUMERIC_GET_HELPURL = '';
/// message -
Blockly.Msg.KF_TEXT_NUMERIC_GET_MESSAGE_ONE = 'get';
/// message -
Blockly.Msg.KF_TEXT_NUMERIC_GET_MESSAGE_TWO = 'of';
/// tooltip -
Blockly.Msg.KF_TEXT_NUMERIC_GET_TOOLTIP = 'Returns the current value of the selected property from a textfield';

/// helpurl -
Blockly.Msg.KF_TEXT_COLOUR_GET_HELPURL = '';
/// message -
Blockly.Msg.KF_TEXT_COLOUR_GET_MESSAGE = 'get font colour of';
/// tooltip -
Blockly.Msg.KF_TEXT_COLOUR_GET_TOOLTIP = 'Returns the font colour of a textfield';

/// helpurl -
Blockly.Msg.KF_TEXT_TEXT_GET_HELPURL = '';
/// message -
Blockly.Msg.KF_TEXT_TEXT_GET_MESSAGE = 'get text of';
/// tooltip -
Blockly.Msg.KF_TEXT_TEXT_GET_TOOLTIP = 'Returns the text of a textfield';

/// helpurl -
Blockly.Msg.KF_COORDINATE_GET_HELPURL = '';
/// message -
Blockly.Msg.KF_COORDINATE_GET_MESSAGE_ONE = 'get';
/// message -
Blockly.Msg.KF_COORDINATE_GET_MESSAGE_TWO = 'of';
/// tooltip -
Blockly.Msg.KF_COORDINATE_GET_TOOLTIP = 'Returns the numeric value for the passed location';

/// helpurl -
Blockly.Msg.KF_COORDINATE_SET_HELPURL = '';
/// message -
Blockly.Msg.KF_COORDINATE_SET_MESSAGE_ONE = 'set';
/// message -
Blockly.Msg.KF_COORDINATE_SET_MESSAGE_TWO = 'of';
/// message -
Blockly.Msg.KF_COORDINATE_SET_MESSAGE_THREE = 'to';
/// tooltip -
Blockly.Msg.KF_COORDINATE_SET_TOOLTIP = 'Sets the selected axis to a defined value for the passed location';

/// helpurl -
Blockly.Msg.KF_COORDINATE_CREATE_HELPURL = '';
/// message -
Blockly.Msg.KF_COORDINATE_CREATE_MESSAGE = 'create new location at';
/// tooltip -
Blockly.Msg.KF_COORDINATE_CREATE_TOOLTIP = 'Creates a new location';

/// helpurl -
Blockly.Msg.KF_COORDINATE_GET_ANGLE_HELPURL = '';
/// message -
Blockly.Msg.KF_COORDINATE_GET_ANGLE_MESSAGE = 'angle to location';
/// tooltip -
Blockly.Msg.KF_COORDINATE_GET_ANGLE_TOOLTIP = 'Get angle from (0, 0) to this location';

/// helpurl -
Blockly.Msg.KF_SET_DEBUG_MODE_URL = '';
/// message -
Blockly.Msg.KF_SET_DEBUG_MODE_MESSAGE = 'set debug mode';
/// tooltip -
Blockly.Msg.KF_SET_DEBUG_MODE_TOOLTIP = 'Sets the debug mode of the game';

/// helpurl -
Blockly.Msg.KF_GET_DEBUG_MODE_URL = '';
/// message -
Blockly.Msg.KF_GET_DEBUG_MODE_MESSAGE = 'get debug mode';
/// tooltip -
Blockly.Msg.KF_GET_DEBUG_MODE_TOOLTIP = 'Returns the boolean indiciating if debug mode is currently on or off';

/// helpurl -
Blockly.Msg.KF_CLASSES_GET_BY_TEXT_HELPURL = '';
/// message -
Blockly.Msg.KF_CLASSES_GET_BY_TEXT_MESSAGE = 'get class of';
/// tooltip -
Blockly.Msg.KF_CLASSES_GET_BY_TEXT_TOOLTIP = 'Returns a class of the text passed.';

/// helpurl -
Blockly.Msg.KF_EVENT_CONSTANTLY_DROPDOWN_HELPURL = '';
/// message -
Blockly.Msg.KF_EVENT_CONSTANTLY_DROPDOWN_MESSAGE = '';
/// tooltip -
Blockly.Msg.KF_EVENT_CONSTANTLY_DROPDOWN_TOOLTIP = 'Executes every frame. The order of execution depends on the choosen dropdown item.';

/// helpurl -
Blockly.Msg.KF_DEVICE_COCOON_URL = '';
/// message -
Blockly.Msg.KF_DEVICE_COCOON_MESSAGE = 'targeting cocoon';
/// tooltip -
Blockly.Msg.KF_DEVICE_COCOON_TOOLTIP = 'Returns a boolean indicating if the game is currently targeting cocoon.';

/// helpurl -
Blockly.Msg.KF_HITBOX_POSITION_GET_HELPURL = '';
/// message -
Blockly.Msg.KF_HITBOX_POSITION_GET_MESSAGE = 'get hitbox';
/// tooltip -
Blockly.Msg.KF_HITBOX_POSITION_GET_TOOLTIP = 'Returns the selected position of the hitbox in world coordinates.';

/// helpurl -
Blockly.Msg.KF_HITBOX_DIMENSIONS_GET_HELPURL = '';
/// message -
Blockly.Msg.KF_HITBOX_DIMENSIONS_GET_MESSAGE = 'get hitbox';
/// tooltip -
Blockly.Msg.KF_HITBOX_DIMENSIONS_GET_TOOLTIP = 'Returns the selected dimensions of the hitbox in world coordinates.';

/// helpurl -
Blockly.Msg.KF_HITBOX_OFFSET_GET_HELPURL = '';
/// message -
Blockly.Msg.KF_HITBOX_OFFSET_GET_MESSAGE = 'get hitbox offset';
/// tooltip -
Blockly.Msg.KF_HITBOX_OFFSET_GET_TOOLTIP = 'Returns the difference between the hitbox position and the instances position.';
