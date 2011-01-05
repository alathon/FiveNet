/**
 * Important note: this application is not suitable for benchmarks!
 */

var http = require('http')
  , url = require('url')
  , path = require('path')
  , fs = require('fs')
  , io = require('../../lib/socket.io/')
  , _  = require('./lib/underscore/underscore')
  , sys = require(process.binding('natives').util ? 'util' : 'sys')
  , playerModel = require('./playerModel')
  , gameModel = require('./gameModel');

var server = http.createServer(function(req, res){
  // your normal server code
  var uri = url.parse(req.url).pathname;
  var filename = path.join(process.cwd(), uri);
  sys.puts(filename);
  path.exists(filename, function(exists) {
    if(!exists) {
      sys.puts('404');
      send404(res);
      return;
    }

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        sys.puts('500');
        res.writeHeader(500, {'Content-Type':
          filename.match('.js'+'$') ? 'text/javascript' : 'text/plain'});
        res.write(err + '\n');
        res.end();
        return;
      }
      
      sys.puts('200');
      res.writeHeader(200);
      res.write(file, "binary");
      res.end();
    });
  });

}),

send404 = function(res){
  res.writeHead(404);
  res.write('404');
  res.end();
};

server.listen(8080);

var io = io.listen(server);
var game = gameModel.Create('somelevel',
                              [ playerModel.Create('Edd', 5, 10),
                                playerModel.Create('John', 10, 15)]);

game.socket = io;

io.on('connection', function(client){
  client.send({type: 'wholist', players: game.players});

  client.on('message', function( data ) {
    switch(data.type) {
      case 'updateplayer':
        game.UpdatePlayer(data.player, data.vars);
        break;
      
      default:
        break;
    }
  });
});