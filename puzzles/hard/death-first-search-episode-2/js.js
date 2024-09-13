const inputs = readline().split(' ');
const N = Number(inputs[0]); // the total number of nodes in the level, including the gateways
const L = Number(inputs[1]); // the number of links
const E_DONTUSE = Number(inputs[2]); // the number of exit gateways: CAN BECOME OUTDATED

const LINKS = [] // Raw Input Links
for (let i = 0; i < L; i++) {
    LINKS.push(readline().split(' ').map(a => Number(a)))
}

const EI = [] // Exit Gateway Indices
for (let i = 0; i < E_DONTUSE; i++) {
    EI.push(Number(readline()));
}

const IDS = new Set()
const CONNECTIONS = {} // Connections[a] = [...b]
for (const [a, b] of LINKS) {
    IDS.add(a)
    IDS.add(b)
    CONNECTIONS[a] ??= new Set()
    CONNECTIONS[b] ??= new Set()
    CONNECTIONS[a].add(b)
    CONNECTIONS[b].add(a)
}

// id => # connections to ei
const CONNECTIONS_TO_EI = new Map()
for (const id of IDS) {
    CONNECTIONS_TO_EI.set(id, 0)
    for (const id2 of CONNECTIONS[id]) {
        if (EI.includes(id2)) {
            CONNECTIONS_TO_EI.set(id, CONNECTIONS_TO_EI.get(id) + 1)
        }
    }
}

// game loop
while (true) {
    const SI = Number(readline()); // The index of the node on which the Skynet agent is positioned this turn

    console.error({
        N, L, E: EI.length, EI, SI, c: CONNECTIONS_TO_EI.get(SI), c2: CONNECTIONS[SI]
    });
    
    const result = main(SI)
    console.error({result})
    const [a, b] = result
    CONNECTIONS[a].delete(b)
    CONNECTIONS[b].delete(a)
    CONNECTIONS_TO_EI.set(a, CONNECTIONS_TO_EI.get(a) - 1)
    // delete isolated exit nodes; shouldn't be necessary...
    if (CONNECTIONS[b].size === 0) {
        EI.splice(EI.indexOf(b), 1)
        IDS.delete(b)
    }
    console.log(`${a} ${b}`)
}

// returns [NODE, EXIT] connection
function main(SI) {
    // Say there is one way to exit in one turn;
    // That cut is forced.
    if (CONNECTIONS_TO_EI.get(SI)) {
        for (const other of CONNECTIONS[SI]) {
            if (EI.includes(other)) {
                return [SI, other]
            }
        }
    }

    // But that's not enough.
    // If A forces B then thru A-C, C is effectively one closer.
    let lastLayer = new Set([SI])
    const found = new Map() // id => "distance"
    const reverse = new Map()
    found.set(SI, 0)

    // Traverse nodes that are `depth` distance away from SI
    // until we find a node that needs to be cut
    Traverse:
    for (let depth = 0; found.size !== IDS.size && lastLayer.length !== 0; depth++) {
        const newLayer = new Set()
        for (const ID of lastLayer) {
            const distID = found.get(ID)
            const cameFrom = reverse.get(ID)
            for (const OTHER of CONNECTIONS[ID]) {
                // If this ID came from OTHER, then a path to ID
                // would contain a path to OTHER already so no improvements
                if (cameFrom === OTHER) {
                    continue
                }
                // Calculate new distance
                const distOTHER = distID + 1 - CONNECTIONS_TO_EI.get(OTHER)
                if (!found.has(OTHER) || distOTHER < found.get(OTHER)) {
                    console.error({ ID, OTHER, distOTHER })
                    found.set(OTHER, distOTHER)
                    reverse.set(OTHER, ID)

                    // If we found a link to cut, we can exit early to prevent
                    // a bug where the traversal through such node = -1 carries
                    // over to an unrelated link
                    if (distOTHER < 0) {
                        break Traverse
                    }

                    // Only traverse non EIs
                    if (!EI.includes(OTHER)) {
                        newLayer.add(OTHER)
                    }
                }
            }
        }
        lastLayer = newLayer
    }

    console.error({found})
    const outID = [...found].filter(([ID]) => CONNECTIONS_TO_EI.get(ID)).sort(
        (a, b) => a[1] - b[1]
    )[0][0]

    for (const exit of EI) {
        if (CONNECTIONS[exit].has(outID)) {
            return [outID, exit]
        }
    }

    // Do a random connection
    console.error('random')
    for (const EXIT of EI) {
        if (CONNECTIONS[EXIT].size) {
            for (const EXIT2 of CONNECTIONS[EXIT]) {
                return [EXIT2, EXIT]
            }
        }
    }
}

