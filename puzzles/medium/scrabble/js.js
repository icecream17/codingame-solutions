const N = Number(readline());
const TIME_START = new Date();

const words = [];
const points = [];

for (let i = 0; i < N; i++) {
    words.push(readline());
    points.push(0);
}

const LETTERS = readline();

console.error(N, LETTERS);
console.error(words);

for (let i = 0; i < words.length; i++) {
    const lettersLeft = LETTERS.split('');

    // 50% faster for Large dictionaries
    if (words[i].length > LETTERS.length) continue;

    for (const char of words[i]) {
        const index = lettersLeft.indexOf(char);

        if (index === -1) {
            points[i] = -Infinity
            break;
        } else {
            lettersLeft.splice(index, 1);
            points[i] += getPoints(char);
        }
    }
}



console.error(words, points);

let output = words[
    points.indexOf(
        Math.max(...points)
    )
]

//Always one possible word
if (output === undefined) console.error("AAAA")

console.error(
    String(new Date().getTime() - TIME_START.getTime()) +
    "ms"
)

console.log(
    words[
        points.indexOf(
            Math.max(...points)
        )
    ]
);

function codes(str) {
    return str.split('').map(letter => letter.codePointAt(0) - "a".codePointAt(0))
}

function getPoints(letter) {
    let code = codes(letter)[0];

    switch (code) {
        case 0:
        case 4:
        case 8:
        case 11:
        case 13:
        case 14:
        case 17:
        case 18:
        case 19:
        case 20:
            return 1;
        case 3:
        case 6:
            return 2;
        case 1:
        case 2:
        case 12:
        case 15:
            return 3;
        case 5:
        case 7:
        case 21:
        case 22:
        case 24:
            return 4;
        case 10:
            return 5;
        case 9:
        case 23:
            return 8;
        case 16:
        case 25:
            return 10;
    }
}
