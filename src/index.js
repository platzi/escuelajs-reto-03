var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = "https://rickandmortyapi.com/api/character/";
var xhttp = new XMLHttpRequest();

async function fetchData(url_api) {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState === 4) {
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

async function obtenerInformacion() {
  try {
    let personajes = await fetchData(API);
    let primerPersonaje = await fetchData(API + personajes.results[0].id);
    let dimension = await fetchData(primerPersonaje.origin.url);
    console.log(`Personajes: ${personajes.info.count}`);
    console.log(`Primer Personaje: ${primerPersonaje.name}`);
    console.log(`Dimensión: ${dimension.dimension}`);
  } catch (error) {
    console.log(`Dimensión: ${error}`);
  }
}

obtenerInformacion();
