## DESCRIPTION

Nombre:
Usuario Platzi:Juan Daniel Rios Ramirez Usuario Platzi: JuanDanielRR |Juan Rios[C5]

## Ciudad
- [ ] Ciudad de México
- [x] Bogotá

# Retos:
  - [ ] Primer problema
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';


function fetchData(url_api, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', url_api, true);
  xhttp.onreadystatechange = function (event) {
    if (xhttp.readyState === 4){
      if (xhttp.status === 200){
        callback(null, JSON.parse(xhttp.responseText));
      } else {
        const error = new Error('Error' + url_api)
        return callback(error, null);
      }
    }
  }
  xhttp.send();
}

fetchData(API, function (error1, data1){
  console.log('Primer Llamado...') 
  if (error1) return console.error('Error' + ' ' + error1);
  fetchData(API + data1.results[0].id, function (error2, data2) {
    console.log('Segundo Llamado...')
    if (error2) return console.error(error2);
    fetchData(data2.origin.url, function (error3, data3) {
      console.log('Tercero Llamado...')
      if (error3) return console.error(error3);
      console.log('Personajes:' + ' ' + data1.info.count);
      console.log('Primer Personaje:' + ' ' + data2.name);
      console.log('Dimensión:' + ' ' + data3.dimension);
    })
  })
}) 
  
  
  - [ ] Segundo problema
  
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';

fetchData = (url_api, callback) => {
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', url_api, true);
  xhttp.onreadystatechange = (event) => {
    if (xhttp.readyState === 4){
      if (xhttp.status === 200){
        callback(null, JSON.parse(xhttp.responseText));
      } else {
        const error = new Error(`Error ${url_api}`)
        return callback(error, null);
      }
    }
  }
  xhttp.send();
}

fetchData(API,  (error1, data1) => { 
  console.log('Primer Llamado...') 
  if (error1) return console.error(`Error ${error1}`);
  fetchData(API + data1.results[0].id,  (error2, data2) => {
    console.log('Segundo Llamado...')
    if (error2) return console.error(`Error ${error2}`);
    fetchData(data2.origin.url, (error3, data3) => {
      console.log('Tercero Llamado...')
      if (error3) return console.error(`Error ${error3}`);
      console.log(`Personajes: ${data1.info.count}`);
      console.log(`Primer Personaje: ${data2.name}`);
      console.log(`Dimensión: ${data3.dimension}`);
    })
  })
})
  - [ ] Tercer problema
  
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url_api) => {
  return new Promise ((resolve, reject) =>{
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url_api, true);
    xhttp.onreadystatechange = (() => {
    if (xhttp.readyState === 4){
      (xhttp.status === 200)
        ? resolve(JSON.parse(xhttp.responseText))
        : reject (new Error(`Error ${url_api}`))
      }
    });
    xhttp.send();
  });
}


fetchData(API)
  .then(data => {
    console.log('Primer Llamado...') ;
    console.log(data.info.count);
    return fetchData(`${API} ${data.results[0].id}`);
  })
  .then(data =>{
    console.log('Segundo Llamado...');
    console.log(data.name);
    return fetchData(data.origin.url);
  })
.then(data =>{
  console.log('Tercero Llamado...');  
  console.log(data.dimension);
})
.catch(err => console.error(err));
