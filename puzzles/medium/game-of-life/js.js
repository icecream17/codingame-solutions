/**
 * Hello. How are you doing?
 * Think of a number. Did you guess 1907550917589376913875193857398532159850986549145874359345...
 **/

var inputs = readline().split(' ');
const width = parseInt(inputs[0]);
const height = parseInt(inputs[1]);

let board = [];

for (let i = 0; i < height; i++) {
    board.push(readline());
}

// Sections: Lines: 16-27, 28-29, 30-40, 41-51, 52-56, 57-59
// To debug: Nothing wrong =D

                let futureboard = board.slice();
            for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
    applyrules(
countNeighbors(i, j), board[i][j], i, j
    );
        }
            }
                for (let i of futureboard)
                    console.log(i);
                        function applyrules(num, char, x, y) {
                    if (char === '1') {
                if (num < 3 || num > 4) {
            changefuture(x, y, '0');
                }
                    } else {
                if (num === 3) {
            changefuture(x, y, '1');
                }
                    }
                        }
                    function countNeighbors(x, y) {
                let count = 0;
            for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
    if (withinbounds(0, x, i) && withinbounds(1, y, j)) {
if (board[i + x][j + y] === '1') count++;
    }
        }
            }
                return count;
                    }
                        function changefuture(x, y, char) {
                    futureboard[x] = futureboard[x].split('');
                futureboard[x][y] = char;
            futureboard[x] = futureboard[x].join('');
        }
    function withinbounds(foo, a, b) {
return foo ? (a + b < width && a + b > -1) : (a + b < height && a + b > -1);
    }
