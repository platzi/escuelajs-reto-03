var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api, callback) {
  let xhttp = new XMLHttpRequest();
  xhttp.open('GET', url_api, true);
  //Escucha un cambio
  xhttp.onreadystatechange = function (event) {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200){
        // callback(error, response)
        //Se parse a un json, sino solo regresaria un string
        callback(null, JSON.parse(xhttp.responseText));
      }
      else {
        // Instanciamos el error como un nuevo objeto
        const error = new Error('Error ' + url_api);
        return callback(error, null);
      }
    }
  };
  xhttp.send();
};

fetchData(API, function (error1, data1) {
  if (error1) return console.error('Error' + ' ' + error1);
  console.log('Primer Llamado...')
  fetchData(API + data1.results[0].id, function (error2, data2) {
    if (error2) return console.error(error1);
    console.log('Segundo Llamado...')
    fetchData(data2.origin.url, function (error3, data3) {
      if (error3) return console.error(error3);
      console.log('Tercero Llamado...')
      console.log('Personajes:' + ' ' + data1.info.count);
      console.log('Primer Personaje:' + ' ' + data2.name);
      console.log('Dimensión:' + ' ' + data3.dimension);
    });
  });
});