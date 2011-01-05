$(document).bind('keydown', function(event) {
    input.keyDown(event.keyCode);
});

$(document).bind('keyup', function(event) {
    input.keyUp(event.keyCode); 
});

var gameInstance = game.Create('somelevel',[]);
gameInstance.clientPlayer = player.Create('Our Hero', 5, 7);
gameInstance.AddPlayer(gameInstance.clientPlayer);

socket = new io.Socket('localhost', {port: 8080});
socket.connect();
socket.on('connect', function(){
    console.log('Connected to localhost:8080');
    gameInstance.socket = socket;
});

socket.on('message', function(data){
    if('type' in data) {
      switch(data.type) {
        case 'wholist':
            gameInstance.AddPlayers(data.players);
            console.log(gameInstance.players);
          break;

        case 'updateplayer':
            gameInstance.UpdatePlayer(data.player.name, data.player);
        default:
          break;
      }
    }
});