class Code {
    constructor (a, b) {
        this.prefix = b;
        this.value = a;
        this.length = a.length;
    }
}

let sets = []
sets.add = function (a, b) {
    sets.push(new Code(a, b))
}

const n = parseInt(readline());
for (let i = 0; i < n; i++) {
    var inputs = readline().split(' ');
    sets.add(inputs[0], String.fromCharCode(inputs[1]));

}

let s = readline();
let len = s.length;
let out = '';

while (s.length) {
    let good = false;
    for (let code of sets) {
        if (s.startsWith(code.value)) {
            s = s.slice(code.length);
            out += code.prefix;
            good = true;
            break;
        }
    }

    if (!good) {
        console.log('DECODE FAIL AT INDEX ' + (len - s.length))
        break;
    }
}

if (!s.length) console.log(out)