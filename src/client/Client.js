import React from 'react';

import Lobby from './lobby/Lobby';
import NameChanger from './nameChanger/NameChanger';

class Client extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div>
				<h1>Client</h1>
				<NameChanger/>
				<Lobby/>
			</div>
		);
	}
}
Client.displayName = 'Client';

export default Client;
