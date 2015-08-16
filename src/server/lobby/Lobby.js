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
				connection.changeNameSubscription.dispose();
				connection.sendGameInviteSubscription.dispose();
				connection.acceptGameInviteSubscription.dispose();
				connection.declineGameInviteSubscription.dispose();

				delete this._connectionBySocketId[socket.id];

				this._emitLobbyUpdate();
			}.bind(this));

		connection.changeNameSubscription = connection.user.observe('change-name')
			.subscribe(function (name) {
				connection.user.name = name;

				this._emitLobbyUpdate();
			}.bind(this));

		connection.sendGameInviteSubscription = connection.user.observe('send-game-invite')
			.subscribe(function (gameInvite) {
				var inviteeConnection = this._connectionBySocketId[gameInvite.invitee.id],
					updatedGameInvite = {
						inviter: connection.user.serialize(),
						inviterCancelled: false,
						invitee: inviteeConnection.user.serialize(),
						inviteeAccepted: false,
						inviteeDeclined: false
					};
				inviteeConnection.user.send('receive-game-invite', updatedGameInvite);
				connection.user.send('receive-game-invite', updatedGameInvite);
			}.bind(this));

		connection.acceptGameInviteSubscription = connection.user.observe('accept-game-invite')
			.subscribe(function (gameInvite) {
				var inviterConnection = this._connectionBySocketId[gameInvite.inviter.id],
					updatedGameInvite = {
						inviter: inviterConnection.user.serialize(),
						inviterCancelled: false,
						invitee: connection.user.serialize(),
						inviteeAccepted: true,
						inviteeDeclined: false
					};
				inviterConnection.user.send('receive-game-invite', updatedGameInvite);
				connection.user.send('receive-game-invite', updatedGameInvite);
			}.bind(this));

		connection.declineGameInviteSubscription = connection.user.observe('decline-game-invite')
			.subscribe(function (gameInvite) {
				var inviterConnection = this._connectionBySocketId[gameInvite.inviter.id],
					updatedGameInvite = {
						inviter: inviterConnection.user.serialize(),
						inviterCancelled: false,
						invitee: connection.user.serialize(),
						inviteeAccepted: false,
						inviteeDeclined: true
					};
				inviterConnection.user.send('receive-game-invite', updatedGameInvite);
				connection.user.send('receive-game-invite', updatedGameInvite);
			}.bind(this));

		connection.cancelGameInviteSubscription = connection.user.observe('cancel-game-invite')
			.subscribe(function (gameInvite) {
				var inviteeConnection = this._connectionBySocketId[gameInvite.invitee.id],
					updatedGameInvite = {
						inviter: connection.user.serialize(),
						inviterCancelled: true,
						invitee: inviteeConnection.user.serialize(),
						inviteeAccepted: false,
						inviteeDeclined: false
					};
				inviteeConnection.user.send('receive-game-invite', updatedGameInvite);
				connection.user.send('receive-game-invite', updatedGameInvite);
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
