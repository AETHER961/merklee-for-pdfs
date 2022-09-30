const crypto = require("crypto");
const sha256 = require("crypto-js/sha256");
const fs = require("fs");
const path = require("path");

//================================
const dirPath = "./pdfs";
var pdfFiles = fs.readdirSync(dirPath);
var pdfFilesLength = pdfFiles.length;
//================================
console.log("pdfFilesLength", pdfFilesLength);

//==================================

fs.readdir(path.resolve(__dirname, "./pdfs"), (err, files) => {
  let hashesArray = [];
  if (err) throw err;

  for (let file of files) {
    const fileBuffer = fs.readFileSync(`./pdfs/${file}`, {
      encoding: "utf8",
    });
    const hashSum = crypto.createHash("sha256");
    hashSum.update(fileBuffer);
    const hex = hashSum.digest("hex");
    hashesArray.push(hex);
    if (hashesArray.length % 2 != 0) {
      hashesArray.push(hashesArray[hashesArray.length - 1]);
    }
    while (hashesArray.length > 1) {
      const first_two_elements_hashed = sha256(hashesArray[0] + hashesArray[1]);
      hashesArray.push(first_two_elements_hashed);
      hashesArray.splice(0, 2);
    }
  }
  console.log("lastHash :", hashesArray.toString());
});
