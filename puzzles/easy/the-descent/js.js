/**
 * The while loop represents the game.
 * Each iteration represents a turn of the game
 * where you are given inputs (the heights of the mountains)
 * and where you have to print an output (the index of the mountain to fire on)
 * The inputs you are given are automatically updated according to your last actions.
 **/


// game loop
while (true) {
    var a = []
    var biggest = [-1, -Infinity];
    for (let i = 0; i < 8; i++) {
        a.push( parseInt(readline()) ); // represents the height of one mountain.
        if (a[i] > biggest[1]) {biggest = [i, a[i]]}
    }

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    console.error(biggest, a)
    console.log(biggest[0]);     // The index of the mountain to fire on.

}
