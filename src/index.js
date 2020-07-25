const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api) {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url_api, true);
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState === 4) {
        (xhttp.status === 200)
        ? resolve(JSON.parse(xhttp.responseText))
        : reject(new Error('error ', url_api));
      }
    };
    xhttp.send();
  })
};

fetchData(API)
  .then(data1 => {
    console.log('Primer Llamado...')
    console.log(`Personajes: ${data1.info.count}`);
    return fetchData(`${API}${data1.results[0].id}`)
  })
  .then(data2 => {
    console.log('Segundo llamado...')
    console.log(`Primer Personaje: ${data2.name}`);
    return fetchData(data2.origin.url)
  })
  .then(data3 => {
    console.log('Tercer llamado...')
    console.log(`Origen: ${data3.dimension}`);
  })
  .catch(err => console.error(err))
