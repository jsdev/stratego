var Board = require('../board/Board'),
	SetOfPieces = require('../pieces/SetOfPieces');

function Game (redPlayer, bluePlayer) {
	this.redPlayer = redPlayer;
	this.bluePlayer = bluePlayer;

	this.redPieces = new SetOfPieces();
	this.bluePieces = new SetOfPieces();

	this.board = new Board();
}

Game.prototype.start = function () {

};

module.exports = Game;
