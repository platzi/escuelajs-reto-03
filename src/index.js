// TERCERA PARTE

const API = "https://rickandmortyapi.com/api/character/";

function fetchData(url_api) {
  return new Promise((resolve, reject) => {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url_api, true);
    xhttp.send();
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          resolve(JSON.parse(xhttp.responseText));
        } else reject(url_api);
      }
    };
  });
}

fetchData(API)
  .then(data1 => {
    console.log(`Primer llamado...`);
    console.log(`Personajes: ${data1.info.count}`);
    return fetchData(API + data1.results[0].id);
  })
  .then(data2 => {
    console.log(`Segundo llamado...`);
    console.log(`Primer personaje: ${data2.name}`);
    return fetchData(data2.origin.url);
  })
  .then(data3 => {
    console.log(`Tercer llamado...`);
    console.log(`Dimensión: ${data3.dimension}`);
  })
  .catch(err => {
    console.error(`Error ${err}`);
  });


// SEGUNDA PARTE

// const API = "https://rickandmortyapi.com/api/character/";

// function fetchData(url_api, callback) {
//   var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//   var xhttp = new XMLHttpRequest();

//   xhttp.open("GET", url_api, true);
//   xhttp.send();
//   xhttp.onreadystatechange = event => {
//     if (xhttp.readyState === 4) {
//       if (xhttp.status == 200) {
//         callback(null, JSON.parse(xhttp.responseText));
//       } else return callback(url_api);
//     }
//   };
// }

// fetchData(API, (error1, data1) => {
//   if (error1) return console.error(`Error ${error1}`);
//   console.log(`Primer llamado...`);
//   fetchData(API + data1.results[0].id, (error2, data2) => {
//     if (error2) return console.error(`${error2}`);
//     console.log(`Segundo llamado...`);
//     fetchData(data2.origin.url, (error3, data3) => {
//       if (error3) return console.error(`${error3}`);
//       console.log(`Tercer llamado...`);
//       console.log(`Personajes: ${data1.info.count}`);
//       console.log(`Primer personaje: ${data2.name}`);
//       console.log(`Dimensión: ${data3.dimension}`);
//     });
//   });
// });


// CORREJIDO

// const API = 'https://rickandmortyapi.com/api/character/';

// function fetchData(url_api, callback) {
//   var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//   var xhttp = new XMLHttpRequest();
//   xhttp.open('GET', url_api, true);
//   xhttp.send();
//   xhttp.onreadystatechange = function (event) {
//     if (xhttp.readyState === 4) {
//       if (xhttp.status == 200)
//         callback(null, JSON.parse(xhttp.responseText));
//       else return callback(url_api);
//     }
//   };
// }

// fetchData(API, function (error1, data1) {
//   if (error1) return console.error('Error' + ' ' + error1);
//   console.log('Primer Llamado...')
//   fetchData(API + data1.results[0].id, function (error2, data2) {
//     if (error2) return console.error(error1);
//     console.log('Segundo Llamado...')
//     fetchData(data2.origin.url, function (error3, data3) {
//       if (error3) return console.error(error3);
//       console.log('Tercero Llamado...')
//       console.log('Personajes:' + ' ' + data1.info.count);
//       console.log('Primer Personaje:' + ' ' + data2.name);
//       console.log('Dimensión:' + ' ' + data3.dimension);
//     });
//   });
// });