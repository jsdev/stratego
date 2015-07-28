import React from 'react';
import gameServer from './gameServer';
import Lobby from './lobby/lobby';

export default class Client extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			gameInvite: null
		};

		this._gameInviteSubscription = gameServer.gameInviteEvents
			.subscribe((gameInvite) => {
				this.setState({ gameInvite: gameInvite });
			});
	}

	onNameChange (event) {
		gameServer.emitSetName(event.target.value);
	}

	render () {
		return (
			<div>
				<h1>Client</h1>
				{
					this.state.gameInvite ?
						<p>{ this.state.gameInvite.message + ', from ' + this.state.gameInvite.from.name }</p> :
						null
				}
				<p>Your name: <input type="input" placeholder="Anonymous" onInput={this.onNameChange.bind(this)}/></p>
				<Lobby/>
			</div>
		);
	}

	componentWillUnmount () {
		this._handshakeSubscription.dispose();
		this._gameInviteSubscription.dispose();
	}
}
