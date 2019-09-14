var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

console.log('......');

function fetchData(url_api, callback) {
  xhttp.onreadystatechange = function (event) {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200)
        callback(null, xhttp.responseText);
      else return callback(url_api);
    }
  };
  xhttp.open('GET', url_api, false);
  xhttp.send();
};

fetchData(API, function (error1, data1) {
  if (error1) return console.error('Error' + ' ' + error1);
  console.log('Primer Llamado...')
  var dataP = JSON.parse(data1);
  fetchData(API + dataP.results[0].id, function (error2, data2) {
    if (error2) return console.error(error1);
    console.log('Segundo Llamado...')
    data2P = JSON.parse(data2)
    fetchData(data2P.origin.url, function (error3, data3) {
      if (error3) return console.error(error3);
      data3P = JSON.parse(data3)
      console.log('Tercero Llamado...')
      console.log('Personajes:' + ' ' + dataP.info.count);
      console.log('Primer Personaje:' + ' ' + data2P.name);
      console.log('Estado:' + ' ' + data2P.status);
      console.log('Dimensión:' + ' ' + data3P.dimension);
      console.log('Tipo:' + ' ' + data3P.type);
    });
  });
});