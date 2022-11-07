const output = console.log
const debug = console.error

const n = Number(readline());
let portionSizes = []
for (let i = 0; i < n; i++) {
    portionSizes.push(Number(readline()));
}

function gcd(a, b) {
    if (b === 0) return a;
    else return gcd(b, a % b);
}

// gcd with multiple numbers
function gcdMulti(...nums) {
    let a = nums.pop()
    while (nums.length) {
        let b = nums.pop()
        a = gcd(a, b)
        if (a === 1) {
            return 1
        }
    }
    return a
}

// Take 20 and 5
// 20 doesn't help make new elements - it's already covered by 5
// So this filters out elements if isInteger(a / b)
portionSizes = portionSizes.filter((portionSize, index, originalPortionSizes) => {
    const i = index
    for (let j = 0; j < originalPortionSizes.length; j++) {
        if (j === i) {
            continue;
        }
        if (Number.isInteger(portionSize / originalPortionSizes[j])) {
            return false
        }
    }
    return true
}).sort((a, b) => a - b)

debug(portionSizes)

if (gcdMulti(...portionSizes) > 1) {
    output(-1)
} else {
    output(main(portionSizes))
}


/*
Take 2 5

Here's what this solution does:

1. Create a modulo table from the originals

0 1 2 3 4
x   x

2. Each turn, Add the originals (2, 5)

0 1 2 3 4
x   x   x

3. Keep doing turns until all modulos are done

[
  [ [ 5 ], [], [ 2 ], [], [] ],
  [ [ 10 ], [], [ 7 ], [], [ 4 ] ],
  [ [ 15 ], [ 6 ], [ 12 ], [], [ 9 ] ],
  [ [ 20 ], [ 11 ], [ 17 ], [ 8 ], [ 14 ] ],

4. It's guaranteed that every number bigger than 20 can be made

5. Generate the remaining numbers smaller than the biggest number so far (20),
   using the same strategy as before

  [ [], [ 16 ], [], [ 13 ], [ 19 ] ],
  [ [], [], [], [ 18 ], [] ],
  [ [], [], [], [], [] ]
]

6. Find the first number smaller than 20

[
   2,  4,  5,  6,  7,  8,  9,
  10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20
]
3

7. Done!

A. Note:
Smaller overrides bigger
No duplicates
*/
function main (portionSizes) {
    let turn = 0

    // Step 1
    let modarrays = [[]]
    const lastportion = portionSizes[portionSizes.length - 1]
    for (let i = 0; i < lastportion; i++) {
        modarrays[0][i] = []
    }
    let start = modarrays[0].map(a => [])
    for (const portion of portionSizes) {
        modarrays[0][portion % lastportion].push(portion)
    }

    // Steps 2 - 3
    let nums = new Set(portionSizes)
    while (modarrays[modarrays.length - 1].some(a => a.length === 0)) {
        turn++
        // debug(turn + ': ', modarrays)
        modarrays.push(start.map(a => []))
        for (const portion of portionSizes) {
            for (let i = 0; i < modarrays[turn - 1].length; i++) {
                for (let j of modarrays[turn - 1][i]) {
                    if (! modarrays[turn][(portion + i) % lastportion].includes(portion+j)) {
                        if (! nums.has(portion + j)) {
                            nums.add(portion + j)
                            modarrays[turn][(portion + i) % lastportion].push(portion + j)
                            // debug(
                            //     turn + ': ',
                            //     portion,
                            //     j,
                            //     (portion + j) % lastportion,
                            //     modarrays[turn][(portion + i) % lastportion]
                            // )
                        }
                    }
                }
            }
        }
    }

    // Step 5
    const maxresult = Math.max(...nums)
    debug('max', maxresult)
    while (modarrays[modarrays.length - 1].some(a => a.length !== 0)) {
        turn++
        // debug(turn + ': ', modarrays)
        modarrays.push(start.map(a => []))
        for (const portion of portionSizes) {
            for (let i = 0; i < modarrays[turn - 1].length; i++) {
                for (let j of modarrays[turn - 1][i]) {
                    if (portion + j >= maxresult) {
                        continue
                    }
                    if (! modarrays[turn][(portion + i) % lastportion].includes(portion+j)) {
                        if (! nums.has(portion + j)) {
                            nums.add(portion + j)
                            modarrays[turn][(portion + i) % lastportion].push(portion + j)
                            // debug(
                            //     turn + ': ',
                            //     portion,
                            //     j,
                            //     (portion + j) % lastportion,
                            //     modarrays[turn][(portion + i) % lastportion]
                            // )
                        }
                    }
                }
            }
        }
    }
    debug(modarrays)
    debug([...nums].sort((a, b) => a - b))

    // Step 6
    let result = maxresult
    while(nums.has(result))result--;

    // Done!
    return result
}
