use std::io::{self, Write};

macro_rules! parse_input {
    ($x:expr, $t:ident) => ($x.trim().parse::<$t>().unwrap())
}

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
fn main() {
    let mut input_line = String::new();
    io::stdin().read_line(&mut input_line).unwrap();
    let n = parse_input!(input_line, usize);

    let mut grid = vec![];
    for _ in 0..n {
        let mut input_line = String::new();
        io::stdin().read_line(&mut input_line).unwrap();
        let line = input_line.trim_matches('\n').to_owned();
        grid.push(line);
    }

    let mut x = 0;
    let mut y = 0;
    let mut stack: Vec<u8> = vec![];

    let stdout = io::stdout();
    let mut lock = stdout.lock();

    let mut direction = b'>';
    let mut string_mode = false;
    'main:
    loop {
        let c = grid[y].as_bytes()[x];
        if string_mode {
            if c == b'"' {
                string_mode = false;
            } else {
                stack.push(c);
            }
        } else {
            match c {
                b'>' | b'<' | b'^' | b'v' => {
                    direction = c;
                }
                b'S' => {
                    match direction {
                        b'>' => {
                            x += 1;
                        }
                        b'<' => {
                            x -= 1;
                        }
                        b'^' => {
                            y -= 1;
                        }
                        b'v' => {
                            y += 1;
                        }
                        _ => unreachable!(),
                    }
                }
                b'E' => {
                    break 'main;
                }
                b'P' => {
                    eprintln!("{} {stack:?}", c as char);
                    stack.pop();
                }
                b'X' => {
                    eprintln!("{} {stack:?}", c as char);
                    let len = stack.len();
                    stack.swap(len - 2, len - 1);
                }
                b'D' => {
                    stack.push(stack[stack.len() - 1]);
                }
                b'_' => {
                    if 0 == stack.pop().unwrap() {
                        direction = b'>';
                    } else {
                        direction = b'<';
                    }
                }
                b'|' => {
                    if 0 == stack.pop().unwrap() {
                        direction = b'v';
                    } else {
                        direction = b'^';
                    }
                }
                b'I' => {
                    eprintln!("{} {stack:?}", c as char);
                    write!(lock, "{}", stack.pop().unwrap()).unwrap();
                }
                b'C' => {
                    write!(lock, "{}", stack.pop().unwrap() as char).unwrap();
                }
                b'0' => {
                    stack.push(0);
                }
                b'1' => {
                    stack.push(1);
                }
                b'2' => {
                    stack.push(2);
                }
                b'3' => {
                    stack.push(3);
                }
                b'4' => {
                    stack.push(4);
                }
                b'5' => {
                    stack.push(5);
                }
                b'6' => {
                    stack.push(6);
                }
                b'7' => {
                    stack.push(7);
                }
                b'8' => {
                    stack.push(8);
                }
                b'9' => {
                    stack.push(9);
                }
                b'+' => {
                    let a1 = stack.pop().unwrap();
                    let a2 = stack.pop().unwrap();
                    stack.push(a1 + a2);
                }
                b'-' => {
                    eprintln!("{} {stack:?}", c as char);
                    let a1 = stack.pop().unwrap();
                    let a2 = stack.pop().unwrap();
                    stack.push(a2 - a1);
                }
                b'*' => {
                    eprintln!("{} {stack:?}", c as char);
                    let a1 = stack.pop().unwrap();
                    let a2 = stack.pop().unwrap();
                    stack.push(a1 * a2);
                }
                b'"' => {
                    string_mode = true;
                }
                b' ' => {}
                _ => unreachable!(),
            }
        }
        match direction {
            b'>' => {
                x += 1;
            }
            b'<' => {
                x -= 1;
            }
            b'^' => {
                y -= 1;
            }
            b'v' => {
                y += 1;
            }
            _ => unreachable!(),
        }
    }
    // println!("answer");
}
/*

39DD1+*+DI  >11091+   v>v
 v  " on the wall"    < D 
>>     "reeb fo"      v S
0v<" bottles "        < C
X>DSC_SvPD      _25*+Cv |
       *v   IS        < P
^IDX-1 <>  SC        0v X
v   "pass it around"  < 1
>    " ,nwod eno ekat" ^-
 Sing it!   ^+55D-1X_ESD<

main:
39DD1+*+DI
$1

$1:
11091+"llaw eht no "
$2

$2:
"reeb fo selttob "
$3

$3:
>DSC_
$4

$4:
Sv PD_25*+Cv
 $5        $6

$5:
*1-XDIX0
$2

$6
SISC0"dnuora ti ssap ,nwod eno ekat"
$7

$7: same as $3
>DSC_
$8

$8:
PX1-
$9

$9
>DSE_

----------------------------
main: 3 99
99
$1: 3 99 1 1 0 "\nllaw eht no "
$2: 3 99 1 1 0 "\nllaw eht no reeb fo selttob"
$3: 3 99 1 1 0
bottles of beer on the wall\n
$4: 3 99 1 1
$5: 3 99 0 0
99
$2: 3 99 0 0 "reeb fo selttob"
$3: 3 99 0 0
bottles of beer
$4: 3 99
\n
$6: 3 99 0 "dnuora ti ssap ,nwod eno ekat"
$7: 3 99 0
"take one down, pass it around"
$8: 99 2
*/
