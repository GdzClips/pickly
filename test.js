// Lance chaque exercice sur son exemple et compare avec la sortie attendue.
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

let echecs = 0;
for (const fichier of fs.readdirSync(path.join(__dirname, "exercices")).sort()) {
  const nom = fichier.replace(/\.js$/, "");
  const entree = fs.readFileSync(path.join(__dirname, "exemples", nom + ".in"));
  const attendu = fs.readFileSync(path.join(__dirname, "exemples", nom + ".out"), "utf8");
  const obtenu = execFileSync("node", [path.join(__dirname, "exercices", fichier)], { input: entree }).toString();

  if (obtenu === attendu) {
    console.log("✔ " + nom);
  } else {
    echecs++;
    console.log("✘ " + nom + "\n--- attendu\n" + attendu + "--- obtenu\n" + obtenu);
  }
}
process.exit(echecs === 0 ? 0 : 1);
