function User (lobby, gameInvitesManager, gamesManager, socket) {
	this._socket = socket;
	this._name = 'Anonymous';

	this._socket.on('disconnect', function () {
		lobby.onDisconnect(this);
	}.bind(this));

	this._socket.on('set-name', function (name) {
		this._name = name;

		lobby.onNameChange(this);
	}.bind(this));

	this._socket.on('send-game-invite', function (userId) {
		gameInvitesManager.relayGameInviteToUser(this, userId);
	}.bind(this));

	this._socket.on('accept-game-invite', function (userId) {
		gamesManager.startGameBetween(this, userId);
	}.bind(this));

	this._socket.on('decline-game-invite', function (userId) {
		gameInvitesManager.relayDeclinedGameInviteToUser(this, userId);
	}.bind(this));
}

User.prototype.emit = function (message, data) {
	this._socket.emit(message, data);
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
