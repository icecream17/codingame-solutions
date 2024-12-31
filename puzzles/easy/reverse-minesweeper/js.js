const lines = []

const w = parseInt(readline());
const h = parseInt(readline());
for (let i = 0; i < h; i++) {
    lines.push(readline());
}

console.error(lines.join("\n") + "\n\n")

const minesAdjacent = (row, col) => {
    if (lines[row][col] === "x") return "."

    let mines = 0
    for (const x of [-1, 0, 1]) {
        const r = lines[row + x]
        if (r === undefined) continue;
        for (const y of [-1, 0, 1]) {
            if (x === 0 && y === 0) continue;
            const c = r[col + y]
            if (c === "x") mines++
        }
    }
    return mines || "."
}

for (let row = 0; row < h; row++) {
    let printl = ""
    for (let col = 0; col < w; col++) {
        printl += minesAdjacent(row, col)
    }
    console.log(printl)
}
