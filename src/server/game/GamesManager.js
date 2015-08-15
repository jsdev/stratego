function GamesManager (lobby) {
	this._lobby = lobby;
}

GamesManager.prototype.startGameBetween = function (fromUser, toUserId) {
	var invitedUser = this._lobby.findUserById(toUserId);
	if (invitedUser) {
		invitedUser.emit('game-start', {
			from: fromUser.getPublicInfo(),
			declined: true
		});
	}
};

module.exports = GamesManager;
