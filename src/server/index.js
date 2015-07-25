var SOCKET_IO_SERVER_PORT = 3000;

var io = require('socket.io')(SOCKET_IO_SERVER_PORT);

var Lobby = require('./lobby/Lobby');

var lobby = new Lobby(io);


