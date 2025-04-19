const a = readline().split(' ').map(Number)
const b = readline().split(' ').map(Number)

if (a.length === 0 || b.length === 0) {
    console.log(0)
} else {
    let aNextRepeat = a.shift()
    let aNextValue = a.shift()
    let bNextRepeat = b.shift()
    let bNextValue = b.shift()
    let sum = 0
    do {
        const take = Math.min(aNextRepeat, bNextRepeat)
        // console.error([aNextRepeat, aNextValue, bNextRepeat, bNextValue, take, take * (aNextValue + bNextValue)])
        sum += take * (aNextValue * bNextValue)
        aNextRepeat -= take
        if (aNextRepeat === 0) {
            aNextRepeat = a.shift()
            aNextValue = a.shift()
        }
        bNextRepeat -= take
        if (bNextRepeat === 0) {
            bNextRepeat = b.shift()
            bNextValue = b.shift()
        }
    } while (aNextRepeat && bNextRepeat);
    console.log(sum)
}
