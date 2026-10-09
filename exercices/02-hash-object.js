// Calculer l'identifiant d'un blob
const crypto = require("crypto");

const contenu = require("fs").readFileSync(0);
const entete = Buffer.from("blob " + contenu.length + "\0");
const id = crypto.createHash("sha1").update(Buffer.concat([entete, contenu])).digest("hex");

console.log(id);
