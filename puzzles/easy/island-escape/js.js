
const N = +readline()
const CENTER = N >> 1
const grid = []
for (let i = 0; i < N; i++) {
    grid.push(readline().split(' ').map(Number))
}

const positionHash = (row, col) => `${row} ${col}`
const positionUnhash = (hash) => hash.split(' ').map(Number) // > [row, column]
const neighbors = (row, col) => {
    let ocean = false
    const current = grid[row][col]
    const potentials = [[row - 1, col], [row + 1, col],
                        [row, col - 1], [row, col + 1]].filter(([r, c]) => {
                            const plot = grid[r]?.[c]
                            if (plot === undefined) return false;
                            if (Math.abs(current - plot) > 1) return false;
                            if (plot === 0) ocean = true;
                            return true;
                        })
    return [potentials, ocean]
}

const searched = new Set()
let toProcess = new Set()
searched.add(positionHash(CENTER, CENTER))
toProcess.add(positionHash(CENTER, CENTER))

main:
do {
    while (toProcess.size) {
        let nextToProcess = new Set()
        for (const todo of toProcess) { // todo : a plot of land
            const [row, col] = positionUnhash(todo)
            const [hors, ocean] = neighbors(row, col)
            if (ocean) {
                console.log("yes")
                break main
            }
            for (const [nrow, ncol] of hors) {
                const nhash = positionHash(nrow, ncol)
                if (!searched.has(nhash)) {
                    searched.add(nhash)
                    nextToProcess.add(nhash)
                }
            }
        }
        toProcess = nextToProcess
    }

    console.log("no")
} while (false)
