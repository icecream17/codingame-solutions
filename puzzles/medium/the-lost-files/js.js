// Keeps the silly representation of edges as a string 'end1 end2'
// for convenience in using Set

// Doesn't matter but that also means the endpoints don't have to
// be numbers
const regions = new Set()

class Region {
    constructor () {
        this.edges = new Set()
        this.vertices = new Set()
    }

    tiles() {
        // Euler's formula: for a connected planar graph,
        // vertices (V), edges (E), and faces (F) is given by the equation V−E+F=2.

        // We solve for faces, excluding outer infinite space
        // F = 2+E-V - 1
        return 1 + this.edges.size - this.vertices.size
    }

    // old js...
    merge(region) {
        this.edges = new Set([...this.edges, ...region.edges])
        this.vertices = new Set([...this.vertices, ...region.vertices])
        regions.delete(region)
    }

    shouldMerge(region) {
        return [...this.vertices].some(v => region.vertices.has(v))
    }
}

function addEdgeToCorrectRegion(edge) {
    const [end1, end2] = edge.match(/\w+/g)
    const correctRegion = [...regions].find(region =>
        region.vertices.has(end1) ||
        region.vertices.has(end2)) ?? new Region()
    correctRegion.edges.add(edge)
    correctRegion.vertices.add(end1)
    correctRegion.vertices.add(end2)
    regions.add(correctRegion)
}

function normalizeEdge(edge) {
    const [end1, end2] = edge.match(/\w+/g).sort()
    return `${end1} ${end2}`
}

const E = parseInt(readline());
for (let i = 0; i < E; i++) {
    addEdgeToCorrectRegion(normalizeEdge(readline()))
}

const processed = new Set()
for (const region of regions) {
    for (const region2 of regions) {
        if (processed.has(region2) || region === region2) continue;
        if (region.shouldMerge(region2)) {
            region.merge(region2)
        }
    }
}

// # regions, # sum tiles
console.log(`${
    regions.size
} ${[...regions].reduce((accum, curr) => accum + curr.tiles(), 0)}`)
