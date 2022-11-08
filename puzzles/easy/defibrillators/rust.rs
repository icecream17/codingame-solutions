use std::io;

type Result<T> = ::std::result::Result<T, Box<dyn (::std::error::Error)>>;

fn read_line() -> Result<String> {
    let mut input_line = String::new();
    io::stdin().read_line(&mut input_line)?;
    Ok(input_line.trim_end_matches('\n').to_string())
}

fn comma_separated_degrees_to_radians(input: &str) -> Result<f64> {
    Ok(input.replace(',', ".").parse::<f64>()?.to_radians())
}

fn main() -> Result<()> {
    let lon = comma_separated_degrees_to_radians(&read_line()?)?;
    let lat = comma_separated_degrees_to_radians(&read_line()?)?;
    let n: usize = read_line()?.parse()?;
    let mut closest_distance = f64::INFINITY;
    let mut closest = String::new();
    for _ in 0..n {
        let defib = read_line()?;
        // skip id
        let mut defib = defib.split(';').skip(1);
        // read name
        let name = defib.next().unwrap();
        // ignore address and contact phone number
        let _ = defib.next();
        let _ = defib.next();
        // read longitude and latitude
        let lon_b: f64 = comma_separated_degrees_to_radians(defib.next().unwrap())?;
        let lat_b: f64 = comma_separated_degrees_to_radians(defib.next().unwrap())?;
        // calculate distance
        let x = (lon_b - lon) * ((lat + lat_b) / 2f64).cos();
        let y = lat_b - lat;
        let d = (x * x + y * y).sqrt() * 6371f64;
        // eprintln!("{d} {lat} {lon} {lat_b} {lon_b}");
        if d < closest_distance {
            closest_distance = d;
            closest = name.to_owned();
        }
    }

    println!("{closest}");
    Ok(())
}
