Blockly.JavaScript['text_prompt_string'] = function(block) {
    var msg = block.getField('TEXT');
    var code = 'window.prompt(' + msg + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['text_prompt_number'] = function(block) {
    var msg = block.getField('TEXT');
    var code = 'window.prompt(' + msg + ')';
        code = 'parseFloat(' + code + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
