
// Input
const LETTER_LENGTH = parseInt(readline());
const LETTER_HEIGHT = parseInt(readline());
const TEXT = readline().toUpperCase();

const LINES = [];
for (let i = 0; i < LETTER_HEIGHT; i++) {
    LINES.push(readline());
}

// Find chars
// ABCDEFGHIJKLMNOPQRSTUVWXYZ? in ASCII art
const ASCII_CHARS = []
for (let i = 0; i < 27; i++) {
    ASCII_CHARS[i] = LINES.map(line => line.slice(LETTER_LENGTH * i, LETTER_LENGTH * (i + 1)))
}

// Convert TEXT to ASCII Art
const ASCII_OUTPUT = []
const A_THRU_Z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
for (const char of TEXT) {
    // Find char
    const ASCII_CHAR = A_THRU_Z.includes(char)
        ? ASCII_CHARS[A_THRU_Z.indexOf(char)]
        : ASCII_CHARS.at(-1) // Default is "?"

    // Add char to result
    for (let i = 0; i < ASCII_CHAR.length; i++) {
        ASCII_OUTPUT[i] ??= ""
        ASCII_OUTPUT[i] += ASCII_CHAR[i]
    }
}

for (const line of ASCII_OUTPUT) {
    console.log(line)
}
