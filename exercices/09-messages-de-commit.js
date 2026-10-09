// Vérifier des messages de commit (Conventional Commits)
const lines = require("fs").readFileSync(0, "utf8").split("\n").map((l) => l.replace(/\r$/, ""));

const TYPES = ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"];

for (const line of lines) {
  if (line.trim() === "") continue;

  const m = line.match(/^([a-z0-9-]+)(\([a-z0-9-]+\))?!?: (.+)$/);
  if (!m || m[3].trim() === "") {
    console.log("KO: format invalide");
  } else if (!TYPES.includes(m[1])) {
    console.log("KO: type inconnu (" + m[1] + ")");
  } else if (m[3].endsWith(".")) {
    console.log("KO: point final");
  } else if (line.length > 72) {
    console.log("KO: trop long (" + line.length + ")");
  } else {
    console.log("OK");
  }
}
