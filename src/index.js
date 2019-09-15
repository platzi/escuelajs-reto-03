const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

function fetchData(url_api) {
  return new Promise ((resolve, reject) => {
    xhttp.onreadystatechange = (event) => {
      if (xhttp.readyState === 4 && xhttp.status == 200) {
        resolve(JSON.parse(xhttp.responseText))
      }
    }
    xhttp.open('GET', url_api, false);
    xhttp.send();
    reject(onError)
  })
};

fetchData(API)
  .then(data1 => {
  console.log('Primer Llamado...')
  Personajes = data1
  return fetchData(API + data1.results[0].id)
})
.then(data2 => {
  console.log('Segundo Llamado...')
  id = data2
  return fetchData(data2.origin.url)
})
.then(data3 => {
  console.log('Tercero Llamado...')
  console.log(`Personajes: ${Personajes.info.count}`);
  console.log(`Primer Personaje: ${id.name}`);
  console.log(`Dimensión: ${data3.dimension}`);
  })
  .catch(onError => {
    return console.error(`Error ${onError}`);
  })

