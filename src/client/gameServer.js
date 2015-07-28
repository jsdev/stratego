import io from 'socket.io-client';
import Rx from 'rx-lite';

class GameServer {
	constructor () {
		this._mainSocket = io('http://localhost:3000/');

		this.handshakeEvents = Rx.Observable.fromEvent(this._mainSocket, 'handshake');
		this.lobbyListEvents = Rx.Observable.fromEvent(this._mainSocket, 'lobby-list');
		this.gameInviteEvents = Rx.Observable.fromEvent(this._mainSocket, 'game-invite');
	}

	emitSetName (changedName) {
		this._mainSocket.emit('set-name', changedName);
	}

	emitSendGameInvite (playerId) {
		this._mainSocket.emit('send-game-invite', playerId);
	}

	getCurrentPlayerId () {
		return this._mainSocket.id;
	}
}

export default new GameServer();
