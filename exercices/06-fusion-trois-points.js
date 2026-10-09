// Fusion à trois points ligne par ligne
const lines = require("fs").readFileSync(0, "utf8").replace(/\n$/, "").split("\n");

const blocs = { base: [], ours: [], theirs: [] };
let courant = null;
for (const line of lines) {
  const m = line.match(/^=== (base|ours|theirs)$/);
  if (m) courant = m[1];
  else if (courant) blocs[courant].push(line);
}

const { base, ours, theirs } = blocs;
const sortie = [];
let conflits = 0;
let i = 0;

while (i < base.length) {
  if (ours[i] === theirs[i]) {
    sortie.push(ours[i]);
    i++;
  } else if (ours[i] === base[i]) {
    sortie.push(theirs[i]);
    i++;
  } else if (theirs[i] === base[i]) {
    sortie.push(ours[i]);
    i++;
  } else {
    // Regroupe les lignes en conflit consécutives
    const nous = [];
    const eux = [];
    while (i < base.length && ours[i] !== theirs[i] && ours[i] !== base[i] && theirs[i] !== base[i]) {
      nous.push(ours[i]);
      eux.push(theirs[i]);
      i++;
    }
    sortie.push("<<<<<<< ours", ...nous, "=======", ...eux, ">>>>>>> theirs");
    conflits++;
  }
}

for (const l of sortie) console.log(l);
console.log(conflits === 0 ? "0 conflit" : conflits + " conflit(s)");
