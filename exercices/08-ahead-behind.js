// En avance ou en retard ?
const lines = require("fs").readFileSync(0, "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

const [local, distant] = lines[0].split(/\s+/);
const parents = {};
for (const line of lines.slice(1)) {
  const [id, ...p] = line.split("|")[0].trim().split(/\s+/);
  parents[id] = p;
}

function accessibles(id) {
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

const depuisLocal = accessibles(local);
const depuisDistant = accessibles(distant);
const ahead = [...depuisLocal].filter((c) => !depuisDistant.has(c)).length;
const behind = [...depuisDistant].filter((c) => !depuisLocal.has(c)).length;

if (ahead === 0 && behind === 0) {
  console.log("Your branch is up to date with 'origin/main'.");
} else if (behind === 0) {
  console.log(`Your branch is ahead of 'origin/main' by ${ahead} commit(s).`);
} else if (ahead === 0) {
  console.log(`Your branch is behind 'origin/main' by ${behind} commit(s), and can be fast-forwarded.`);
} else {
  console.log(
    `Your branch and 'origin/main' have diverged, and have ${ahead} and ${behind} different commits each, respectively.`
  );
}
