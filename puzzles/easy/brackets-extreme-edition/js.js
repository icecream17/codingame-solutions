/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const expression = readline();

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

let counts = [0, 0, 0];
let currentnesting = '';

for (let i = 0; i < expression.length; i++) {
    let char = expression[i];
    if (char === '{') {
        counts[0]++;
        currentnesting += char;
    }

    if (char === '(') {
        counts[1]++;
        currentnesting += char;
    }

    if (char === '[') {
        counts[2]++;
        currentnesting += char;
    }

    if (char === '}') {
        counts[0]--;
        if (currentnesting[currentnesting.length - 1] !== '{') {
            console.log(false);
            break;
        }
        currentnesting = currentnesting.slice(0, -1);
    }

    if (char === ')') {
        counts[1]--;
        if (currentnesting[currentnesting.length - 1] !== '(') {
            console.log(false);
            break;
        }
        currentnesting = currentnesting.slice(0, -1);
    }

    if (char === ']') {
        counts[2]--;
        if (currentnesting[currentnesting.length - 1] !== '[') {
            console.log(false);
            break;
        }
        currentnesting = currentnesting.slice(0, -1);
    }

    if (i === expression.length - 1) {
        for (let j = 0; j < counts.length; j++) {
            if (counts[j] !== 0) {
                console.log(false);
                break;
            }
            if (j === counts.length - 1) {
                console.log(true);
            }
        }
    }
}
