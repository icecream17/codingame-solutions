/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/


const A1 = parseInt(readline());
const N = parseInt(readline());

let time = new Date()

// Write an answer using console.log()
// To debug: console.error('Debug messages...');
let A2 = [A1];
let prevDigit = A1;
let percent = 1;

for (let seen = []; A2.length < N; seen[prevDigit] = A2.length - 1) {
    prevDigit = A2[A2.length - 1]

    if (seen[prevDigit] === undefined) {
        A2.push(0);
    } else {
        A2.push(A2.length - seen[prevDigit]);
    }

    if (A2.length / N > (percent + 1) / 100) {
        percent = Math.floor(A2.length * 100 / N)
        console.error(percent + '% done, ' + (new Date() - time) + 'ms')
    }
}

console.error(A2, (new Date() - time) + 'ms', '100% done');
console.error(A1);
console.error(N);
print(A2[N - 1]);

/*
A1 = 1
A2 = [1]

p = 1
A2 = [1, 0]
seen[1] = 1

p = 0
A2 = [1, 0, 0]
seen[0] = 2

p = 0

_________________
A1 = 0
A2 = [0]

p = 0
A2 = [0, 0]
seen[0] = 1

p


*/
