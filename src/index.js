var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();


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

fetchData(API, (error1, data1) => {
  if (error1) return console.error('Error' + ' ' + error1);
  console.log('Primer Llamado...')
  var json_data1 = JSON.parse(data1)
  fetchData(API + json_data1.results[0].id, (error2, data2) => {
    if (error2) return console.error(error2);
    console.log('Segundo Llamado...')
    var json_data2 = JSON.parse(data2)
    fetchData(json_data2.origin.url, (error3, data3) => {
      if (error3) return console.error(error3);
      console.log('Tercero Llamado...')
      var json_data3 = JSON.parse(data3)
      console.log('Personajes:' + ' ' + json_data1.info.count);
      console.log('Primer Personaje:' + ' ' + json_data2.name);
      console.log('Dimensión:' + ' ' + json_data3.dimension);
    });
  });
});