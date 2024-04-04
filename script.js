/*----- constants -----*/
const PLAYERS = {
	O: '<img src="./img/O-tic.png" style="width: 80%; height: 80%;">',
	X: '<img src="./img/X-tic.png" style="width: 80%; height: 80%;">',
}

const MESSAGES = [
	"Great Move!",
	"You think you are good?",
	"Is that buttefly wearing a hat?",
	"Why is butter flying?",
	"Dog vs. God",
	"Butterflies taste with their feet",
	"'Borolas' is a good name for a dog",
	"The Secret of Life is Within",
	"Who invented this game?",
	"That dog knows a thing or two about Love"
]

const WINNINGCOMB = [
	// horizontal: 
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],

	// diagonal: 
	[0, 4, 8],
	[6, 4, 2],

	// vertical: 
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8]
]

/*----- state variables -----*/
let grid;
let winner;
let turn;
let board;

/*----- cached elements  -----*/
const restartButton = document.querySelector("button");
const message = document.querySelector("h1");
grid = Array.from(document.querySelectorAll("#grid > div"));

/*----- event listeners -----*/
restartButton.addEventListener("click", init);
document.getElementById("grid").addEventListener("click", handleMove);

/*----- functions -----*/
init();

function init() {
	message.innerHTML = "";
	grid.forEach(element => {
		element.innerHTML = "";
	});
	board = [null, null, null, null, null, null, null, null, null];
	winner = false;
	turn = 'X';

	render();
}


function handleMove(event) {
	let element = event.target; // element vs event
	let id = element.id;

	if (winner) {
		return;
	}
	if (grid.includes(element) && !board[id]) {
		board[id] = turn;
		winner = checkForWinner();		
		turn = turn === "X" ? "O" : "X";
		render();
	}
}


function render() {
	renderMessage();
	renderBoard();
}


function renderBoard() {
	board.forEach(function(cell, idx) {
		if (cell != null) {
			const element = document.getElementById(idx);
			element.innerHTML = PLAYERS[board[idx]];
		}
	})
}



function renderMessage() {
	if (winner) {
		message.innerHTML = `*${winner} won!*`
	} else if (board.indexOf(null) == -1) {
		message.innerText = "Tie!"
	} else {
		if (board.indexOf("X") !== -1 || board.indexOf("O") !== -1) {
			let rand = Math.floor(Math.random() * MESSAGES.length);
			message.innerText = MESSAGES[rand];
		}
	}
	return;
}


function checkForWinner() {
	let counter = 0;
	for (let i = 0; i < WINNINGCOMB.length; i++) {
		for (let j = 0; j < WINNINGCOMB[i].length; j++) {
			if (turn === board[WINNINGCOMB[i][j]]) {
				counter++;
				if (counter === 3) {
					return turn === "X" ? "Butterfly" : "Dog";
				}
			} else {
				counter = 0;
				break;
			}
		}
	}
	return false;
}


