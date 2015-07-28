function User (lobby, socket) {
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

	this._socket.on('send-game-invite', function (userId) {
		this._lobby.relayGameInviteToUser(this, userId);
	}.bind(this));
}

User.prototype.displayGameInvite = function (otherUserInfo) {
	this._socket.emit('game-invite', {
		from: otherUserInfo,
		message: 'This is a game invite'
	});
};

User.prototype.getId = function () {
	return this._socket.id;
};

User.prototype.getPublicInfo = function () {
	return {
		id: this.getId(),
		name: this._name
	};
};

module.exports = User;
