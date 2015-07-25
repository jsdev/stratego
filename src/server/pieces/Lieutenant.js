var Piece = require('./Piece');

function Lieutenant () {
	super('Lieutenant', 5);
}

Lieutenant.prototype = Piece;
Lieutenant.prototype.constructor = Lieutenant;

module.exports = Lieutenant;
