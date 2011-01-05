(function(exports) {

  /****** NODE REQUIRES ******/
  if(!(this.player)) {
    player = require('./playerModel');
  }
  if(!(this._)) {
    _ = require('./lib/underscore/underscore');
  }

  /****** EXPORTED FUNCTION ******/
  exports.Create = function(level, players) {
    return new Game(level, players);
  };

  Game = function(level, players) {
    this.level = level;
    this.players = players;
  };
  
  // Check for duplicates.
  Game.prototype.AddPlayer = function( p ) {
    if(_.indexOf(this.players, p) == -1 ) {
      this.players.push( p );
    }
  };
  
  // Add players, no questions asked.
  Game.prototype.AddPlayers = function( pl ) {
    var b = this;
    pl.forEach(function( p ) {
      b.players.push( player.Create(p.name, p.pos.x, p.pos.y));
    });
  };
  
  Game.prototype.RemPlayer = function( p ) {
    _.without(this.players, p);
  };
  
  Game.prototype.UpdatePlayer = function( idx, a) {
    if(idx < 0 || idx > this.players.length) return;
    this.players[idx].Update.apply(this.players[idx], Array.prototype.slice.call(a));
  };
  
  Game.prototype.HasPlayer = function( p ) {
    return (_.indexOf(this.players, p))
  };
  
  Game.prototype.HasPlayerName = function( pname ) {
    for(var i = 0, j = this.players.length; i < j; i++) {
      if(this.players[i].name === pname) {
        return i;
      }
    }
  };

  Game.prototype.key_moveUp = function() {
    socket.send({type: '', player: 0,
                vars: {pos: {x: this.players[0].pos.x,
                             y: this.players[0].pos.y+1}}});
  };
  
  Game.prototype.key_moveDown = function() {
    socket.send({type: 'updateplayer', player: 0,
                vars: {pos: {x: this.players[0].pos.x,
                             y: this.players[0].pos.y-1}}});
  };
  
  Game.prototype.key_moveLeft = function() {
    socket.send({type: 'updateplayer', player: 0,
                vars: {pos: {x: this.players[0].pos.x-1,
                             y: this.players[0].pos.y}}});
  };
  
  Game.prototype.key_moveRight = function() {
    socket.send({type: 'updateplayer', player: 0,
                vars: {pos: {x: this.players[0].pos.x,
                             y: this.players[0].pos.y+1}}});
  };

})(typeof exports === 'undefined' ? this['game']={}: exports);
