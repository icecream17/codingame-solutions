/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
var W = parseInt(inputs[0]) - 1; // width of the building.
var H = parseInt(inputs[1]) - 1; // height of the building.
var N = parseInt(readline()); // maximum number of turns before game over.
var inputs = readline().split(' ');
var X0 = parseInt(inputs[0]);
var Y0 = parseInt(inputs[1]);
var bounds = [[0, W], [0, H]]
var go = [0, 0]

// game loop
while (true) {
    var bombDir = readline(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)


    //2 3 -> 3 5 -> 0 6
    //3 7

    if (bombDir.indexOf('U') != -1) {           console.error('U')
        go[1] = Math.floor((Y0 + bounds[1][0]) / 2);
        bounds[1][1] = Y0;
    }
    if (bombDir.indexOf('D') != -1) {           console.error('D')
        go[1] = Math.ceil((Y0 + bounds[1][1]) / 2)
        bounds[1][0] = Y0;
    }
    if (bombDir.indexOf('R') != -1) {           console.error('R')
        go[0] = Math.ceil((X0 + bounds[0][1]) / 2)
        bounds[0][0] = X0;
    }
    if (bombDir.indexOf('L') != -1) {           console.error('L')
        go[0] = Math.floor((X0 + bounds[0][0]) / 2)
        bounds[0][1] = X0;
    }

    console.error([
        bombDir, W, H, X0, Y0, go, bounds
    ])

    X0 = go[0]; Y0 = go[1]
    console.log(go[0] + ' ' + go[1]);
}
