var User = require('../user/User');

function Lobby (io) {
	this._io = io;

	this._users = [];

	this._io.on('connection', function (socket) {
		var user = new User(this, socket);
		this._users.push(user);

		this._emitLobbyListUpdate();
	}.bind(this));
}

Lobby.prototype._emitLobbyListUpdate = function () {
	this._io.emit('lobby', this._users
		.map(function (user) {
			return user.getPublicInfo();
		}));
};

Lobby.prototype.broadcastDisconnect = function (disconnectingUser) {
	this._users.splice(this._users.indexOf(disconnectingUser), 1);

	this._emitLobbyListUpdate();
};

Lobby.prototype.broadcastNameChange = function () {
	this._emitLobbyListUpdate();
};

Lobby.prototype.relayGameInviteToUser = function (fromUser, toUserId) {
	var invitedUser = null;
	this._users.forEach(function (user) {
		if (user.getId() === toUserId) {
			invitedUser = user;
		}
	});

	if (invitedUser) {
		invitedUser.displayGameInvite(fromUser.getPublicInfo());
	}
};

module.exports = Lobby;
