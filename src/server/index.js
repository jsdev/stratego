// Create a new socket.io Server at http://localhost:3000
var io = require('socket.io')(3000);

var Lobby = require('./lobby/Lobby'),
	lobby = new Lobby(io);
