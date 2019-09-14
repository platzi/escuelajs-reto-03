const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = (event) => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          resolve(JSON.parse(xhttp.responseText));
        }
        else {
          reject({
            status: xhttp.status,
            statusText: xhttp.statusText
          });
        }
      }
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();
  })
};

const onError = (err) => console.error(`Error: ${err}`);

let personajes, primerPersonaje, dimension;

fetchData(API)
  .then( data1 => {
      console.log('Primer Llamado...');
      personajes = data1;
      return fetchData(API + data1.results[0].id);
    }
  )
  .then( data2 => {
      console.log('Segundo Llamado...');
      primerPersonaje = data2;
      return fetchData(data2.origin.url);
    }
  )
  .then( data3 => {
      console.log('Tercero Llamado...');
      dimension = data3; 
      console.log(`Personajes: ${personajes.info.count}`);
      console.log(`Primer Personaje: ${primerPersonaje.name}`);
      console.log(`Dimensión: ${dimension.dimension}`);
    }
  )
  .catch(onError)