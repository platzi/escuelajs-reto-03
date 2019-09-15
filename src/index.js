var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = `https://rickandmortyapi.com/api/character/`;
var xhttp = new XMLHttpRequest();

fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200)
        resolve(JSON.parse(xhttp.responseText));
      else
        reject(url_api)
    };
    xhttp.open(`GET`, url_api, false);
    xhttp.send();

  })
};

let infoCount = 0;
let name = '';
let dimension = '';

fetchData(API)
  .then(data => { console.log(`Primer Llamado...`); infoCount = data.info.count; return fetchData(API + data.results[0].id) })
  .then(data => { console.log(`Segundo Llamado...`); name = data.name; return fetchData(data.origin.url) })
  .then(data => {
    console.log(`Tercero Llamado...`); dimension = data.dimension
    console.log(`Personajes: ${infoCount}`);
    console.log(`Primer Personaje: ${name}`);
    console.log(`Dimensión: ${dimension}`);
  })
  .catch(error => { console.log(`Error: ${error}`) });
