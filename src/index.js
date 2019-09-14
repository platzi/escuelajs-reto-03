const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

//function fetchData(url_api, callback) {
  const fetchData = (url_api, callback) => {
    xhttp.onreadystatechange = function (event) {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200){
          callback(null, xhttp.responseText);
          //console.log(xhttp.responseText);
        }
        else{
          return callback(url_api);
        } 
      }
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();

  }


fetchData (API, function (error1, data1) {
  if (error1) return console.error('Error' + ' ' + error1);
  console.log('Primer Llamado...')
  let datos1 = JSON.parse(data1); 
  //console.log(data1)
  
  fetchData(API + datos1.results[0].id, function (error2, data2) {
    if (error2) return console.error(error1);
    console.log('Segundo Llamado...')
    datos2 = JSON.parse(data2);
    //console.log(datos2)
    fetchData(datos2.origin.url, function (error3, data3) {
      datos3 = JSON.parse(data3);
      if (error3) return console.error(error3);
      console.log('Tercero Llamado...')
      console.log('Personajes:' + ' ' + datos1.info.count);
      console.log('Primer Personaje:' + ' ' + datos2.name);
      console.log('Dimensión:' + ' ' + datos3.dimension);
    });
  });
});