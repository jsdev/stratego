import React from 'react';
import gameServer from './gameServer';

export default class Client extends React.Component {
	constructor (props) {
		super(props);

		this.state = { message: 'Delaying the message from the server...' };

		this.handshakeSubscription = gameServer.handshakeSource
			.delay(1500)
			.subscribe((handshakeData) => {
				this.setState({ message: handshakeData.message });
			});
	}

	componentWillUnmount () {
		this.handshakeSubscription.dispose();
	}

	render () {
		return (
			<div>
				<h1>Client</h1>
				<p>{this.state.message}</p>
			</div>
		);
	}
}
