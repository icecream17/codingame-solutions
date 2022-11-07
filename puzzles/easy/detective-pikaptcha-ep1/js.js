/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');

const width = parseInt(inputs[0]);
const height = parseInt(inputs[1]);

const board = []

for (let i = 0; i < height; i++) {
    board.push(readline());
}

console.error(board)

for (let i = 0; i < height; i++) {

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    let output = '';

    for (let j = 0; j < board[i].length; j++) {
        output += board[i][j] === '#' ? '#' : getAdjacent(i, j);
    }

    console.log(output)
}

function getAdjacent(i, j) {
    let numAdjacent = 0;

    let vertical = [
        board[i + 1],
        board[i - 1],
    ];

    let horizontal = [
        board[i][j - 1],
        board[i][j + 1],
    ];

    for (let k of vertical) {
        if (k !== undefined) {
            if (k[j] === '0') {
                numAdjacent++;
            }
        }
    }

    for (let k of horizontal) {
        if (k === '0') {
            numAdjacent++;
        }
    }

    console.error(vertical, horizontal, i, j, numAdjacent)

    return numAdjacent;
}