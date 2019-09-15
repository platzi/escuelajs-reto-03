const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url_api) => {
  const xhttp = new XMLHttpRequest();
  return new Promise( 
    (resolve,reject) => {
      xhttp.onreadystatechange = (event) => {
        if (xhttp.readyState === 4) {
          if (xhttp.status == 200){
            resolve(JSON.parse(xhttp.responseText));
          }else{
            reject(`URL ${url_api} NOT FOUND`);
          }
        }
      }
      xhttp.open('GET', url_api, true);
      xhttp.send();
    }
  );
};

fetchData(API)
  .then(data1 => {
    console.log('Primer Llamado...');
    console.log(`Personajes: ${data1.info.count}`);
    return fetchData(`${API}${data1.results[0].id}`);
  })
  .then(data2 => {
    console.log('Segundo Llamado...')
    console.log(`Primer Personaje: ${data2.name}`);
    return fetchData(data2.origin.url);
  })
  .then(data3 => {
    console.log('Tercero Llamado...')
    console.log(`Dimensión: ${data3.dimension}`);
  })
  .catch(error => console.log(`Error: ${error}`));