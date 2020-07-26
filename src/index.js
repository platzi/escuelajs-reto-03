let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

let API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    const estado = false;
    xhttp.open('GET', url_api, estado);
    xhttp.onreadystatechange = (() => {
      if(xhttp.readyState === 4) {
        (xhttp.status === 200)
          ? resolve(JSON.parse(xhttp.responseText))
          : reject(new Error(`Error, url_api`))
      }
    });
    xhttp.send();
  });
}

fetchData(API)
  .then((data) => {
    console.log('Primer Llamado...');
    console.log(`Cantidad de personajes: ${data.info.count}`);
    const personaje = 0;
    return fetchData(`${API}${data.results[personaje].id}`)
  })
  .then((data) => {
    console.log('Segundo Llamado...');
    console.log(`Personaje: ${data.name}`);
    return fetchData(data.origin.url)
  })
  .then((data) => {
    console.log('Tercer Llamado...');
    console.log(`Dimensión: ${data.dimension}`);
  })
  .catch(error => console.error(error));