import React from 'react';

import localUser from '../user/localUser';

class NameChanger extends React.Component {
	constructor (props) {
		super(props);
	}

	onInput (event) {
		localUser.send('change-name', event.target.value);
	}

	render () {
		return (
			<p>
				Your name: <input type="input" placeholder="Anonymous" onInput={ this.onInput.bind(this) }/>
			</p>
		);
	}
}
NameChanger.displayName = 'NameChanger';

export default NameChanger;
