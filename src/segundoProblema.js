//RETO: Convertir código a ES6
//Versión trabajada apartir del primer problema

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

const fetchData = (url_api, callback) => { //cambio a arrow function
  xhttp.onreadystatechange = event => {//cambio a arrow function
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        return callback(null, JSON.parse(xhttp.responseText));
      }
      else{
        return callback(url_api);
      }
    }
  };
  xhttp.open('GET', url_api, false);
  xhttp.send(null);
};

fetchData (API, (error1, data1) => {
  if (error1) {
    return console.error(`Error ${error1}`);//cabio a template string
  }
  console.log('Primer Llamado...')
  fetchData(API + data1.results[0].id, (error2, data2) => {
    if (error2) {
      return console.error(error1);
    }
    console.log('Segundo Llamado...')
    fetchData(data2.origin.url, (error3, data3) => {
      if (error3) {
        return console.error(error3);
      }
      console.log('Tercero Llamado...')
      console.log(`Personajes: ${data1.info.count}`);//cabio a template string
      console.log(`Primer Personaje: ${data2.name}`);//cabio a template string
      console.log(`Dimensión: ${data3.dimension}`);//cabio a template string
    });
  });
});