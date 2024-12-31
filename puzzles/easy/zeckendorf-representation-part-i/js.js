const N = +readline()
const fibonnaci = [0, 1, 1, 2, 3]
while (fibonnaci.at(-1) < N) {
    const next = fibonnaci.at(-2) + fibonnaci.at(-1)
    if (next <= N) {
        fibonnaci.push(next)
    } else {
        break
    }
}

// Zeckendorf representation can be calculated greedily
const repr = [fibonnaci.pop()]
let left = N - repr
while (left !== 0) {
    while (fibonnaci.at(-1) > left) {
        fibonnaci.pop()
    }
    const next = fibonnaci.pop()
    left -= next
    repr.push(next)
}

console.log(repr.join('+'))
