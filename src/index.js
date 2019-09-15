//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = "https://rickandmortyapi.com/api/character/";
var xhttp = new XMLHttpRequest();

fetchData = url_api => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState == 4) {
        if (xhttp.status == 200) resolve(JSON.parse(xhttp.responseText));
        else return reject(url_api);
      }
    };
    xhttp.open("GET", url_api, false);
    xhttp.send();
  });
};

var count = "";
var name = "";

fetchData(API)
  .then(data => {
    console.log("Primer Llamado...");
    count = data.info.count;
    return fetchData(API + data.results[0].id);
  })
  .then(data => {
    console.log("Segundo llamado...");
    url = data.origin.url;
    name = data.name;
    return fetchData(url);
  })
  .then(data => {
    console.log(`Tercero Llamado...`);
    console.log(`Personajes: ${count} `);
    console.log(`Primer Personaje: ${name}`);
    console.log(`Dimensión: ${data.dimension}`);
  })
  .catch(error => {
    console.log("Ocuarrio algo");
  });
