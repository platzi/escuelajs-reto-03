const API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url_api, true);
    xhttp.send();
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          resolve(JSON.parse(xhttp.responseText));
        } else reject(url_api);
      }
    };
  });
}

fetchData(API)
  .then(data1 => {
    console.log(`Primer llamado... 
Personajes: ${data1.info.count}`);
    return fetchData(API + data1.results[0].id);
  })
  .then(data2 => {
    console.log(`Segundo llamado...
Primer personaje: ${data2.name}`);
    return fetchData(data2.origin.url);
  })
  .then(data3 => {
    console.log(`Tercer llamado...
Dimensión: ${data3.dimension}`);
  })
  .catch(err => {
    console.error(`Error ${err}`);
  });