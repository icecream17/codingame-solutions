const [width, height, countX, countY] = readline().split(' ').map(Number);
const xMeasures = readline().split(' ').map(Number);
const yMeasures = readline().split(' ').map(Number);

// Make sure all lines exist
if (xMeasures[0] !== 0) xMeasures.unshift(0);
if (yMeasures[0] !== 0) yMeasures.unshift(0);
if (xMeasures.at(-1) !== width) xMeasures.push(width);
if (yMeasures.at(-1) !== height) yMeasures.push(height);


// This solutions just loops over all combinations of measures
let numSquares = 0
for (const [i, xLineA] of xMeasures.entries()) {
    for (const [j, yLineA] of yMeasures.entries()) {
        for (let k = i + 1; k < xMeasures.length; k++) {
            const xLineB = xMeasures[k]
            for (let l = j + 1; l < yMeasures.length; l++) {
                const yLineB = yMeasures[l]
                if (xLineB - xLineA === yLineB - yLineA) {
                    console.error(xLineA, xLineB, yLineA, yLineB)
                    numSquares++
                }
            }
        }
    }
}

console.log(numSquares);
