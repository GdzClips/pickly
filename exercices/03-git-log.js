// Reprogrammer git log
const lines = require("fs").readFileSync(0, "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

const head = lines[0];
const commits = {};
for (const line of lines.slice(1)) {
  const [gauche, ...reste] = line.split("|");
  const [id, ...parents] = gauche.trim().split(/\s+/);
  commits[id] = { parents, message: reste.join("|").trim() };
}

// Parcours en largeur depuis HEAD
const file = [head];
const vus = new Set([head]);
while (file.length > 0) {
  const id = file.shift();
  console.log(id + " " + commits[id].message);
  for (const parent of commits[id].parents) {
    if (!vus.has(parent)) {
      vus.add(parent);
      file.push(parent);
    }
  }
}
