var Piece = require('./Piece');

function Bomb () {
	super('Bomb', -1);
}

Bomb.prototype = Piece;
Bomb.prototype.constructor = Bomb;

module.exports = Bomb;
