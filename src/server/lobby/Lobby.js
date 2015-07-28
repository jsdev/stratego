var Player = require('../player/Player');

function Lobby (io) {
	this._io = io;

	this._players = [];

	this._io.on('connection', function (socket) {
		var player = new Player(this, socket);
		this._players.push(player);

		this._emitLobbyListUpdate();
	}.bind(this));
}

Lobby.prototype._emitLobbyListUpdate = function () {
	this._io.emit('lobby-list', this._players
		.map(function (player) {
			return player.getPublicInfo();
		}));
};

Lobby.prototype.broadcastDisconnect = function (disconnectingPlayer) {
	this._players.splice(this._players.indexOf(disconnectingPlayer), 1);

	this._emitLobbyListUpdate();
};

Lobby.prototype.broadcastNameChange = function () {
	this._emitLobbyListUpdate();
};

Lobby.prototype.relayGameInviteToPlayer = function (fromPlayer, toPlayerId) {
	var invitedPlayer = null;
	this._players.forEach(function (player) {
		if (player.getId() === toPlayerId) {
			invitedPlayer = player;
		}
	});

	if (invitedPlayer) {
		invitedPlayer.displayGameInvite(fromPlayer.getPublicInfo());
	}
};

module.exports = Lobby;
