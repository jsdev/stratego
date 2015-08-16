var User = require('../user/User');

function Lobby (io) {
	this._io = io;

	this._connectionBySocketId = {};

	this._io.on('connection', function (socket) {
		this._connectionBySocketId[socket.id] = {
			user: new User(socket)
		};

		this._emitLobbyUpdate();

		var connection = this._connectionBySocketId[socket.id];
		connection.disconnectSubscription = connection.user.observe('disconnect')
			.subscribe(function () {
				connection.disconnectSubscription.dispose();
				connection.nameSubscription.dispose();
				connection.gameInviteSubscription.dispose();
				connection.acceptGameInviteSubscription.dispose();
				connection.declineGameInviteSubscription.dispose();

				delete this._connectionBySocketId[socket.id];

				this._emitLobbyUpdate();
			}.bind(this));

		connection.nameSubscription = connection.user.observe('name')
			.subscribe(function (name) {
				connection.user.name = name;

				this._emitLobbyUpdate();
			}.bind(this));

		connection.gameInviteSubscription = connection.user.observe('game-invite')
			.subscribe(function (gameInvite) {
				var toConnection = this._connectionBySocketId[gameInvite.to.id];
				toConnection.user.send('game-invite', {
					from: connection.user.serialize(),
					accepted: false,
					declined: false
				});
			}.bind(this));

		connection.acceptGameInviteSubscription = connection.user.observe('accept-game-invite')
			.subscribe(function (gameInvite) {
				var fromConnection = this._connectionBySocketId[gameInvite.from.id];
				fromConnection.user.send('game-invite', {
					from: connection.user.serialize(),
					accepted: true,
					declined: false
				});
			}.bind(this));

		connection.declineGameInviteSubscription = connection.user.observe('decline-game-invite')
			.subscribe(function (gameInvite) {
				var fromConnection = this._connectionBySocketId[gameInvite.from.id];
				fromConnection.user.send('game-invite', {
					from: connection.user.serialize(),
					accepted: false,
					declined: true
				});
			}.bind(this));
	}.bind(this));
}

Lobby.prototype._emitLobbyUpdate = function () {
	var serializedUsers = Object.keys(this._connectionBySocketId)
			.map(function (socketId) {
				return this._connectionBySocketId[socketId].user.serialize();
			}.bind(this));

	this._io.emit('lobby', serializedUsers);
};

module.exports = Lobby;
