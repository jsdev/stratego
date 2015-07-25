var Piece = require('./Piece');

function Sergeant () {
	super('Sergeant', 4);
}

Sergeant.prototype = Piece;
Sergeant.prototype.constructor = Sergeant;

module.exports = Sergeant;
