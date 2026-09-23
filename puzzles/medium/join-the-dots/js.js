
const [H, W] = readline().split(' ').map(Number)
const GRID = []
for (let i = 0; i < H; i++) {
    const row = readline();
    GRID.push(row)
}

let count = 0
const OUTPUT = (' '.repeat(W) + "\n").repeat(H).slice(0, -1).split("\n").map(c => c.split(""))

let location = findNext()

function findNext() {
    count++

    const C = count.toString(36).toUpperCase()

    const row = GRID.findIndex(r => r.includes(C))
    if (row === -1) return false

    const col = GRID[row].indexOf(C)
    OUTPUT[row][col] = "o"
    return { row, col }
}

function findNextDirection(nextLocation) {
    return {
        row: Math.sign(nextLocation.row - location.row),
        col: Math.sign(nextLocation.col - location.col),
    }
}

function nextSymbol(direction) {
    if (direction.row == 0) return "-";
    if (direction.col == 0) return "|";
    if (direction.row == direction.col) return "\\"
    return "/"
}

function combineSymbol(old, newSymbol) {
    if (old == " ") return newSymbol;
    if (old == "-" && newSymbol == "|") return "+";
    if (old == "|" && newSymbol == "-") return "+";
    if (old == "/" && newSymbol == "\\") return "X";
    if (old == "\\" && newSymbol == "/") return "X";
    return "*"
}


while (location) {
    const nextLocation = findNext()
    if (!nextLocation) break;

    const nextDirection = findNextDirection(nextLocation)

    while (location.row != nextLocation.row || location.col != nextLocation.col) {
        location.row += nextDirection.row
        location.col += nextDirection.col
        OUTPUT[location.row][location.col] = combineSymbol(
            OUTPUT[location.row][location.col],
            nextSymbol(nextDirection)
        )
    }
    OUTPUT[location.row][location.col] = "o"
}

for (const line of OUTPUT) {
    console.log(line.join("").trimEnd())
}
