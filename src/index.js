var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

function fetchData(url_api, callback) {
  const promise = new Promise((resolve,reject) => {
    xhttp.onreadystatechange = function (event) {
      if (xhttp.readyState === 4) { 
        if (xhttp.status == 200)
        {
          let resp = JSON.parse(xhttp.responseText);
          resolve(resp);
          callback(null, resp);
        }
        else{
          console.error(xhttp.status);
          // return callback(url_api);
          }
      }
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();
  });
  return promise;
};
var data1;
var data2;
fetchData(API,(error,data) => {
   data1 = data;
  console.log('Primer llamado...');
}).then(fetchData(API + data1.results[0].id,(error,data) => {
  console.log("Segundo llamado..");
  data2=data;
})).then(fetchData(data2.origin.url, (error,data3) => {
  console.log("Tercer llamado...")
  console.log(`Personajes: ${data1.info.count}`);
  console.log(`Primer Personaje: ${data2.name}`);
  console.log(`Dimensión: ${data3.dimension}`);
})).catch(onError => {
  console.error(onError);
})

// fetchData(API, (error1, data1) => {
//   if (error1) return console.error('Error' + ' ' + error1);
//   console.log('Primer Llamado...')
//   fetchData(API + data1.results[0].id, function (error2, data2) {
//   if (error2) return console.error(error1);
//     console.log('Segundo Llamado...')
//     fetchData(data2.origin.url, function (error3, data3) {
//       if (error3) return console.error(error3);
//       console.log('Tercero Llamado...')
//       console.log('Personajes:' + ' ' + data1.info.count);
//       console.log(`Personajes: ${data1.info.count}`);
//       console.log(`Primer Personaje: ${data2.name}`);
//       console.log(`Dimensión: ${data3.dimension}`);
//     });
//   });
// });