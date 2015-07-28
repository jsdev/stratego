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

	this._socket.on('send-game-invite', function (playerId) {
		this._lobby.relayGameInviteToPlayer(this, playerId);
	}.bind(this));
}

Player.prototype.displayGameInvite = function (otherPlayerInfo) {
	this._socket.emit('game-invite', {
		from: otherPlayerInfo,
		message: 'This is a game invite'
	});
};

Player.prototype.getId = function () {
	return this._socket.id;
};

Player.prototype.getPublicInfo = function () {
	return {
		id: this.getId(),
		name: this._name
	};
};

module.exports = Player;
