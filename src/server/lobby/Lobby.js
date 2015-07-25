var Player = require('../player/Player');

function Lobby (io) {
	this.io = io;

	this.players = [];

	this.io.on('connection', function (socket) {
		var player = new Player(this, socket);
		this.players.push(player);

		player.acceptHandshake({
			message: 'Welcome to the Server! #id: ' + player.getId()
		});

		player.sendLobbyList();
	}.bind(this));
}

Lobby.prototype.broadcastDisconnect = function (disconnectingPlayer) {
	var playerIndex = this.players.indexOf(disconnectingPlayer);
	this.players.splice(playerIndex, 1);

	this.players.forEach(function (player) {
		player.sendLobbyList();
	});
};

Lobby.prototype.broadcastNameChange = function () {
	this.players.forEach(function (player) {
		player.sendLobbyList();
	});
};

module.exports = Lobby;
