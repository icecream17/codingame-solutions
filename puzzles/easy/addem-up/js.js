const _N: number = parseInt(readline())

// Card values in ascending order
let inputs: number[] = readline().split(' ').map(s => Number(s)).sort((a, b) => a - b)

// Strat: keep combining smallest two cards
let cost = 0
while (inputs.length > 1) {
    const sum = inputs[0] + inputs[1]
    inputs.splice(0, 2) // delete first two elements
    insert(inputs, sum)
    cost += sum
}

console.log(cost)

// Lazy stackoverflow copypaste, since findLastIndex doesn't exist in codingame
function insert(array, element) {
    array.splice(binarySearch(array, element), 0, element);
    return array;
}

function binarySearch(array, value) {
    let low = 0,
        high = array.length;

    while (low < high) {
        let mid = (low + high) >> 1;
        if (array[mid] < value) low = mid + 1;
        else high = mid;
    }
    return low;
}
