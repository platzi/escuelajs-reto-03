var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

function fetchData(url_api) {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200){
          resolve(JSON.parse(xhttp.responseText));
        }
        else {
          reject(url_api)
        }
      }
    }

    xhttp.open('GET', url_api, false);
    xhttp.send();

  })
};

fetchData(API)
.then(function (data1) {
  console.log('Primer Llamado...')
  fetchData(API + data1.results[0].id)
  .then(function (data2) {
    console.log('Segundo Llamado...')
    fetchData(data2.origin.url)
    .then(function (data3) {
      console.log('Tercero Llamado...')
      console.log(`Personajes: ${data1.info.count}`);
      console.log(`Primer Personaje: ${data2.name}`);
      console.log(`Dimensión: ${data3.dimension}`);
  })
  })
})
.catch(function (URL) {
  console.log('Hola tienes un error');
});