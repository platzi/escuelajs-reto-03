var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = "https://rickandmortyapi.com/api/character/";
var info = [];

var xhttp = new XMLHttpRequest();

const fetchData = url_api => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText));
        } else reject(null);
      }
    };

    xhttp.open("GET", url_api, true);
    xhttp.send();
  });
};

fetchData(API)
  .then(data => {
    if (!data) return console.log("Error");
    info.push(data);
    console.log("Primer llamado..");
    return fetchData(API + data.results[0].id);
  })
  .then(data => {
    if (!data) return console.log("Error");
    info.push(data);
    console.log("Segundo Llamado...");
    return fetchData(data.origin.url);
  })
  .then(data => {
    if (!data) return console.log("Error");
    info.push(data);
    console.log("Tercer Llamado...");
    console.log(`Personajes: ${info[0].info.count}`);
    console.log(`Primer Personaje: ${info[1].name}`);
    console.log(`Dimensión: ${info[2].dimension}`);
  });
