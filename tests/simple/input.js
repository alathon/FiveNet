(function(exports) {
  var InputHandler = function() {
    this.keys = [];
  };
  
  exports.setKey = function(keyCode, f) {
    InputHandler.keys[keyCode] = f;  
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