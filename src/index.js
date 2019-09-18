var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
let xhttp = new XMLHttpRequest();

// const fetchData = (url_api, callback) => {
//   xhttp.onreadystatechange = (event) => {
//     if (xhttp.readyState === 4) {
//       if (xhttp.status === 200) {
//         callback(null, JSON.parse(xhttp.responseText));
//       }
//       else {
//         return callback(url_api);
//       }
//     }
//   };
//   xhttp.open('GET', url_api, false);
//   xhttp.send();
// };

function fetchData (url_api, callback){
  return new Promise( (resolve, reject) => {
    xhttp.onreadystatechange = (event) => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText));
        }
      }
    }
  })
}

function onError(error){
  console.error('Error' + ' ' + error);
}

fetchData(API)
  .then (data1 => {
    console.log('Primer Llamado...')
    return fetchData(`${API} ${data1.results[0].id}`)
  })
  .then (data2 => {
    console.log('Segundo Llamado...')
    return fetchData(data2.origin.url)
  })
  .then (data3 => {
    console.log('Tercero Llamado...')
    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  })
  .catch(onError)

// fetchData(API, function (error1, data1) {
//   if (error1) return console.error('Error' + ' ' + error1);
//   console.log('Primer Llamado...')
//   fetchData(`${API} ${data1.results[0].id}`, function (error2, data2) {
//     if (error2) return console.error(error1);
//     console.log('Segundo Llamado...')
//     fetchData(data2.origin.url, function (error3, data3) {
//       if (error3) return console.error(error3);
//       console.log('Tercero Llamado...')
//       console.log(`Personajes: ${data1.info.count}`);
//       console.log(`Primer Personaje: ${data2.name}`);
//       console.log(`Dimensión: ${data3.dimension}`);
//     });
//   });
// });