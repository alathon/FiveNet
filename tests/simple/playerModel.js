(function(exports) {

  
  Player = function(name, xval, yval) {
    this.pos = {x: xval, y: yval};
    this.name = name;
  };

  Player.prototype.Update = function(name, pos, junk) {
    this.name = name;
    this.pos = pos;
  };
  
  exports.Create = function(name, xval, yval) {
    return new Player(name, xval, yval);
  };
  
})(typeof exports === 'undefined' ? this['player']={} : exports);


