var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api, callback) {
  // Se cambio la variable var por const
  const request = new XMLHttpRequest();
  request.onreadystatechange = function(event) {
    if (request.readyState === 4) {
      if (request.status === 200) callback(null, request.responseText);
      else return callback(url_api);
    }
  };
  request.open('GET', url_api, true);
  request.send();
}

fetchData(API, function(error1, data1) {
  if (error1) return console.error('Error' + ' ' + error1);
  console.log('Primer Llamado...');
  data1 = JSON.parse(data1);
  fetchData(API + data1.results[0].id, function(error2, data2) {
    if (error2) return console.error(error1);
    console.log('Segundo Llamado...');
    data2 = JSON.parse(data2);
    fetchData(data2.origin.url, function(error3, data3) {
      data3 = JSON.parse(data3);
      if (error3) return console.error(error3);
      console.log('Tercero Llamado...');
      console.log('Personajes:' + ' ' + data1.info.count);
      console.log('Primer Personaje:' + ' ' + data2.name);
      console.log('Dimensión:' + ' ' + data3.dimension);
    });
  });
});
