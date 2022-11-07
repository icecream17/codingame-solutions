var inputs = readline().split(' ');
var nbFloors = Number(inputs[0]); // number of floors
var width = Number(inputs[1]); // width of the area
var nbRounds = Number(inputs[2]); // maximum number of rounds


var exit = {
    floor: Number(inputs[3]), // floor on which the exit is found
    pos: Number(inputs[4]) // position of the exit on its floor
};

var nbTotalClones = Number(inputs[5]); // number of generated clones
var nbAdditionalElevators = Number(inputs[6]); // ignore (always zero)
var nbElevators = Number(inputs[7]); // number of elevators

var elevators = [];

function Elevator(floor, pos) {
    this.floor = floor;
    this.pos = pos;
}


for (let i = 0; i < nbElevators; i++) {
    var inputs = readline().split(' ');

    elevators.push(new Elevator(Number(inputs[0]), Number(inputs[1])));

    // floor on which this elevator is found
    // position of the elevator on its floor
}

// game loop
while (true) {
    var inputs = readline().split(' ');

    var clone = {
        floor: Number(inputs[0]), // floor of the leading clone
        pos: Number(inputs[1]) // position of the leading clone on its floor
    };

    var direction = inputs[2]; // direction of the leading clone: LEFT or RIGHT

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');
    console.log(action(clone, direction));
}

function action (clone, direction) {
    console.error(clone, direction);

    if (direction === 'LEFT') {
        if (exit.floor === clone.floor) {
            if (exit.pos < clone.pos) {
                return 'WAIT';
            } else {
                return 'BLOCK';
            }
        } else {
            //elevators.length = number of elevators lol
            for (let i = 0; i < elevators.length; i++) {
                if (elevators[i].floor !== clone.floor) {continue;}
                if (elevators[i].pos <= clone.pos) {
                    return 'WAIT';
                } else {
                    return 'BLOCK';
                }
            }
        }
    } else if (direction === 'RIGHT') {
        if (exit.floor === clone.floor) {
            if (exit.pos > clone.pos) {
                return 'WAIT';
            } else {
                return 'BLOCK';
            }
        } else {
            //elevators.length = number of elevators lol
            for (let i = 0; i < elevators.length; i++) {
                if (elevators[i].floor !== clone.floor) {continue;}
                if (elevators[i].pos >= clone.pos) {
                    return 'WAIT';
                } else {
                    return 'BLOCK';
                }
            }
        }
    } else {
        //direction = NONE
        return 'WAIT';
    }
}
