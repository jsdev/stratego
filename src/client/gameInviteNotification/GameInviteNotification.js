import React from 'react';
import gameServer from '../gameServer/gameServer';

export default class GameInviteNotification extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			gameInvite: null
		};

		this._gameInviteSubscription = gameServer.getObservableFor('game-invite')
			.subscribe((gameInvite) => {
				this.setState({ gameInvite: gameInvite });
			});
	}

	render () {
		var notification = null;
		if (this.state.gameInvite) {
			notification = <p>
				{this.state.gameInvite.message + ', from ' + this.state.gameInvite.from.name}
			</p>;
		}
		return notification;
	}

	componentWillUnmount () {
		this._gameInviteSubscription.dispose();
	}
}
