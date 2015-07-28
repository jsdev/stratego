import io from 'socket.io-client';
import Rx from 'rx-lite';

class GameServer {
	constructor () {
		this._mainSocket = io('http://localhost:3000/');
		this._observables = {};
	}

	emit (message, data) {
		this._mainSocket.emit(message, data);
	}

	getObservableFor (message) {
		if (this._observables[message]) {
			return this._observables[message];
		}

		this._observables[message] = Rx.Observable.fromEvent(this._mainSocket, message);
		return this._observables[message];
	}

	getCurrentUserId () {
		return this._mainSocket.id;
	}
}

export default new GameServer();
