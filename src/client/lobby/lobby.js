import React from 'react';
import gameServer from '../gameServer';

export default class Client extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			lobbyList: []
		};

		this._lobbyListSubscription = gameServer.lobbyListEvents
			.subscribe((lobbyList) => {
				this.setState({ lobbyList: lobbyList });
			});
	}

	onPlayerClick (playerInfo) {
		gameServer.emitSendGameInvite(playerInfo.id);
	}

	render () {
		var lobbyListItems = this.state.lobbyList
				.map((playerInfo) => {
					var item = `${playerInfo.name} - id: ${playerInfo.id}`;
					if (playerInfo.id !== gameServer.getCurrentPlayerId()) {
						item = <a href="#" onClick={this.onPlayerClick.bind(this, playerInfo)}>{item}</a>;
					}
					return <li>{item}</li>;
				});

		return (
			<div>
				<p>Online:</p>
				<ul>{lobbyListItems}</ul>
			</div>
		);
	}

	componentWillUnmount () {
		this._lobbyListSubscription.dispose();
	}
}
