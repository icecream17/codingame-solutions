const B = parseInt(readline()) // basis
const I = parseInt(readline()) // index of line to generate

function saySequence(arr, n) {
    if (n === 1) {
        return arr.join(' ')
    }

    const a = []
    let repeat = 0
    let prev = null
    for (const e of arr) {
        if (repeat === 0) {
            repeat = 1
            prev = e
        } else if (prev === e) {
            repeat++
        } else {
            a.push(repeat, prev)
            repeat = 1
            prev = e
        }
    }
    a.push(repeat, prev)
    return saySequence(a, n - 1)
}

// induction is safe: I <= 25
console.log(saySequence([B], I));
