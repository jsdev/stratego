import React from 'react';

import User from '../user/User';

import localLobby from './localLobby';

class Lobby extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			lobby: []
		};

		this._lobbySubscription = localLobby.observe('lobby')
			.subscribe((lobby) => {
				this.setState({ lobby: lobby });
			});
	}

	componentWillUnmount () {
		this._lobbySubscription.dispose();
	}

	render () {
		const users = this.state.lobby.map((user) => <User key={ user.id } user={ user }/>);

		return (
			<div>
				<p>Online:</p>
				<ul>{ users }</ul>
			</div>
		);
	}
}
Lobby.displayName = 'Lobby';

export default Lobby;
