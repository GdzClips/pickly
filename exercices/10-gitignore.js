// Reprogrammer .gitignore
const input = require("fs").readFileSync(0, "utf8").split("\n").map((line) => line.trim());
const separator = input.indexOf("---");
const patterns = input.slice(0, separator).filter(Boolean);
const paths = input.slice(separator + 1).filter(Boolean);

// Convertit un motif glob en expression régulière.
function toRegExp(glob) {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  return new RegExp("^" + escaped.replace(/\*/g, "[^/]*").replace(/\?/g, "[^/]") + "$");
}

function correspond(motif, path) {
  const parts = path.split("/");
  const dossierSeulement = motif.endsWith("/");
  if (dossierSeulement) motif = motif.slice(0, -1);

  // Pour un motif de dossier, on ne teste pas le fichier final
  const n = dossierSeulement ? parts.length - 1 : parts.length;

  if (motif.includes("/")) {
    // Ancré à la racine : on compare aux débuts du chemin
    const re = toRegExp(motif.replace(/^\//, ""));
    for (let i = 1; i <= n; i++) {
      if (re.test(parts.slice(0, i).join("/"))) return true;
    }
    return false;
  }

  const re = toRegExp(motif);
  return parts.slice(0, n).some((p) => re.test(p));
}

for (const path of paths) {
  let ignore = false;
  for (const p of patterns) {
    const negation = p.startsWith("!");
    const motif = negation ? p.slice(1) : p;
    if (correspond(motif, path)) ignore = !negation;
  }
  console.log((ignore ? "ignoré " : "suivi ") + path);
}
