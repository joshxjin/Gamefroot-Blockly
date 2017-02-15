/*
 This function add Gamefroot specific functionality to the default
 Google Blockly.makecolour function in core/blockly.js and contains
 an extra if statement Google Blockly calls to the Blockly.makecolour
 function should be unaffaected.

 This file needs to be added after blockly.js to ensure it overrides it
 so Kiwifroot code can use the functionality. Build.py may need to be editted to
 ensure this gets added after blockly.js is processed
 */

// Store old funciton in old_function variable for later use
var old_function = Blockly.makeColour;

Blockly.makeColour = function() {
    //Already hex
    if( typeof hue === "string" && hue.charAt(0) === '#' ) {
        return hue;
    }
    old_function();
}
