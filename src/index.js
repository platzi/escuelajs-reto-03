const API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api) {
  return new Promise((resolve, reject) => {
    let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', url_api, true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          resolve(JSON.parse(xhttp.responseText));
        } else {
          reject(url_api);
        }
      }
    };
  });
}

function onError(err) {
  console.log(err);
  console.log(`Sucedió un error al obtener la información ${err}`);
}

fetchData(API)
  .then(data1 => {
    console.log('Primer Llamado...');
    console.log(`Personajes: ${data1.info.count}`);
    return fetchData(`${API}${data1.results[0].id}`);
  })
  .then(data2 => {
    console.log('Segundo Llamado...');
    console.log(`Primer Personaje: ${data2.name}`);
    return fetchData(data2.origin.url);
  })
  .then(data3 => {
    console.log('Tercero Llamado...');
    console.log(`Dimensión: ${data3.dimension}`);
  })
  .catch(onError);
