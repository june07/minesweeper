let os = require('os');

class MineSweeper {
	constructor(boardWidth, percentageAreBombs) {
		this.board = new GameBoard(boardWidth, percentageAreBombs);
	}
}
class GameBoard {
	/*
		u = unknown
		x = clear
		o = bomb
	*/
	constructor(boardWidth, percentageAreBombs) {
		this.spaces = boardWidth*boardWidth
		this.board = this.initGameBoard(boardWidth, percentageAreBombs)
	}
	initGameBoard(width, percent) {
		let numberOfBombsToPlace = Math.floor((width*width)*(percent/100));
		let board = randomlyMixBombs(numberOfBombsToPlace, this.spaces);
		display(board);
	}
}
function randomlyMixBombs(bombCount, spaces) {
	let board = new Array(bombCount).fill('o');
	for(let length = board.length; board.length < spaces; length++) {
		let randomPosition = length - Math.floor(Math.random() * length);
		board.splice(randomPosition, 0, 'x');
	}
	return board;
}
function display(board) {
	let width = Math.sqrt(board.length);
	for(let index = 0; index < board.length; index++) {
		process.stdout.write(board[index] + ' ');
		if ((index+1)%width === 0) process.stdout.write(os.EOL);
	}
	/*
	for(let col = 0; col < width; col++) {
		for(let row = 0; row < width; row++) {
			process.stdout.write(bombs[col][row]);
			if (row === width) process.stdout.write(os.EOL);
		}
	}*/
}
new MineSweeper(5, 50);