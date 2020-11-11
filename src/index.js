let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    xhttp.open('GET', url_api, false);
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200)
          resolve(JSON.parse(xhttp.responseText));
        else reject(new Error('Error ', url_api))
      }
    };
    xhttp.send();
  })
};

fetchData(API)
  .then(data => {
    console.log(`Personajes: ${data.info.count}`);
    return fetchData(`${API}${data.results[0].id}`);
  })
  .then(data => {
    console.log(`Primer Personaje: ${data.name}`);
    return fetchData(data.origin.url)
  })
  .then(data => {
    console.log(`Dimensión: ${data.dimension}`);
  })
  .catch(error => console.error('Error', error));