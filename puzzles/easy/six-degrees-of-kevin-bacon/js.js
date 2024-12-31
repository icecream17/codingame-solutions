/**
 * 6 Degrees of Kevin Bacon!
 **/

const actorName = readline();
const n = parseInt(readline());
const casts = new Set() // convenient delete
for (let i = 0; i < n; i++) {
    casts.add(readline().split(": ")[1].split(", "));
}

if (actorName === "Kevin Bacon") {
    console.log(0)
} else {
    const found = new Set()
    let toProcess = new Set()
    found.add("Kevin Bacon")
    toProcess.add("Kevin Bacon")
    main:
    for (let degree = 1; ; degree++) {
        let nextToProcess = new Set()
        for (const newCharacter of toProcess) {
            for (const cast of casts) {
                if (cast.includes(newCharacter)) {
                    casts.delete(cast)
                    for (const character of cast) {
                        if (character === actorName) {
                            console.log(degree)
                            break main;
                        }
                        if (!found.has(character)) {
                            found.add(character)
                            nextToProcess.add(character)
                        }
                    }
                }
            }
        }
        toProcess = nextToProcess
    }    
}
