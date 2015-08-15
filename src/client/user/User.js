import React from 'react';

import localUser from '../user/localUser';

class User extends React.Component {
	constructor (props) {
		super(props);
	}

	onClick () {
		console.log('TODO send game invite');
	}

	render () {
		var userInfo = `${this.props.user.name} - id: ${this.props.user.id}`;
		if (this.props.user.id !== localUser.getId()) {
			userInfo = <a href="#" onClick={ this.onClick.bind(this) }>{ userInfo }</a>;
		}
		return <li>{ userInfo }</li>;
	}
}
User.propTypes = {
	user: React.PropTypes.object.isRequired
};
User.displayName = 'User';

export default User;
