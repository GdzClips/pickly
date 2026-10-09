// Simuler les branches
const lines = require("fs").readFileSync(0, "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

const branches = { main: "c0" };
let head = "main";

for (const line of lines) {
  const mots = line.split(/\s+/);
  if (mots[0] === "commit") {
    branches[head] = mots[1];
  } else if (mots[0] === "branch") {
    branches[mots[1]] = branches[head];
  } else if (mots[0] === "switch" && mots[1] === "-c") {
    branches[mots[2]] = branches[head];
    head = mots[2];
  } else if (mots[0] === "switch") {
    head = mots[1];
  }
}

for (const nom of Object.keys(branches).sort()) {
  console.log(nom + " -> " + branches[nom]);
}
console.log("HEAD -> " + head);
