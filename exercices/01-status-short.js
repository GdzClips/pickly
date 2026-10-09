// Lire git status --short
const lines = require("fs").readFileSync(0, "utf8").split("\n").filter((l) => l.trim() !== "");

let indexes = 0;
let modifies = 0;
let nonSuivis = 0;

for (const line of lines) {
  const x = line[0];
  const y = line[1];
  if (x === "?" && y === "?") {
    nonSuivis++;
    continue;
  }
  if ("MADR".includes(x)) indexes++;
  if ("MD".includes(y)) modifies++;
}

console.log("indexés: " + indexes);
console.log("modifiés: " + modifies);
console.log("non suivis: " + nonSuivis);
