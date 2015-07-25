import io from 'socket.io-client';
import Rx from 'rx-lite';

class GameServer {
	constructor () {
		this.mainSocket = io('http://localhost:3000/');

		this.handshakeSource = Rx.Observable.fromEvent(this.mainSocket, 'handshake');
		this.lobbyListSource = Rx.Observable.fromEvent(this.mainSocket, 'lobby-list');
	}

	sendNameChange (changedName) {
		this.mainSocket.emit('set-name', changedName);
	}
}

export default new GameServer();
