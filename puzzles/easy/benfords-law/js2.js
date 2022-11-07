String.prototype.toFirstDigit = function () {
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(this[0]))) {
        return Number(this[0]);
    } else {
        return this.substring(1).toFirstDigit();
    }
}

let transactions = [];

const math_percentages = [.301, .176, .125, .097, .079, .067, .058, .051, .046];

const N = parseInt(readline());
for (let i = 0; i < N; i++) {
    transactions.push(readline().toFirstDigit());
}

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

if (!done) console.log('false')