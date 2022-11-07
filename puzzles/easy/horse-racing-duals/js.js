const N = parseInt(readline())
const horses = []

for (let i = 0; i < N; i++) {
   horses.push(parseInt(readline()))
}

horses.sort((a, b) => a - b)

let minDiff = Infinity
for (let i = 0; i < horses.length - 1; i++) {
   const diff = Math.abs(horses[i] - horses[i + 1])
   if (diff < minDiff) {
      minDiff = diff
   }
}

console.log(minDiff);
