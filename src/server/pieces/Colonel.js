var Piece = require('./Piece');

function Colonel () {
	super('Colonel', 8);
}

Colonel.prototype = Piece;
Colonel.prototype.constructor = Colonel;

module.exports = Colonel;
