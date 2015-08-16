import Rx from 'rx-lite';

import socket from '../socket/socket';

class Lobby {
	constructor () {
		this._observables = {};
	}

	send (message, data) {
		socket.emit(message, data);
	}

	observe (message) {
		if (this._observables[message]) {
			return this._observables[message];
		}

		this._observables[message] = Rx.Observable.fromEvent(socket, message);
		return this._observables[message];
	}
}

export default new Lobby();
