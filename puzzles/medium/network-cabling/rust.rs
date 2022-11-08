use std::io;

macro_rules! parse_input {
    ($x:expr, $t:ident) => ($x.trim_end_matches('\n').parse::<$t>().unwrap())
}

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut input_line = String::new();
    io::stdin().read_line(&mut input_line).unwrap();
    let n = parse_input!(input_line, usize);
    let mut maxx = i64::MIN;
    let mut minx = i64::MAX;
    let mut ys = Vec::with_capacity(n);
    for _ in 0..n {
        let mut input_line = String::new();
        io::stdin().read_line(&mut input_line).unwrap();
        let mut inputs = input_line.trim_end_matches('\n').split(" ");
        let x: i64 = inputs.next().unwrap().parse()?;
        let y: i64 = inputs.next().unwrap().parse()?;
        if x < minx {
            minx = x;
        }
        if x > maxx {
            maxx = x;
        }
        ys.push(y);
    }

    // Best line is the median
    ys.sort();
    let yslen = ys.len();
    let double_median = if yslen & 1 == 1 {
        ys[yslen >> 1] << 1
    } else {
        ys[yslen >> 1] + ys[(yslen >> 1) - 1]
    };

    let mut doublediff = 0;
    for y in ys {
        doublediff += (y << 1).abs_diff(double_median);
    }

    // Write an answer using println!("message...");
    // To debug: eprintln!("Debug message...");
    // eprintln!("{maxx} {minx} {double_median} {doublediff} {}", doublediff >> 1);
    println!("{}", (maxx - minx) as u64 + (doublediff >> 1));
    Ok(())
}
