import React from 'react';
import localUser from '../user/localUser';

export default class GameInviteNotification extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			gameInvite: null
		};

		this._gameInviteSubscription = localUser.getObservableFor('game-invite')
			.subscribe((gameInvite) => {
				this.setState({ gameInvite: gameInvite });
			});
	}

	onAcceptButtonClick () {
		localUser.emit('accept-game-invite', this.state.gameInvite.from.id);
	}

	onDeclineButtonClick () {
		localUser.emit('decline-game-invite', this.state.gameInvite.from.id);
	}

	render () {
		var notification = null;
		if (this.state.gameInvite && !this.state.gameInvite.declined) {
			notification = (
				<div>
					<p>{`${this.state.gameInvite.from.name} wants to play a game.`}</p>
					<button onClick={this.onAcceptButtonClick.bind(this)}>Accept (TODO)</button>
					<button onClick={this.onDeclineButtonClick.bind(this)}>Decline</button>
				</div>
			);
		}
		if (this.state.gameInvite && this.state.gameInvite.declined) {
			notification = (
				<div>
					<p>{`${this.state.gameInvite.from.name} declined to play a game.`}</p>
				</div>
			);
		}
		return notification;
	}

	componentWillUnmount () {
		this._gameInviteSubscription.dispose();
	}
}
