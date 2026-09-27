const [H, W] = readline().split(' ').map(Number)

const GRID = []
for (let i = 0; i < H; i++) {
    GRID.push(readline().split(' ').map(Number))
}

///
const CORRECT = []
for (let i = 0; i < H; i++) {
    CORRECT.push([])
    for (let j = 0; j < W; j++) {
        CORRECT[i].push(i * W + j + 1)
    }
}
CORRECT[H - 1][W - 1] = NaN

///
function findN(n, grid) {
    for (let i = 0; i < H; i++)
        for (let j = 0; j < W; j++)
            if (grid[i][j] === n) return [i, j]
}

function distance([a, b], [c, d]) {
    return Math.abs(a - c) + Math.abs(b - d)
}

let result = 0
for (let i = 1; i < W * H; i++) {
    result += distance(findN(i, GRID), findN(i, CORRECT))
}

console.log(result)
