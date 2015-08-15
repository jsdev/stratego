var Rx = require('rx-lite');

function User (socket) {
	this._socket = socket;
	this._observables = {};

	this.id = this._socket.id;
	this.name = 'Anonymous';
}

User.prototype.emit = function (message, data) {
	this._socket.emit(message, data);
};

User.prototype.getObservableFor = function (message) {
	if (this._observables[message]) {
		return this._observables[message];
	}

	this._observables[message] = Rx.Observable.fromEvent(this._socket, message);
	return this._observables[message];
};

User.prototype.serialize = function () {
	return {
		id: this.id,
		name: this.name
	};
};

module.exports = User;
