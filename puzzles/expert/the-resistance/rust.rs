// With significant help from ChatGPT-4o ...

const fn morse(c: u8) -> &'static str {
    match c {
        b'A' => ".-",
        b'B' => "-...",
        b'C' => "-.-.",
        b'D' => "-..",
        b'E' => ".",
        b'F' => "..-.",
        b'G' => "--.",
        b'H' => "....",
        b'I' => "..",
        b'J' => ".---",
        b'K' => "-.-",
        b'L' => ".-..",
        b'M' => "--",
        b'N' => "-.",
        b'O' => "---",
        b'P' => ".--.",
        b'Q' => "--.-",
        b'R' => ".-.",
        b'S' => "...",
        b'T' => "-",
        b'U' => "..-",
        b'V' => "...-",
        b'W' => ".--",
        b'X' => "-..-",
        b'Y' => "-.--",
        b'Z' => "--..",
        _ => unsafe { std::hint::unreachable_unchecked() }
    }
}

fn string_to_morse(s: &str) -> String {
    s.bytes().map(morse).collect()
}

fn parse_line<T: std::str::FromStr>() -> T {
    unsafe { read_line().parse::<T>().unwrap_unchecked() }
}

fn read_line() -> String {
    let mut s = String::new();
    unsafe {
        std::io::stdin().read_line(&mut s).unwrap_unchecked();
    }
    trim_newline(&mut s);
    s
}

fn trim_newline(s: &mut String) {
    if s.ends_with('\n') {
        s.pop();
        if s.ends_with('\r') {
            s.pop();
        }
    }
}

trait SubstringCheck {
    fn has_substring_at_index(&self, other: &str, index: usize) -> bool;
}

impl SubstringCheck for str {
    fn has_substring_at_index(&self, other: &str, index: usize) -> bool {
        let first_bytes = self.as_bytes();
        let second_bytes = other.as_bytes();
        
        if index + second_bytes.len() > first_bytes.len() {
            return false; // Out of bounds
        }
        
        &first_bytes[index..index + second_bytes.len()] == second_bytes
    }
}

// Algorithm (not by ChatGPT):
// Convert each word into morse
// Have a map of spans (indices -> vec of span lengths)
// For each instance of morse_word in morse_line, add the corresponding span.
// A new map/vec called paths, (indices -> 0), with first index = 1
// For each index, count how many spans go to a new index, newindex -> paths * newpaths
// print however many newpaths are at the end
fn main() {
    let morse_line = read_line();
    let n = parse_line::<usize>();
    let l = morse_line.len();

    let mut spans: Vec<Vec<usize>> = vec![vec![]; l];
    for _ in 0..n {
        let word = read_line();
        let word = string_to_morse(&word);

        for i in 0..l {
            if morse_line.has_substring_at_index(&word, i) {
                spans[i].push(word.len());
            }
        }
    }

    // 0 <= R < (u64::MAX >> 2)
    let mut paths: Vec<u64> = vec![0; l + 1];
    paths[0] = 1;

    for i in 0..l {
        let current = paths[i];
        for span_length in &spans[i] {
            paths[i + span_length] += current;
        }
    }

    println!("{}", paths[paths.len() - 1]);
}
