const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api, callback) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200) {
        const data = JSON.parse(xhttp.responseText);
        callback(null, data);
      } else {
        return callback(xhttp.status);
      }
    }
  };
  xhttp.open('GET', url_api, false);
  xhttp.send(null);
}

fetchData(API, (error1, data1) => {
  if (error1) return console.error(`Error 1 ${error1}`);
  console.log(`Primer llamado`);

  fetchData(API + data1.results[0].id, (error2, data2) => {
    if (error2) return console.error(error2);
    console.log(`Segundo llamado`);

    fetchData(data2.origin.url, (error3, data3) => {
      if (error3) return console.error(error3);
      console.log(`Tercero Llamado...`);
      console.log(`Personajes: ${data1.info.count}`);
      console.log(`Primer Personaje: ${data2.name}`);
      console.log(`Dimensión: ${data3.dimension}`);
    });
  });
});

/* var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200) {
        const results = JSON.parse(xhttp.responseText);
        callback(null, results);
      } else {
        return callback(url_api);
      }
    }
  };
  xhttp.open('GET', url_api, false);
  xhttp.send(null);
}

fetchData(API, function(error1, data1) {
  if (error1) {
    return console.error('Error' + ' ' + error1);
  }
  console.log('Primer Llamado...');
  fetchData(API + data1.results[0].id, function(error2, data2) {
    if (error2) return console.error(error1);
    console.log('Segundo Llamado...');
    fetchData(data2.origin.url, function(error3, data3) {
      if (error3) return console.error(error3);
      console.log('Tercero Llamado...');
      console.log('Personajes:' + ' ' + data1.info.count);
      console.log('Primer Personaje:' + ' ' + data2.name);
      console.log('Dimensión:' + ' ' + data3.dimension);
    });
  });
}); */
