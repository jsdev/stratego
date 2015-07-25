import io from 'socket.io-client';
import Rx from 'rx-lite';

class GameServer {
	constructor () {
		this.mainSocket = io('http://localhost:3000/');

		this.handshakeSource = Rx.Observable.fromEvent(this.mainSocket, 'handshake');
	}
}

export default new GameServer();
