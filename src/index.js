/*Fernando Rene Hernandez Garcia */
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

const PERSONAJE = {};

function fetchData(urlApi) {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) resolve(JSON.parse(xhttp.responseText));
        else reject(urlApi);
      }
    };
    xhttp.open('GET', urlApi, false);
    xhttp.send();
  });
}

function imprimeError(error) {
  console.log(error);
}

fetchData(API)
  .then((data) => {
    console.log('Primer Llamado...');
    PERSONAJE.numPersonajes = data.info.count;
    return fetchData(API + data.results[0].id);
  })
  .then((data2) => {
    console.log('Segundo Llamado...');
    PERSONAJE.nombre = data2.name;
    return fetchData(data2.origin.url);
  })
  .then((data3) => {
    PERSONAJE.dimension = data3.dimension;
    console.log('Tercero Llamado...');
    console.log(`Personajes: ${PERSONAJE.numPersonajes}`);
    console.log(`Primer Personaje: ${PERSONAJE.nombre}`);
    console.log(`Dimensión: ${PERSONAJE.dimension}`);
  })
  .catch(imprimeError);
