var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

function fetchData(url_api, callback) {
  xhttp.onreadystatechange =  (event) =>{
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200)
        callback(null, xhttp.responseText);
      else return callback(url_api);
    }
  };
  xhttp.open('GET', url_api, false);
  xhttp.send();
  //console.log(xhttp.responseText)
};

fetchData(API, (error1, data1) =>{
  
   if (error1) return console.error('Error' + ' ' + error1);
   console.log('Primer Llamado...')
   let data=JSON.parse(data1);
   fetchData(API + data.results[0].id, function (error2, data2) {
     let parseData2=JSON.parse(data2);
    if (error2) return console.error(error2);
  
    console.log('Segundo Llamado...')
     fetchData(parseData2.origin.url, (error3, data3) =>{
       let parseData3=JSON.parse(data3)
       if (error3) return console.error(error3);
      console.log('Tercero Llamado...')
      console.log(`Personajes: ${data.info.count}`);
      console.log(`Primer Personaje:${parseData2.name}`);
      console.log(`Dimensión:  ${parseData3.dimension}`);
     });
   });
});