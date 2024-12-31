const T = readline().split(' ').map(chunk => {
    chunk = chunk.replace("sp", " ").replace("bS", "\\").replace("sQ", "'").replace("nl", "\n")
    if (chunk === "\n") {
        return "\n"
    }
    return chunk.at(-1).repeat(+chunk.slice(0, -1))
}).join("")

console.log(T)
