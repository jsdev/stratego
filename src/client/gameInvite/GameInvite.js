import React from 'react';

import localUser from '../user/localUser';

class GameInvite extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			gameInvite: null
		};

		this._gameInviteSubscription = localUser.observe('game-invite')
			.subscribe((gameInvite) => {
				console.log('gameInvite', gameInvite);
				this.setState({ gameInvite: gameInvite });
			});
	}

	onAcceptButtonClick () {
		localUser.send('accept-game-invite', { from: this.state.gameInvite.from });
	}

	onDeclineButtonClick () {
		localUser.send('decline-game-invite', { from: this.state.gameInvite.from });
	}

	render () {
		var notification = null;
		if (this.state.gameInvite && !this.state.gameInvite.accepted && !this.state.gameInvite.declined) {
			notification = (
				<div>
					<p>{ `${this.state.gameInvite.from.name} wants to play a game.` }</p>
					<button onClick={ this.onAcceptButtonClick.bind(this) }>Accept</button>
					<button onClick={ this.onDeclineButtonClick.bind(this) }>Decline</button>
				</div>
			);
		}
		else if (this.state.gameInvite && this.state.gameInvite.accepted) {
			notification = (
				<div>
					<p>{ `${this.state.gameInvite.from.name} agreed to play a game.` }</p>
				</div>
			);
		}
		else if (this.state.gameInvite && this.state.gameInvite.declined) {
			notification = (
				<div>
					<p>{ `${this.state.gameInvite.from.name} declined to play a game.` }</p>
				</div>
			);
		}
		return notification;
	}

	componentWillUnmount () {
		this._gameInviteSubscription.dispose();
	}
}
GameInvite.displayName = 'GameInvite';

export default GameInvite;
