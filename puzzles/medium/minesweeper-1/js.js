/*
Surrounding: 1 step adjacent to a square, including diagonals.
Unknown: Blank cells in the game, represented by a ?, unknown if they are a clue or a bomb
Clue: Cell that needs "clue" cells surrounding it to be bombs. Includes "0" in this case

Logic used:
A region that has x bombs and x cells, have cells that are all bombs
A region that has 0 bombs and x cells, have cells that are all not bombs

The set of (unknown cells surrounding a clue) form a region that needs
(clue - bombs surrounding the clue) bombs

If one region completely contains a second region,
you can form a third region,
which contains the cells that one region has but not another,
and needs (bombs in 1st region - bombs in 2nd region) bombs

____

If, one region needs 1 bomb, and another region needs n + 1 bombs,
and also the other region has n squares not in the first region,
those n squares are all bombs even if neither region contains the other

If, one region needs n bombs, and another region needs n + x bombs,
and also the other region has x squares not in the first region,
those x squares are all bombs even if neither region contains the other


*/


"use strict"
const [WIDTH, HEIGHT, MINECOUNT] = [30, 16, 99]

const debug = console.error

/** @type {Square[]} Minewseeper board */ let board = [];
/** @type {number} Game turn */ let turn = 0;
/** @type {Square[]} Squares that have a bomb */ let flags = [];
/** @type {Square[]} Squares that can't be a bomb */ let notbomb = [];
/** @type {Square[]} Squares that can't give any more information */ let done = [];

class Square {
    /**
     * @param {string} value Can be ? (unknown), . (zero), or a digit from 1 to 8
     * @param {number} x
     * @param {number} y
     **/

    constructor (value, x, y) {
        this.value = value;
        this.x = x;
        this.y = y;

        /** @type {boolean | null} **/ this.isbomb = null;
        /** @type {boolean} **/ this.done = false;
        /** @type {function} **/ this.neighborFilter = (square) => true;
    }

    /**
    * @param {string} val
    * @type {string | null}
    */
    set setValue(val) {
        if (val === '?' || this.value !== '?') {
            return null;
        } else if (val === '.') {
            this.done = true
            this.isbomb = false; notbomb.push(this)
            return this.value = val;
        } else {
            this.isbomb = false; notbomb.push(this)
            this.value = val;
            for (let _bomb of this.neighborsThatAreBombs) {
                this.bombUpdate();
            }
            return val
        }
    }

    /** @type {Square[]} */
    get neighbors() {
        /** @type {Square[]} */ let set = []

        for (let y = this.y - 1; y <= this.y + 1; y++) {
            for (let x = this.x - 1; x <= this.x + 1; x++) {
                if (y === this.y && x === this.x) {continue;}
                if (y < 0 || y >= HEIGHT || x < 0 || x >= WIDTH) {continue;}

                // TypeError: Cannot read property '0' of undefined (@ line below)
                let square = board[y][x]
                if (this.neighborFilter(square)) {
                    set.push(square)
                }
            }
        }

        return set
    }

    /** @type {Square[]} */
    get neighborWithFilter() {
        let result = this.neighbors
        this.neighborFilter = (square) => true;
        return result
    }

    /** @type {Square[]} */
    get possibleNeighboringBombs() {
        if (this.type === '.' || this.type === '?') {return []}
        this.neighborFilter = (square) => square.isbomb === null;
        return this.neighborWithFilter
    }

    /** @type {Square[]} */
    get neighborsWhichArentBombs() {
        if (this.type === '.' || this.type === '?') {return []}
        this.neighborFilter = (square) => square.isbomb === false;
        return this.neighborWithFilter
    }

    /** @type {Square[]} */
    get neighborsThatAreBombs() {
        if (this.type === '.' || this.type === '?') {return []}
        this.neighborFilter = (square) => square.isbomb === true;
        return this.neighborWithFilter
    }

    /** @type {Square[]} */
    get neighborHints() {
        if (this.type === '.' || this.type === '?') {return []}
        this.neighborFilter = (square) => !isNaN(square.value);
        return this.neighborWithFilter
    }

    /** @type {Square[]} */
    get neighborHintsInRange2() {
        // Maybe not put this...
        if (this.type === '.' || this.type === '?') {return []}

        /** @type {Square[]} */ let set = []
        for (let y = this.y - 2; y <= this.y + 2; y++) {
            for (let x = this.x - 2; x <= this.x + 2; x++) {
                if (y === this.y && x === this.x) {continue;}
                if (y < 0 || y >= HEIGHT || x < 0 || x >= WIDTH) {continue;}

                // TypeError: Cannot read property '0' of undefined (@ line below)
                let square = board[y][x]
                if (!isNaN(square.value)) {
                    set.push(square)
                }
            }
        }

        return set
    }

    bombUpdate() {
        this.value = (Number(this.value) - 1) ? String((Number(this.value) - 1)) : '.'
    }

    toString() {
        return `Square {value: ${this.value}, xy: ${this.x} ${this.y}, isbomb: ${this.isbomb}, done: ${this.done}}`
    }
}

class Region {
    /**
     * @param {number} mines
     * @param {Square[]} squares
     */
    constructor (mines, squares) {
        this.mines = mines;
        this.squares = squares;
    }

    includes (square) {
        for (let ourSquare of this.squares) {
            if (ourSquare === square) {return ourSquare}
            // board[y][x] === board[y][x], right?? maybe not....
        }
        return false
    }

    contains (region) {
        let notInCommon = this.squares.slice();
        for (let square of region.squares) {
            let test = this.includes(square)
            if (test) {
                notInCommon.splice(notInCommon.indexOf(test), 1)
            } else {
                this.fail = square
                return false
            }
        }
        return new Region(this.mines - region.mines, notInCommon);
    }

    toString() {
        let string = `Region {mines: ${this.mines}, squares: [`
        for (let square of this.squares) {string += `(${square.x} ${square.y}) `}
        return string.slice(0, -1) + `], fail: (${
            this.fail ? this.fail.x + ' ' + this.fail.y : this.fail
        })}`;
    }
}

function update() {
    if (turn) {
        for (let y = 0; y < HEIGHT; y++) {
            let row = readline().split(' ')
            for (let x = 0; x < WIDTH; x++) {
                board[y][x].setValue = row[x]
            }
        }
    } else {
        for (let y = 0; y < HEIGHT; y++) {
            let row = readline().split(' ').map((value, x) => new Square(value, x, y))
            board.push(row)
        }
    }

    turn++;
}

function solve() {
    let visual = []
    for (let y = 0; y < HEIGHT; y++) {
        visual[y] = ''
        for (let x = 0; x < WIDTH; x++) {
            visual[y] += (board[y][x].isbomb ? 'P' : board[y][x].value)
        }
    }
    debug(visual)


    /** @type {Square[]} */ let whatToClick = [];
    /** @type {Square[]} */ let whatFlags = [];

    /**
     * @param {string} type
     * @param {Square[]} squares
     * @param {Square | null} cell
     */
    function squaresAreAll(type, squares, cell = null) {
        if (type === 'bombs') {
            for (let bomb of squares) {
                if (whatFlags.includes(bomb.x + ' ' + bomb.y)) {
                    debug("duplicate", bomb)
                    continue
                }

                whatFlags.push(bomb.x + ' ' + bomb.y)
                bomb.isbomb = true;
                bomb.done = true;
                done.push(bomb)
                flags.push(bomb)

                for (let hint of bomb.neighborHints) {
                    hint.bombUpdate()
                }
            }
        } else { // type !== bombs
            for (let neighbor of squares) {
                neighbor.isbomb = false;
                notbomb.push(neighbor);
                whatToClick.push(neighbor.x + ' ' + neighbor.y);
            }
            if (cell !== null) {
                cell.done = true
                done.push(cell)
            } // If cell is not not done yet
        }
    }

    /**
     * @param {Region} region
     * @param {Square} cell
     * @param {Square[]} dont
     */
    function testRegionAndCell(region, cell, dont = []) {
        if (region.mines < 0 || region.squares === 0) {return debug('error')}
        if (region.mines === 0) {
            squaresAreAll('not bombs', region.squares)
            return
        } else if (region.mines === region.squares) {
            squaresAreAll('bombs', region.squares)
            return
        }

        for (let neighbor of cell.neighborHintsInRange2) {
            if (dont.includes(neighbor)) {continue}

            let otherRegion =
                new Region(Number(neighbor.value), neighbor.possibleNeighboringBombs)

            let squaresNotInRegion = otherRegion.squares.filter(
                square => !region.squares.includes(square)
            )

            let squaresNotInOtherRegion = region.squares.filter(
                square => !otherRegion.squares.includes(square)
            )

            if (
                squaresNotInOtherRegion.length + squaresNotInRegion.length === 0 ||
                squaresNotInRegion.length === region.squares.length
            ) {continue}

            if (squaresNotInRegion.length === otherRegion.mines - region.mines && squaresNotInRegion.length !== 0) {
                debug('whaaaaattttt', cell.x, cell.y, neighbor.x, neighbor.y)
                debug(region.toString(), otherRegion.toString())
                squaresAreAll('bombs', squaresNotInRegion)
                return
            } else if (squaresNotInOtherRegion.length === region.mines - otherRegion.mines && squaresNotInOtherRegion.length !== 0) {
                debug('whaaaaattttt', cell.x, cell.y, neighbor.x, neighbor.y)
                debug(region.toString(), otherRegion.toString())
                squaresAreAll('bombs', squaresNotInOtherRegion)
                return
            }

            if (squaresNotInRegion.length === 0) {
                if (region.mines === otherRegion.mines) {
                    if (squaresNotInOtherRegion.length) {
                        squaresAreAll('not bombs', squaresNotInOtherRegion)
                        return
                    }
                    continue
                }

                testRegionAndCell(
                    new Region(otherRegion.mines - region.mines, squaresNotInOtherRegion),
                    neighbor, dont.concat(cell)
                )
            } else if (squaresNotInOtherRegion.length === 0) {
                if (region.mines === otherRegion.mines) {
                    if (squaresNotInRegion.length) {
                        squaresAreAll('not bombs', squaresNotInOtherRegion)
                        return
                    }
                    continue
                }

                testRegionAndCell(
                    new Region(region.mines - otherRegion.mines, squaresNotInRegion),
                    cell, dont.concat(neighbor)
                )
            }
        }
    }

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            let cell = board[y][x]
            if (cell.done || cell.value === '?') {continue;}
            let hmmBombs = cell.possibleNeighboringBombs
            // debug(cell.toString())

            // After a clue '1' turns into '0' and then '.' because of bombUpdate
            if (cell.value === '.') {
                squaresAreAll('not bombs', hmmBombs, cell)
            } else if (hmmBombs.length === Number(cell.value)) {
                squaresAreAll('bombs', hmmBombs)
            }

            if (whatToClick.length || whatFlags.length) {
                debug('tada', cell.toString(), hmmBombs)
                debug(whatToClick, whatFlags)
                y = Infinity; break
            }

            if (!isNaN(cell.value)) {
                testRegionAndCell (
                    new Region(Number(cell.value), hmmBombs),
                    cell
                )
            }

            if (whatToClick.length || whatFlags.length) {
                debug('yas')
                debug(whatToClick, whatFlags)
                y = Infinity; break
            }
        }
    }

    visual = []
    for (let y = 0; y < HEIGHT; y++) {
        visual[y] = ''
        for (let x = 0; x < WIDTH; x++) {
            visual[y] += (board[y][x].isbomb ? 'P' : board[y][x].value)
        }
    }
    debug(visual)

    while (whatToClick.length !== 0) {
        while (whatToClick.length !== 0) {
            let thingToClick = whatToClick.pop()
            if (board[thingToClick.split(' ')[1]][thingToClick.split(' ')[0]].value === '.') {
                continue;
            }
            print(thingToClick + ' ' + whatFlags.join(' '))
            update()
        }
        solve()
    }

    while (whatFlags.length !== 0) {
        print('4 3 ' + whatFlags.join(' ')) // Don't have to nest another while loop, does all flags in 1 go
        update()
        solve()
    }

    debug('aaaaa')
    for (let y = HEIGHT - 1; y >= 0; y--) {
        for (let x = WIDTH - 1; x >= 0; x--) {
            let cell = board[y][x]
            if (cell.value === '?' && cell.isbomb !== true) {
                print(cell.x + ' ' + cell.y)
                update()
                solve()
            }
        }
    }
}

update()
console.log(4, 3)

update()
solve()

/*


cake
    Region {mines: 2, squares: [(3 0) (4 0) (5 0) (3 1)], fail: (2 1)}
    Region {mines: 1, squares: [(3 1)], fail: (3 0)}
    Region {mines: 1, squares: [(3 0) (4 0) (5 0)], fail: (3 1)}

cake
    Region {mines: 3, squares: [(5 0) (6 0) (7 0) (7 1)], fail: (4 0)}
    Region {mines: 1, squares: [(7 1)], fail: (5 0)}
    Region {mines: 2, squares: [(5 0) (6 0) (7 0)], fail: (7 1)}

cake
    Region {mines: 2, squares: [(1 1) (2 1) (3 1) (1 2) (1 3)], fail: (undefined)} Region {mines: 1, squares: [(2 1) (3 1)], fail: (1 1)} Region {mines: 1, squares: [(1 1) (1 2) (1 3)], fail: (1 4)}













*/