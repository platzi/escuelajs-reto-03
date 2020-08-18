var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

const fetchData = (url_api) => {
  const promise = new Promise((resolve,reject) => {
    xhttp.onreadystatechange = (() => {
      if (xhttp.readyState === 4) { 
        (xhttp.status == 200)        
         ? resolve(JSON.parse(xhttp.responseText))
         : reject (new Error ('Error ', url_api)) 
      }
    });
    xhttp.open('GET', url_api, false);
    xhttp.send();
  });
  return promise;
};

var data1;
var data2;

fetchData(API)
  .then(data => {
    console.log('Primer llamado');
    data1 = data;
    return fetchData(`${API}${data.results[0].id}`)
  })
  .then(data => {
    console.log("Segundo llamado...");
    data2 = data;
    return fetchData(data.origin.url)
  })
  .then(data => {
    console.log('Tercer llamado...');
    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.name}`);
    console.log(`Dimensión: ${data.dimension}`);
  })
  .catch(err => console.error(err));