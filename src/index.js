var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

const fetchData = (url_api, callback) => {
  
  xhttp.onreadystatechange = (event) => {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200)
        callback(null, xhttp.responseText);
      else return callback(url_api);
    }
  };
  xhttp.open('GET', url_api, false);
  xhttp.send();
};

var data_req_1 = Object;
var data_req_2 = Object;

const request3 = function (error3, data3) {
  if (error3) return console.error(error3);
  console.log('Tercero Llamado...')
  console.log(`Tercero Lamando...`)


  console.log(`Personajes ${data_req_1.info.count}`)
  console.log(`Primer Personaje: ${data_req_2.name}`)
  console.log(`Dimensión: ${data3.dimension}`)
}

const request2 = function (error2, data2) {
  if (error2){
    console.error(error1);
  } 
  data_req_2 = JSON.parse(data2)
  console.log(data_req_2)
  console.log('Segundo Llamado...')
  console.log(data_req_2.origin)
  fetchData(data_req_2.origin.url, request3);
}

const request1 = function (error1, data1) {

  if (error1){
    console.error('Error' + ' ' + error1);
  } 
  console.log('Primer Llamado...')
  data_req_1 = JSON.parse(data1)

  fetchData(API + data_req_1.results[0].id, request2 );
}
fetchData(API, request1);
