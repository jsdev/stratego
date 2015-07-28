import React from 'react';
import gameServer from '../gameServer/gameServer';

export default class NameChanger extends React.Component {
	constructor (props) {
		super(props);
	}

	onInput (event) {
		gameServer.emit('set-name', event.target.value);
	}

	render () {
		return <p>
			Your name: <input type="input" placeholder="Anonymous" onInput={this.onInput.bind(this)}/>
		</p>;
	}
}
