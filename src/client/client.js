import React from 'react';
import gameServer from './gameServer';

export default class Client extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			lobbyList: [],
			message: 'Waiting for the server...'
		};

		this.handshakeSubscription = gameServer.handshakeSource
			.subscribe((handshake) => {
				this.setState({ message: handshake.message });
			});

		this.lobbyListSubscription = gameServer.lobbyListSource
			.subscribe((lobbyList) => {
				this.setState({ lobbyList: lobbyList });
			});
	}

	onNameChange (event) {
		gameServer.sendNameChange(event.target.value);
	}

	render () {
		return (
			<div>
				<h1>Client</h1>
				<p>{this.state.message}</p>
				<p>Your name: <input type="input" placeholder="Anonymous" onInput={this.onNameChange.bind(this)}/></p>
				<p>Online:</p>
				<ul>
				{
					this.state.lobbyList.map((player) => {
						return <li>{player.name} - {player.id}</li>;
					})
				}
				</ul>
			</div>
		);
	}

	componentWillUnmount () {
		this.handshakeSubscription.dispose();
		this.lobbyListSubscription.dispose();
	}
}
