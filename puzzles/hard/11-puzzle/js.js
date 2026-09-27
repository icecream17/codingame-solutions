// deeply const after input
const GRID = []
for (let i = 0; i < 3; i++) {
    GRID.push(readline().split(' ').map(Number))
}

const starttime = Date.now()
function time() {
    return Date.now() - starttime + "ms"
}

/////
const GOAL = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11]
]

/////
function depth2copy(array) {
    return array.map(entry => entry.slice())
}

/////
const queue = []
const appeared = new Set()

function pushToQueue(data, importance, hash) {
    const h = hash(data)
    if (appeared.has(h)) return;
    appeared.add(h)

    const i = queue.findIndex(v => v.importance >= importance)
    if (i === -1) {
        queue.push({data, importance})
    } else {
        queue.splice(i, 0, {data, importance})
    }
}

function popQueue() {
    const p = queue.pop()
    return [p.data, p.importance]
}

/**
 * @param heuristic The goal state should be 0, worse states negative.
 */
function aStar(start, heuristic, hash, childFunc) {
    let best = heuristic(start)
    pushToQueue(start, best, hash)

    while (queue.length) {
        const [next, score] = popQueue()
        if (score === 0) {
            return next
        }

        if (next === undefined) {
            throw TypeError("astar next undefined")
        }

        for (const child of childFunc(next)) {
            const h = heuristic(child)
            if (h !== -Infinity)
                pushToQueue(child, h, hash)
            if (h > best) {
                best = h
                console.error(h, time())
            }
        }
    }

    return "FAIL"
}

/////
// Queue entries will be a move history. A move is [row, col].
function adjacent(grid, [row, col]) {
    return [
        [row-1, col],
        [row+1, col],
        [row, col-1],
        [row, col+1]
    ].filter(([r, c]) => r >= 0 && c >= 0 && r < grid.length && c < grid[0].length)
}

function findn(n, grid) {
    for (let i = 0; i < grid.length; i++)
        for (let j = 0; j < grid[i].length; j++)
            if (grid[i][j] === n) return [i, j]
}

function find0(grid) {
    return findn(0, grid)
}

function doMove(grid, [row, col]) {
    const [i, j] = find0(grid)
    grid[i][j] = grid[row][col]
    grid[row][col] = 0
}

function generateMoves(grid) {
    return adjacent(grid, find0(grid))
}

function hashGrid(grid) {
    return grid.join("\n")
}

function gridFromMoves(moveHistory) {
    const grid = depth2copy(GRID)
    for (const move of moveHistory) {
        doMove(grid, move)
    }
    return grid
}

function moveHistoryHash(moveHistory) {
    return hashGrid(gridFromMoves(moveHistory))
}

function distance([a, b], [c, d]) {
    return Math.abs(a - c) + Math.abs(b - d)
}

function score(moveHistory) {
    if (moveHistory.length > 49) return -Infinity

    const grid = gridFromMoves(moveHistory)
    let s = 0
    for (let i = 0; i < 12; i++) {
        s += distance(findn(i, grid), findn(i, GOAL))
    }
    if (s >= 50 - moveHistory.length) {
        return -Infinity
    }
    if (s !== 0) {
        s += moveHistory.length * 0.01
        // if (moveHistory.length < 10) {
        //     s += moveHistory.length * 0.8
        // } else {
        //     s += 8 + (moveHistory.length - 9) * 0.3
        // }        
    }
    return -s
}

function generateChildMoveHistories(moveHistory) {
    const grid = gridFromMoves(moveHistory)
    return generateMoves(grid).map(move => [...moveHistory, move])
}

const result = aStar([], score, moveHistoryHash, generateChildMoveHistories)

if (result === "FAIL") console.log("FAIL")
else {
    console.error(time() + " " + result.length)
    for (const move of result) {
        console.log(move.join(" "))
    }
}
