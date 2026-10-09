// Quel type de fusion ?
const lines = require("fs").readFileSync(0, "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

const [courant, autre] = lines[0].split(/\s+/);
const parents = {};
for (const line of lines.slice(1)) {
  const [id, ...p] = line.split("|")[0].trim().split(/\s+/);
  parents[id] = p;
}

// Tous les ancêtres d'un commit (lui-même compris)
function ancetres(id) {
  const vus = new Set();
  const pile = [id];
  while (pile.length > 0) {
    const c = pile.pop();
    if (vus.has(c)) continue;
    vus.add(c);
    pile.push(...(parents[c] || []));
  }
  return vus;
}

const ancCourant = ancetres(courant);
const ancAutre = ancetres(autre);

if (ancCourant.has(autre)) {
  console.log("Already up to date.");
} else if (ancAutre.has(courant)) {
  console.log("Fast-forward");
} else {
  const communs = [...ancCourant].filter((c) => ancAutre.has(c));
  // La base est le commun qui n'est ancêtre d'aucun autre commun
  const base = communs.find((c) => communs.every((o) => o === c || !ancetres(o).has(c)));
  console.log("Merge commit (base: " + base + ")");
}
