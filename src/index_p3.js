var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = "https://rickandmortyapi.com/api/character/";

async function fetchData(url_api) {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState == "4") {
        let respuesta = JSON.parse(xhttp.responseText);
        if (xhttp.status == 200) {
          resolve(respuesta);
        } else {
          reject(url_api);
        }
      }
    };
    xhttp.open("GET", url_api, false);
    xhttp.send();
  });
}

async function getData() {
  var data1 = await fetchData(API);
  var data2 = await fetchData(API + data1.results[0].id);
  var data3 = await fetchData(data2.origin.url);
  console.log(`Personajes: ${data1.info.count}`);
  console.log(`Primer Personaje: ${data2.name}`);
  console.log(`Dimensión: ${data3.dimension}`);
}

console.log("\n>>>\tTercer problema\n\n");

getData();
