var n = Number(readline()); // the number of temperatures to analyse
var inputs = readline().split(' ');

var closest = 1e10;
for (let i = 0; i < n; i++) {
    if ((Math.abs(Number(inputs[i])) < Math.abs(closest)) || ((Math.abs(Number(inputs[i])) == Math.abs(closest)) && (Number(inputs[i]) > closest))) {
        closest = inputs[i]
    }
}

console.log(closest == 1e10 ? 0 : closest)


