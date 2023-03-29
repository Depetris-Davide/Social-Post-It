let fs = require('fs')

function addElementToJSON(jsonData, element) {
  jsonData.unshift(element)
}

function writeFileJSON(file, dataJSON) {
  fs.writeFile(file, JSON.stringify(dataJSON), (err) => {
    if (err) {
      throw err;
    }
  })
}

function readFileParsed(percorsoFile) {
  var data;
  data = fs.readFileSync(percorsoFile, "utf8", (err, dati) => {
    if (err) {
      console.error(err);
      return;
    } else {
      return dati;
    }
  });
  return JSON.parse(data);
}

function readFile(percorsoFile) {
  var data;
  data = fs.readFileSync(percorsoFile, "utf8", (err, dati) => {
    if (err) {
      console.error(err);
      return;
    } else {
      return dati;
    }
  });
  return data;
}

module.exports = { addElementToJSON, writeFileJSON, readFile, readFileParsed }