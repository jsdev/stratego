import React from 'react';
import gameServer from '../gameServer/gameServer';

export default class UserInfo extends React.Component {
	constructor (props) {
		super(props);
	}

	onClick () {
		gameServer.emit('send-game-invite', this.props.id);
	}

	render () {
		var userInfo = `${this.props.name} - id: ${this.props.id}`;
		if (this.props.id !== gameServer.getCurrentUserId()) {
			userInfo = <a href="#" onClick={this.onClick.bind(this)}>{userInfo}</a>;
		}
		return <li>{userInfo}</li>;
	}
}
