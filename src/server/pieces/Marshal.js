var Piece = require('./Piece');

function Marshal () {
	super('Marshal', 10);
}

Marshal.prototype = Piece.prototype;
Marshal.prototype.constructor = Marshal;

module.exports = Marshal;
