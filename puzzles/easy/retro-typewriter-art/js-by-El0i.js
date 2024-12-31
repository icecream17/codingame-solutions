const code = {sp:' ', bS:'\\', sQ:"'", nl:'\n'};
let r = ''
for (const w of readline().split(' ')) {
    const [,n,m] = w.match(/^(\d*)(sp|bS|sQ|nl|.)$/);
    r += (code[m] ?? m).repeat(n || 1);
}

console.log(r);

// ---
// Modified: Removed debug, inline variable, use const more, don't bind to variable
