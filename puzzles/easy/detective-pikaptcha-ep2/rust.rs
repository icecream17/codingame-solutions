use std::convert::TryFrom;
use std::io;
use std::ops::{Add, AddAssign};

macro_rules! parse_input {
    ($x:expr, $t:ident) => ($x.trim().parse::<$t>().unwrap())
}

fn read_input_line () -> String {
    let mut input_line = String::new();
    io::stdin().read_line(&mut input_line).unwrap();
    input_line
}

fn read_trimmed_input_line () -> String {
    read_input_line().trim().to_string()
}

#[derive(Clone, Copy, PartialEq, Eq)]
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

enum Side {
    Clockwise,
    Counterclockwise
}

impl Direction {
    fn clockwise (self) -> Direction {
        match self {
            Direction::Left => Direction::Up,
            Direction::Up => Direction::Right,
            Direction::Down => Direction::Left,
            Direction::Right => Direction::Down,
        }
    }

    fn counterclockwise (self) -> Direction {
        match self {
            Direction::Up => Direction::Left,
            Direction::Right => Direction::Up,
            Direction::Left => Direction::Down,
            Direction::Down => Direction::Right,
        }
    }
}

impl TryFrom<char> for Direction {
    type Error = &'static str;

    fn try_from(c: char) -> Result<Self, Self::Error> {
        match c {
            '>' => Ok(Direction::Right),
            'v' => Ok(Direction::Down),
            '<' => Ok(Direction::Left),
            '^' => Ok(Direction::Up),
            _ => Err("Invalid char")
        }
    }

}

#[derive(Clone, Copy, PartialEq, Eq)]
enum Cell {
    Wall,
    Passage(u32),
}

impl TryFrom<char> for Cell {
    type Error = &'static str;

    fn try_from(c: char) -> Result<Self, Self::Error> {
        match c {
            '#' => Ok(Cell::Wall),
            '0' | '>' | '^' | 'v' | '<' => Ok(Cell::Passage(0)),
            _ => Err("Invalid char")
        }
    }
}

impl Add<u32> for Cell {
    type Output = Cell;
    fn add(self, rhs: u32) -> Self {
        match self {
            Cell::Wall => Cell::Wall,
            Cell::Passage(n) => Cell::Passage(n + rhs),
        }
    }
}

impl AddAssign<u32> for Cell {
    fn add_assign(&mut self, rhs: u32) {
        if let Cell::Passage(n) = self {
            *n += rhs;
        }
    }
}

struct Pikaptcha {
    row: usize,
    col: usize,
    side: Side,
    dir: Direction,
}

impl Pikaptcha {
    fn turn(&mut self) {
        self.dir = match self.side {
            Side::Clockwise => self.dir.clockwise(),
            Side::Counterclockwise => self.dir.counterclockwise(),
        }
    }

    fn turn_opposite(&mut self) {
        self.dir = match self.side {
            Side::Clockwise => self.dir.counterclockwise(),
            Side::Counterclockwise => self.dir.clockwise(),
        }
    }

    fn traverse(&mut self, board: &mut Vec<Vec<Cell>>) {
        let start = (self.row, self.col);
        loop {
            // For example purposes, say the Side is Left
            // and the Direction is Up

            // There are only 3 situations:
            //
            // Turn
            //         <
            // #^  =>  #
            //
            // Forward
            // #       #^
            // #^  =>  #
            //
            // Block
            //  #       #
            // #^  =>  #>

            // Case 3: Block
            let mut turns = 0;
            while self.in_front(board) == Cell::Wall {
                self.turn_opposite();
                turns += 1;
                if turns == 4 {
                    // Rare edge case
                    return;
                }
            }

            // Cases 1 and 2: Turn and Move forward
            // This also updates the entered cells count
            self.move_forward(board);
            self.turn();
            
            // In case 1, we will just move forward.
            // In case 2, since there's a wall, we'll just turn back.

            if start == (self.row, self.col) {
                break;
            }
        }
    }

    /// The cell one step in a given direction from the given position
    fn in_front(&self, board: &Vec<Vec<Cell>>) -> Cell {
        // Check out of bounds
        match self.dir {
            Direction::Left => {
                if self.col == 0 {
                    Cell::Wall
                } else {
                    board[self.row][self.col - 1]
                }
            },
            Direction::Up => {
                if self.row == 0 {
                    Cell::Wall
                } else {
                    board[self.row - 1][self.col]
                }
            },
            Direction::Down => {
                if self.row + 1 == board.len() {
                    Cell::Wall
                } else {
                    board[self.row + 1][self.col]
                }
            },
            Direction::Right => {
                if self.col + 1 == board[0].len() {
                    Cell::Wall
                } else {
                    board[self.row][self.col + 1]
                }
            }
        }
    }

    fn move_forward(&mut self, board: &mut Vec<Vec<Cell>>) {
        match self.dir {
            Direction::Left => {
                self.col -= 1;
            },
            Direction::Up => {
                self.row -= 1;
            },
            Direction::Down => {
                self.row += 1;
            },
            Direction::Right => {
                self.col += 1;
            }
        }
        board[self.row][self.col] += 1;
    }
}

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
fn main() {
    let input_line = read_input_line();
    let inputs = input_line.split(" ").collect::<Vec<_>>();
    let width = parse_input!(inputs[0], usize);
    let height = parse_input!(inputs[1], usize);

    let mut board = Vec::with_capacity(height);
    let mut pikadata = None;
    for row in 0..height {
        let line = read_trimmed_input_line();
        let mut board_row = Vec::with_capacity(width);
        for (col, chara) in line.chars().enumerate() {
            if let Ok(dir) = Direction::try_from(chara) {
                pikadata = Some((row, col, dir));
            }
            board_row.push(Cell::try_from(chara).unwrap());
        }
        board.push(board_row);
    }

    let (row, col, dir) = pikadata.expect("Pikaptcha char not found!");
    let side = if read_trimmed_input_line() == "R" {
        Side::Clockwise
    } else {
        Side::Counterclockwise
    };

    let mut pika = Pikaptcha {
        row, col, dir, side
    };
    pika.traverse(&mut board);

    for row in board {
        let mut str_ = String::new();
        for cell in row {
            match cell {
                Cell::Wall => {
                    str_ += "#";
                },
                Cell::Passage(n) => {
                    str_ += &n.to_string();
                }
            }
        }
        println!("{str_}");
    }
}
