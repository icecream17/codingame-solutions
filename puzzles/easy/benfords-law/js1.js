String.prototype.toFirst = function () {
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(this[0]))) {
        return Number(this[0]);
    } else {
        return this.substring(1).toFirst();
    }
}

let transactions = [];

const N = parseInt(readline());
for (let i = 0; i < N; i++) {
    transactions.push(readline().toFirst());
}

const math_percentages = [.301, .176, .125, .097, .079, .067, .058, .051, .046];
let actual_percents = [
    transactions.reduce((prevVal, curVal) => prevVal + (curVal === 1)) / transactions.length,
    transactions.reduce((prevVal, curVal) => prevVal + (curVal === 2)) / transactions.length,
    transactions.reduce((prevVal, curVal) => prevVal + (curVal === 3)) / transactions.length,
    transactions.reduce((prevVal, curVal) => prevVal + (curVal === 4)) / transactions.length,
    transactions.reduce((prevVal, curVal) => prevVal + (curVal === 5)) / transactions.length,
    transactions.reduce((prevVal, curVal) => prevVal + (curVal === 6)) / transactions.length,
    transactions.reduce((prevVal, curVal) => prevVal + (curVal === 7)) / transactions.length,
    transactions.reduce((prevVal, curVal) => prevVal + (curVal === 8)) / transactions.length,
    transactions.reduce((prevVal, curVal) => prevVal + (curVal === 9)) / transactions.length
];

let done = false;

for (let i = 0; i < actual_percents.length; i++) {
    actual_percents[i] = Math.abs(actual_percents[i] - math_percentages[i])

    if (actual_percents[i] >= .1) {console.log('true'); done = true; break;}
}

console.error(actual_percents)

if (!done) console.log('false')