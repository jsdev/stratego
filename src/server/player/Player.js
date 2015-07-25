function Player (lobby, socket) {
	this._lobby = lobby;
	this._socket = socket;
	this._name = 'Anonymous';

	this._socket.on('disconnect', function () {
		this._lobby.broadcastDisconnect(this);
	}.bind(this));

	this._socket.on('set-name', function (name) {
		this._name = name;

		this._lobby.broadcastNameChange(this);
	}.bind(this));
}

Player.prototype.acceptHandshake = function (data) {
	this._socket.emit('handshake', data);
};

Player.prototype.sendLobbyList = function () {
	this._socket.emit('lobby-list', this._lobby.players
		.map(function (player) {
			return {
				name: player._name,
				id: player.getId()
			};
		}));
};

Player.prototype.getId = function () {
	return this._socket.id;
};

module.exports = Player;
