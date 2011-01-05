// Not used yet.
// Simple map
var Map = function(tsize, data) {
  this.tilesize = tsize;
  this.width = data[0].length;
  this.height = data.length;
  this.data = data;
};

Map.prototype.getTile = function(x, y) {
  var tx = ( x / this.tilesize ).floor();
  var ty = ( y / this.tilesize ).floor();
  if ( tx >= 0 && tx < this.width &&
        ty >= 0 && ty < this.height ) {
    return this.data[ty][tx];
  } else {
    return 0;
  }
};

Map.prototype.setTile = function(x, y, tile) {
  var tx = ( x / this.tilesize ).floor();
  var ty = ( y / this.tilesize ).floor();
  if ( tx >= 0 && tx < this.width &&
        ty >= 0 && ty < this.height ) {
    this.data[ty][tx] = tile;
  }
}