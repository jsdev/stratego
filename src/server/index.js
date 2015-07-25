var SOCKET_IO_SERVER_PORT = 3000,
	io = require('socket.io')(SOCKET_IO_SERVER_PORT);

function sendHandshake (socket) {
	socket.emit('handshake', {
		message: 'Welcome to the Server! #id: ' + socket.id
	});
}

io.on('connection', function (socket) {
	sendHandshake(socket);
});
