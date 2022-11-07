/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

let board = [];
for (let i = 0; i < 3; i++) {
    board.push(readline().split(''));
}

let row = [0, 0, 0]
let col = [0, 0, 0]
let diag = [0, 0]
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let char = board[i][j]

        if (char === 'O') {
            row[i] = row[i] === -1 ? -1 : row[i] + 1
            col[j] = col[j] === -1 ? -1 : col[j] + 1

            if (i === j) {
                diag[0] = diag[0] === -1 ? -1 : diag[0] + 1
            } else if (i + j === 2) {
                diag[1] = diag[1] === -1 ? -1 : diag[1] + 1
            }
        } else if (char === 'X') {
            row[i] = -1
            col[j] = -1

            if (i === j) {
                diag[0] = -1
            } else if (i + j === 2) {
                diag[1] = -1
            }
        }
    }
}

let boo = false;

Main2:
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (board[i][j] !== '.') {continue}
        if (
            row[i] === 2 ||
            col[j] === 2 ||
            (i === j && diag[0] === 2) ||
            (i + j === 2 && diag[1] === 2)
        ) {
            board[i][j] = 'O'
            boo = true
            break Main2
        }
    }
}

for (let i = 0; i < 3; i++) {board[i] = board[i].join('')}

for (let i = 0; i < 3; i++) {
    if (!boo) {
        print('false'); break
    }

    print(board[i])
}


