var Piece = require('./Piece');

function Spy () {
	super('Spy', 1);
}

Spy.prototype = Piece;
Spy.prototype.constructor = Spy;

module.exports = Spy;
