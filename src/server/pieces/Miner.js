var Piece = require('./Piece');

function Miner () {
	super('Miner', 3);
}

Miner.prototype = Piece;
Miner.prototype.constructor = Miner;

module.exports = Miner;
