/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * ---
 * Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.
 **/

var inputs = readline().split(' ');
var lightX = parseInt(inputs[0]); // the X position of the light of power
var lightY = parseInt(inputs[1]); // the Y position of the light of power
var Initx = parseInt(inputs[2]); // Thor's starting X position
var Inity = parseInt(inputs[3]); // Thor's starting Y position
var x = Initx, y = Inity

// game loop
while (true) {
    var remainingTurns = parseInt(readline()); // The remaining amount of turns Thor can move. Do not remove this line.
        ////////////////////////////////////////DO NOT TOUCH/////////////////////////////////////

    console.error([lightX, lightY, x, y, remainingTurns])
    if (lightX > x) {x++;
        if (lightY > y) {y++;
            console.log('SE')
        } else if (lightY < y) {y--;
            console.log('NE')
        } else {
            console.log('E')
        }
    } else if (lightX < x) {x--;
        if (lightY > y) {y++;
            console.log('SW')
        } else if (lightY < y) {y--;
            console.log('NW')
        } else {
            console.log('W')
        }
    } else {
        if (lightY > y) {y++;
            console.log('S')
        } else {y--;
            console.log('N')
        }
    }

}
