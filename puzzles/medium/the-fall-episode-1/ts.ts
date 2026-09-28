type Entrance = "TOP" | "LEFT" | "RIGHT"
type Exit = "LEFT" | "RIGHT" | "BOTTOM" | undefined | "X"
function directionToVector(d: "TOP" | "BOTTOM" | "LEFT" | "RIGHT") {
    return ({
        TOP: [0, -1],
        BOTTOM: [0, 1],
        LEFT: [-1, 0],
        RIGHT: [1, 0]
    } as const)[d]
}

function sum([a, b]: readonly [number, number], [c, d]: readonly [number, number]) {
    return [a+c, b+d]
}

function index<T>(arr: T[][], [x, y]: readonly [number, number]) {
    return arr[y][x]
}

class Room {
    TOP: Exit
    LEFT: Exit
    RIGHT: Exit
    // Room[entrance direction] = exit direction or undefined if can't enter from there or "X"
    constructor({TOP, LEFT, RIGHT}: Partial<Record<Entrance, Exit>> = {}) {
        this.TOP = TOP
        this.LEFT = LEFT
        this.RIGHT = RIGHT
    }

    *_exits() {
        for (const prop in this) {
            if (this[prop]) {
                yield this[prop] as Omit<Exit, undefined>
            }
        }
    }

    exits() {
        return [...this._exits()]
    }
}

const ROOMS = [
    // 0 - 4
    new Room(),
    new Room({ TOP: "BOTTOM", LEFT: "BOTTOM", RIGHT: "BOTTOM" }),
    new Room({ LEFT: "RIGHT", RIGHT: "LEFT" }),
    new Room({ TOP: "BOTTOM" }),
    new Room({ TOP: "LEFT", LEFT: "X", RIGHT: "BOTTOM" }),

    // 5 - 9
    new Room({ TOP: "RIGHT", LEFT: "BOTTOM", RIGHT: "X" }),
    new Room({ TOP: "X", LEFT: "RIGHT", RIGHT: "LEFT" }),
    new Room({ TOP: "BOTTOM", RIGHT: "BOTTOM" }),
    new Room({ LEFT: "BOTTOM", RIGHT: "BOTTOM" }),
    new Room({ TOP: "BOTTOM", LEFT: "BOTTOM" }),

    // 10 - 13
    new Room({ TOP: "LEFT", LEFT: "X" }),
    new Room({ TOP: "RIGHT", RIGHT: "X" }),
    new Room({ RIGHT: "BOTTOM" }),
    new Room({ LEFT: "BOTTOM" }),
]

const GRID: Room[][] = []

let inputs = readline().split(' ');
const W = Number(inputs[0]); // number of columns.
const H = Number(inputs[1]); // number of rows.
for (let i = 0; i < H; i++) {
    const LINE = readline().split(' ').map(c => ROOMS[c] as unknown as Room); // represents a line in the grid and contains W integers. Each integer represents one room of a given type.
    GRID.push(LINE)
}
const EX = Number(readline()); // the coordinate along the X axis of the exit (not useful for this first mission, but must be read).

// game loop
while (true) {
    let inputs = readline().split(' ');
    const XI = Number(inputs[0])
    const YI = Number(inputs[1])
    const DIR = inputs[2] as "TOP" | "LEFT" | "RIGHT"
    const NEXT_DIR = index(GRID, [XI, YI])[DIR]
    if (NEXT_DIR === "X") throw TypeError("X");
    console.error([XI, YI], directionToVector(NEXT_DIR), NEXT_DIR, GRID)
    const NEXT_POS = sum([XI, YI], directionToVector(NEXT_DIR))
    

    // One line containing the X Y coordinates of the room in which you believe Indy will be on the next turn.
    console.log(NEXT_POS.join(' '));
}
