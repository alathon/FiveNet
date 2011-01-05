(function(exports) {
  var InputHandler = {
    keys: []
  };
  
  exports.bindKey = function(keyCode, f) {
    InputHandler.keys[keyCode] = f;  
  };
  
  exports.unbindKey = function(keyCode) {
    InputHandler.keys[keyCode] = null;  
  };
  
  exports.keyDown = function(keyCode) {
    if(keyCode in InputHandler.keys) {
      InputHandler.keys[keyCode].call('keyDown', keyCode);
    }
  };

  exports.keyUp = function(keyCode) {
    if(keyCode in InputHandler.keys) {
      InputHandler.keys[keyCode].call('keyUp', keyCode);
    }
  };

})(typeof exports === 'undefined' ? this['input']={} : exports);