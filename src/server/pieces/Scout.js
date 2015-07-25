var Piece = require('./Piece');

function Scout () {
	super('Scout', 2);
}

Scout.prototype = Piece;
Scout.prototype.constructor = Scout;

module.exports = Scout;
