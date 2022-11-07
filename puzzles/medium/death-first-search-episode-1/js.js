var inputs = readline().split(' ');
var N = Number(inputs[0]); // the total number of nodes in the level, including the gateways
var L = Number(inputs[1]); // the number of links
var E = Number(inputs[2]); // the number of exit gateways
var CS = [], EI = [];

for (let i = 0; i < L; i++) {
    var inputs = readline().split(' ');
    CS.push([Number(inputs[0]), Number(inputs[1])])
}
for (let i = 0; i < E; i++) {
    EI.push(Number(readline())); // the index of a gateway node
}

// game loop
while (true) {
    var SI = Number(readline()); // The index of the node on which the Skynet agent is positioned this turn
    var a, b;

    console.error([
        N, L, E, EI, SI
    ]);

    var action = false;

    var escroutes = [];

    for (var i = 0; i < CS.length; i++) {
        for (let j = 0; j < EI.length; j++) {
            if (CS[i].indexOf(EI[j]) != -1) {
                escroutes.push(CS[i]);
                if (CS[i].indexOf(SI) != -1) {
                    console.error(CS[i] + '!')
                    console.log(CS[i][0] + ' ' + CS[i][1]);

                    escroutes.splice(escroutes.indexOf(CS[i], 1));
                    CS.splice(i, 1)
                    action = true;
                }
            }
        }
    }

    if (escroutes.length !== 0 && action === false) {
        console.log(escroutes[0][0] + ' ' + escroutes[0][1]);
        CS.splice(CS.indexOf(escroutes[0]), 1)
        escroutes.splice(0, 1)
    }

    console.error(escroutes)
}
