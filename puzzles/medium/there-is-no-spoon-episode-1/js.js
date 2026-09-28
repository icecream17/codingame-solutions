const width = Number(readline()); // the number of cells on the X axis
const height = Number(readline()); // the number of cells on the Y axis
const GRID = []
for (let i = 0; i < height; i++) {
    GRID.push(readline())
}

function isValid([row, col]) {
    return 0 <= row && 0 <= col && row < height && col < width
}

function isNode([row, col]) {
    return isValid([row, col]) && GRID[row][col] === "0"
}

function firstNodeInDirection([row, col], [vr, vc]) {
    do {
        row += vr
        col += vc
        if (isNode([row, col])) return [row, col]
    } while (isValid([row, col]))
    return [-1, -1]
}

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        if (!isNode([i, j])) continue
        const right = firstNodeInDirection([i, j], [0, 1]).reverse().join(' ')
        const bottom = firstNodeInDirection([i, j], [1, 0]).reverse().join(' ')
        console.log(`${j} ${i} ${right} ${bottom}`)
    }
}
