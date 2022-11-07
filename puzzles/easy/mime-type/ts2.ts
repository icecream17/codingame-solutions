const N = parseInt(readline()) // Number of mime types
const Q = parseInt(readline()) // Number of file names

const MIME_DATA = new Map()
for (let i = 0; i < N; i++) {
    // [file extension, MIME type]
    const [EXT, MT] = readline().split(' ')
    MIME_DATA.set("." + EXT.toLowerCase(), MT)
}

for (let i = 0; i < Q; i++) {
    const FILE_NAME = readline()
    const FILE_EXT = FILE_NAME.slice(FILE_NAME.lastIndexOf(".")).toLowerCase()
    console.log(MIME_DATA.get(FILE_EXT) ?? "UNKNOWN")
}
