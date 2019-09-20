var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

const fetchData = (url_api) => {
  return new Promise((resolve, reject)=> {
    xhttp.onreadystatechange = function (event) {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200)
          resolve(JSON.parse(xhttp.responseText));
        else return reject(xhttp.readyState);
      }
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();
  });
};

// fetchData(API)
// .then(data1 => {
//   console.log('Primer Llamado...')
//   let data1Parse = JSON.parse(data1);
//   console.log(`Personajes: ${data1Parse.info.count}`);
//   return fetchData(API + data1Parse.results[0].id);
// }).then(data2 =>  {
//   console.log('Segundo Llamado...')
//   let data2Parse = JSON.parse(data2);
//   console.log(`Primer Personaje ${data2Parse.name}`);
//   return fetchData(data2Parse.origin.url);
// }).then(data3 => {
//   let data3Parse = JSON.parse(data3);
//   console.log(`Dimensión ${data3Parse.dimension}`);
// }).catch((error) => {
//   console.log(`El estado del error es: ${error}`)
// });

async function start() {
  try {
    console.log('Primer Llamado...');
    const data1 = await fetchData(API);
    console.log('Segundo Llamado...')
    const data2 = await fetchData(API + data1.results[0].id);
    console.log('Tercer Llamado...')
    const data3 = await fetchData(data2.origin.url);
    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje ${data2.name}`);
    console.log(`Dimensión ${data3.dimension}`);
  } catch (error) {
    console.log(`El estado del error es: ${error}`)
  }
}

start();