var User = require('../user/User');

function Lobby (io) {
	this._io = io;

	this._connectionBySocketId = {};

	this._io.on('connection', function (socket) {
		this._connectionBySocketId[socket.id] = {
			user: new User(socket)
		};

		this.emitLobbyUpdate();

		var connection = this._connectionBySocketId[socket.id];
		connection.disconnectSubscription = connection.user.getObservableFor('disconnect').subscribe(function () {
			connection.disconnectSubscription.dispose();
			connection.nameSubscription.dispose();

			delete this._connectionBySocketId[socket.id];

			this.emitLobbyUpdate();
		}.bind(this));

		connection.nameSubscription = connection.user.getObservableFor('name').subscribe(function (name) {
			connection.user.name = name;

			this.emitLobbyUpdate();
		}.bind(this));
	}.bind(this));
}

Lobby.prototype.emitLobbyUpdate = function () {
	var serializedUsers = Object.keys(this._connectionBySocketId)
			.map(function (socketId) {
				return this._connectionBySocketId[socketId].user.serialize();
			}.bind(this));

	this._io.emit('lobby', serializedUsers);
};

module.exports = Lobby;
