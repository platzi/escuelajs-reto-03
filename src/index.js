const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api) {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          const response = JSON.parse(xhttp.responseText);
          resolve(response);
        } else {
          return reject(xhttp.status);
        }
      }
    };
    xhttp.open('GET', url_api, false);
    xhttp.send(null);
  });
}

const onError = url_api => console.log(`Ups, algo ha salido mal ${url_api}`);

fetchData(API)
  .then(response1 => {
    console.log('Primer Llamado...');
    console.log(`Personajes: ${response1.info.count}`);
    return fetchData(API + response1.results[0].id);
  })
  .then(response2 => {
    console.log('Segundo Llamado...');
    console.log(`Primer Personaje: ${response2.name}`);
    return fetchData(response2.origin.url);
  })
  .then(response3 => {
    console.log('Tercer Llamado...');
    console.log(`Dimensión: ${response3.dimension}`);
  })
  .catch(onError);
