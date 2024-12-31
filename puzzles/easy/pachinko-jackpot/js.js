
const height = +readline()
const rows = []
for (let i = 0; i < height; i++) {
    rows.push(readline().split('').map(a => +a));
}

// This isn't in the documentation but height is at least 1
let prev = rows[0]
for (let i = 1; i < height; i++) {
    let row = rows[i]
    for (let j = 0; j < row.length; j++) {
        row[j] += (j === 0
            ? prev[j]
            : Math.max(prev[j] ?? 0, prev[j-1])
        )
    }
    prev = row
}

const prizes = []
for (let i = 0; i < height + 1; i++) {
    prizes.push(+readline() * Math.max(prev[i] ?? 0, prev[i-1] ?? 0))
}

// console.error(prev)
console.log(Math.max(...prizes));
