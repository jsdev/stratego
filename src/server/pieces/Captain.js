var Piece = require('./Piece');

function Captain () {
	super('Captain', 6);
}

Captain.prototype = Piece;
Captain.prototype.constructor = Captain;

module.exports = Captain;
