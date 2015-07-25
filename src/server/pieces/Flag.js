var Piece = require('./Piece');

function Flag () {
	super('Flag', -1);
}

Flag.prototype = Piece;
Flag.prototype.constructor = Flag;

module.exports = Flag;
