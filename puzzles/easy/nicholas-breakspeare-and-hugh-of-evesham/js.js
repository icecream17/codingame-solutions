/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

// eighteen quintillion
// four hundred forty-six quadrillion
// seven hundred forty-four trillion
// seventy-three billion
// seven hundred nine million
// five hundred fifty-one thousand six hundred fifteen

const n = Number(readline());
for (let i = 0; i < n; i++) {
    const x = BigInt(readline());
    process(x)
}

function process(x) {
    if (x === 0n) {
        console.log("zero")
        return
    }

    const negative = x < 0n
    if (negative) x = -x

    const parts = []
    while (x !== 0n) {
        parts.push(x % 1000n)
        x = (x - (x % 1000n)) / 1000n
    }

    const strings = parts.map((p, i) => processPart(p, i)).reverse().flat()
    if (negative) {
        strings.unshift("negative")
    }
    console.error(parts.reverse())
    console.log(strings.join(" "))
}

function processPart(p, i) {
    if (p === 0n) return []
    const result = []

    if (p >= 100n) {
        const hundreds = (p - (p % 100n)) / 100n
        result.push([null, "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][hundreds], "hundred")
    }

    p %= 100n
    if (p >= 20n) {
        const tens = (p - (p % 10n)) / 10n
        const ones = p % 10n
        if (ones === 0n) {
            result.push([null, null, "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"][tens])
        } else {
            result.push(`${[null, null, "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"][tens]}-${[null, "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][ones]}`)
        }
    } else if (p > 0n) {
        result.push([null, "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"][p])
    }

    if (i > 0n) {
        result.push([null, "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"][i])
    }

    return result
}


