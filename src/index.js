var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api) {
    const xhttp = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
              resolve(JSON.parse(xhttp.responseText));
          } else {
              reject(xhttp.status);
          }
        }
      };
      xhttp.open('GET', url_api, true);
      xhttp.send(null);
    })
    
};

let numeroDePersonajes;
let personaje;
let dimension;

fetchData(API) 
  .then(data => {
    console.log(`Primer Llamado...`);
    numeroDePersonajes = data.info.count;
    return fetchData(API + data.results[0].id);
  })
  .then(data => {
    console.log(`Segundo Llamado...`);
    personaje = data.name;
    return fetchData(data.origin.url);
  })
  .then(data => {
    console.log(`Tercer Llamado...`);
    dimension = data.dimension

    console.log(`Personajes: ${numeroDePersonajes}`);
    console.log(`Primer Personaje: ${personaje}`);
    console.log(`Dimensión: ${dimension}`);

  })
  .catch(error => {console.log(`Oops... ocurrió un error: ${error}`)})
