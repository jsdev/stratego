import React from 'react';
import gameServer from '../gameServer/gameServer';
import UserInfo from './UserInfo';

export default class Lobby extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			lobby: []
		};

		this._lobbySubscription = gameServer.getObservableFor('lobby')
			.subscribe((lobby) => {
				this.setState({ lobby: lobby });
			});
	}

	render () {
		var userInfoListItems = this.state.lobby
				.map((userInfo) => {
					return <UserInfo id={userInfo.id} name={userInfo.name}/>;
				});
		return (
			<div>
				<p>Online:</p>
				<ul>{userInfoListItems}</ul>
			</div>
		);
	}

	componentWillUnmount () {
		this._lobbySubscription.dispose();
	}
}
