import React from 'react';
import gameServer from './gameServer/gameServer';
import GameInviteNotification from './gameInviteNotification/GameInviteNotification';
import Lobby from './lobby/Lobby';
import NameChanger from './nameChanger/NameChanger';

export default class Client extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div>
				<h1>Client</h1>
				<GameInviteNotification/>
				<NameChanger/>
				<Lobby/>
			</div>
		);
	}
}
