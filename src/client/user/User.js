import React from 'react';

import localUser from '../user/localUser';

class User extends React.Component {
	constructor (props) {
		super(props);
	}

	sendGameInvite () {
		localUser.send('send-game-invite', { invitee: this.props.user });
	}

	render () {
		return (
			<li>
				<span>{ `name: ${this.props.user.name} - id: ${this.props.user.id}` }</span>
				{ this.props.user.id !== localUser.getId() &&
					<a href="#" onClick={ this.sendGameInvite.bind(this) }>(invite to game)</a> }
			</li>
		);
	}
}
User.propTypes = {
	user: React.PropTypes.object.isRequired
};
User.displayName = 'User';

export default User;
