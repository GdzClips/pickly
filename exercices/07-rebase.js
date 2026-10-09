// Les commits rejoués par un rebase
const lines = require("fs").readFileSync(0, "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

const [branche, cible] = lines[0].split(/\s+/);
const commits = {};
for (const line of lines.slice(1)) {
  const [gauche, ...reste] = line.split("|");
  const [id, parent] = gauche.trim().split(/\s+/);
  commits[id] = { parent, message: reste.join("|").trim() };
}

// Chaîne de commits d'un id jusqu'à la racine
function historique(id) {
  const chaine = [];
  while (id) {
    chaine.push(id);
    id = commits[id].parent;
  }
  return chaine;
}

const depuisCible = new Set(historique(cible));
const rejoues = historique(branche).filter((id) => !depuisCible.has(id)).reverse();

for (const id of rejoues) console.log(id + " " + commits[id].message);
console.log(rejoues.length + " commit(s) rejoué(s) sur " + cible);
