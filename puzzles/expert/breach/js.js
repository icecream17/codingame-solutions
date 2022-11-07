"use strict";

const look_up = [
    'H','He','Li','Be','B','C','N',
    'O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K',
    'Ca','Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn',
    'Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr','Nb',
    'Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te',
    'I','Xe','Cs','Ba','La','Ce','Pr','Nd','Pm','Sm','Eu',
    'Gd','Tb','Dy','Ho','Er','Tm','Yb','Lu','Hf','Ta','W',
    'Re','Os','Ir','Pt','Au','Hg','Tl','Pb','Bi','Po','At',
    'Rn','Fr','Ra','Ac','Th','Pa','U','Np','Pu','Am','Cm',
    'Bk','Cf','Es','Fm','Md','No','Lr','Rf','Db','Sg','Bh',
    'Hs','Mt','Ds','Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og'
];

const captcha_lookup = `\
 ++++
+    +
+    +
+    +
+    +
 ++++

 ++++
+++++
  +++
  +++
  +++
 +++++

 +++++
++   ++
 +  ++
   ++
  ++
+++++++

 +++++
++   ++
    ++
++   ++
 +++++

   ++++
 ++   ++
 ++   ++
++++++++
      ++
      ++

++++++
+
++++
    +
    +
+++++

 +++
+
++++
+   +
+++

++++++
    ++
   ++
  ++
 ++
 +

 ++
+  +
 ++
+  +
 ++

 ++++
+    +
 ++++
    +
    +
  +`.split('\n\n').map(digit => padLines(digit.split("\n")))

/**
 * Pads the ends of the @param lines with spaces
 * until all lines are the same length
 */
function padLines (lines) {
    const longest = Math.max(...lines.map(line => line.length))
    return lines.map(line => line.padEnd(longest, ' '))
}

const color_prefix = "¬"
const colors = new Map(Object.entries({
    GRAY: "W",
    WHITE: "w",
    RED: "R",
    LIGHT_RED: "r",
    GREEN: "G",
    LIGHT_GREEN: "g",
    BLUE: "B",
    LIGHT_BLUE: "b",
    YELLOW: "y",
    ORANGE: "o",
    PINK: "P",
    LIGHT_PINK: "p",
    VIOLET: "V",
    LIGHT_VIOLET: "v",
    CORRUPT: "?",
    RESET: "*"
}).flatMap(a => [a, a.reverse()]))

while (true) {
    const num_lines = parseInt(readline());
    const input = [];
    for (let i = 0; i < num_lines; i++) {
        input.push(readline());
    }

    const [command, ...data] = input;

    // Write an action using console.log()
    // To debug: debug("Debug messages...");
    debug(input);

    // Ordered by test case.
    switch (command) {
        // Fibonacci. [2, 3, 5, 8, ...][5] = 5th index = 21
        case "ss_n: Unauthorized": {
            const numbers = numbersIn(data[0]);
            const index = numbers.pop();
            debug([numbers, index]);

            while (numbers.length <= index) {
                numbers.push(numbers[numbers.length - 2] + numbers[numbers.length - 1]);
            }

            debug(numbers);
            console.log(numbers[numbers.length - 1]);
            break;
        }

        // Addition. [23, 74, 125, ...][5] = 5th index = 226
        // 74 - 23 = 51 and 125 - 74 = 51
        case "rs_n: Unauthorized": {
            // Arithmetic progression math wow
            // That moment when some random school math applies
            const numbers = numbersIn(data[0]);
            const index = numbers.pop()
            const diff = numbers[1] - numbers[0];
            console.log(numbers[0] + diff * index);
            break;
        }

        // Lowercase
        case "ss_f: Unauthorized":
        case "rs_f: Unauthorized": {
            const abcs = "abcdefghijklmnopqrstuvwxyz"
            const lowercaseChar = data[0].match(/[a-z]/)[0]
            console.log(abcs.indexOf(lowercaseChar));
            break;
        }

        // Periodic table lookup
        case "gs_m: Unauthorized": {
            const [/*ignore*/, index] = data[0].split(": ");
            console.log(look_up[index - 1]);
            break;
        }

        // Index element of periodic table
        case "ss_m: Unauthorized": {
            console.log(look_up.indexOf(data[0]) + 1)
            break
        }

        // Captcha
        case "ss_asc: Unauthorized": {
            figure_out_digits(data)
            break
        }

        // Literal lock indeed
        case "ss_con: Unauthorized": {
            let step = 1
            for (let j = 0; j < data[0].length; j++) {
                if (data[0][j] === color_prefix && data[0][j + 2] === ".") {
                    const color = colors.get(data[0][j + 1])
                    debug(color)
                    if (color === 'LIGHT_GREEN') {
                        step++
                    } else {
                        console.log(step)
                        break
                    }
                }
            }
            if (step === 7) {
                console.log(0)
            }
            break
        }

        // The color name before "+"
        case "ss_colv: Unauthorized":
        case "rs_colv: Unauthorized": {
            let color = ""
            for (let j = 0; j < data[0].length; j++) {
                if (data[0][j] === color_prefix) {
                    j++
                    color = colors.get(data[0][j])
                } else if (data[0][j] === "+") {
                    console.log(color)
                    break
                }
            }
            break
        }

        default:
            throw new Error(`Unrecognized command: ${command}`)
    }
}

function numbersIn(str) {
    return [...str.matchAll(/\d+/g)].flat().map(n => Number(n))
}

function figure_out_digits(lines) {
    // How would I code this?
    // I would loop over each digit,
    // and build up a string.

    // In a sense, it's multiline concatenation.

    // Prevent ReferenceErrors
    lines = padLines(lines)

    // Multiline split
    const columns = Math.max(...lines.map(line => line.length))
    let digits = []
    let digit = lines.map(_ => "")
    for (let i = 0; i < columns; i++) {
        // Split when column is just empty spaces
        if (lines.every(line => line[i] === " ")) {
            digits.push(digit)
            digit = lines.map(_ => "")
        } else {
            lines.forEach((line, j) => digit[j] += line[i])
        }
    }
    digits.push(digit)

    // Remove double empty columns
    digits = digits.filter(digit => !digit.every(line => line === ''))

    // Recognize digits
    const captcha = digits.map(digit => {
        return captcha_lookup.findIndex(reference => reference.join('').trim() === digit.join('').trim())
    })

    console.log(captcha.join(''))
}

// 0123456890123456789012345678901234567
//' +++++   +++++   +++++   ++   +++++  '

function debug(...info) {
    console.error(info);
}