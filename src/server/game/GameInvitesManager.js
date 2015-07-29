function GameInvitesManager (lobby) {
	this._lobby = lobby;
}

GameInvitesManager.prototype.relayGameInviteToUser = function (fromUser, toUserId) {
	var invitedUser = this._lobby.findUserById(toUserId);
	if (invitedUser) {
		invitedUser.emit('game-invite', {
			from: fromUser.getPublicInfo()
		});
	}
};

GameInvitesManager.prototype.startGameBetween = function (fromUser, toUserId) {
	// TODO
};

GameInvitesManager.prototype.relayDeclinedGameInviteToUser = function (fromUser, toUserId) {
	var invitedUser = this._lobby.findUserById(toUserId);
	if (invitedUser) {
		invitedUser.emit('game-invite', {
			from: fromUser.getPublicInfo(),
			declined: true
		});
	}
};

module.exports = GameInvitesManager;
