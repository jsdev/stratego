import React from 'react';

import localUser from '../user/localUser';

const INITIAL_STATE = {
		inviter: null,
		inviterCancelled: false,
		invitee: null,
		inviteeAccepted: false,
		inviteeDeclined: false
	};

class GameInvite extends React.Component {
	constructor (props) {
		super(props);

		this.state = INITIAL_STATE;

		this._gameInviteSubscription = localUser.observe('receive-game-invite')
			.subscribe((gameInvite) => {
				this.setState(gameInvite);
			});
	}

	componentWillUnmount () {
		this._gameInviteSubscription.dispose();
	}

	onConfirmCancellationButtonClick () {
		this.setState(INITIAL_STATE);
	}

	onAcceptButtonClick () {
		localUser.send('accept-game-invite', this.state);
	}

	onDeclineButtonClick () {
		localUser.send('decline-game-invite', this.state);
	}

	onCancelButtonClick () {
		localUser.send('cancel-game-invite', this.state);
	}

	render () {
		const localUserIsTheInvitee = this.state.invitee && this.state.invitee.id === localUser.getId(),
			localUserIsTheInviter = this.state.inviter && this.state.inviter.id === localUser.getId();

		if (localUserIsTheInvitee) {
			if (this.state.inviterCancelled) {
				return (
					<div>
						<p>{ `${this.state.inviter.name} cancelled his invite to play a game.` }</p>
						<button onClick={ this.onConfirmCancellationButtonClick.bind(this) }>Ok</button>
					</div>
				);
			}
			if (!this.state.inviteeAccepted && !this.state.inviteeDeclined) {
				return (
					<div>
						<p>{ `${this.state.inviter.name} wants to play a game.` }</p>
						<button onClick={ this.onAcceptButtonClick.bind(this) }>Accept</button>
						<button onClick={ this.onDeclineButtonClick.bind(this) }>Decline</button>
					</div>
				);
			}
			if (this.state.inviteeAccepted) {
				return (
					<div>
						<p>{ `You agreed to play a game with ${this.state.invitee.name}.` }</p>
					</div>
				);
			}
			if (this.state.inviteeDeclined) {
				return (
					<div>
						<p>{ `You declined to play a game with ${this.state.invitee.name}.` }</p>
					</div>
				);
			}
		}

		if (localUserIsTheInviter) {
			if (this.state.inviterCancelled) {
				return (
					<div>
						<p>{ `You cancelled your invite to play a game with ${this.state.invitee.name}.` }</p>
						<button onClick={ this.onConfirmCancellationButtonClick.bind(this) }>Ok</button>
					</div>
				);
			}
			if (!this.state.inviteeAccepted && !this.state.inviteeDeclined) {
				return (
					<div>
						<p>{ `${this.state.inviter.name} is deciding to play a game with you.` }</p>
						<button onClick={ this.onCancelButtonClick.bind(this) }>Cancel</button>
					</div>
				);
			}
			if ( this.state.inviteeAccepted) {
				return (
					<div>
						<p>{ `${this.state.invitee.name} agreed to play a game.` }</p>
					</div>
				);
			}
			if (this.state.inviteeDeclined) {
				return (
					<div>
						<p>{ `${this.state.invitee.name} declined to play a game.` }</p>
					</div>
				);
			}
		}

		return null;
	}
}
GameInvite.displayName = 'GameInvite';

export default GameInvite;
