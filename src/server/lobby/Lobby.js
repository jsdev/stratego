var GameInvitesManager = require('../game/GameInvitesManager'),
	GamesManager = require('../game/GamesManager'),
	User = require('../user/User');

function Lobby (io) {
	this._io = io;

	this._users = [];

	this._gameInvitesManager = new GameInvitesManager(this);
	this._gamesManager = new GamesManager(this);

	this._io.on('connection', function (socket) {
		var user = new User(this, this._gameInvitesManager, this._gamesManager, socket);
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

Lobby.prototype.onDisconnect = function (disconnectingUser) {
	this._users.splice(this._users.indexOf(disconnectingUser), 1);

	this._emitLobbyListUpdate();
};

Lobby.prototype.onNameChange = function () {
	this._emitLobbyListUpdate();
};

Lobby.prototype.findUserById = function (userId) {
	var targetUser = null;
	this._users.forEach(function (user) {
		if (user.getId() === userId) {
			targetUser = user;
			return;
		}
	});
	return targetUser;
};

module.exports = Lobby;
