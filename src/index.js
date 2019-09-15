const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const API = 'https://rickandmortyapi.com/api/character/'

const xhttp = new XMLHttpRequest()

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      const DONE = 4
      const OK = 200
      if (this.readyState === DONE) {
        if (this.status === OK) {
          resolve(JSON.parse(this.responseText))
        } else {
          reject(new Error(`Error al hacer el request ${this.status}`))
        }
      }
    }
    xhttp.open('GET', url_api, false);
    xhttp.send();
  })
};

// function fetchData(url_api, callback) {
//   xhttp.onreadystatechange =  (event) => {
//     if (xhttp.readyState === 4) {
//       if (xhttp.status == 200) {
//         callback(null, xhttp.responseText);
//       } else {
//         return callback(url_api);
//       }
//     }
//   };
//   xhttp.open('GET', url_api, false);
//   xhttp.send();
// };
fetchData(API)
  .then((response) => {
    console.log(`Personajes: ${response.info.count}`)
    return fetchData(API + response.results[0].id)
  })
  .then((response) => {
    console.log(`Primer Personaje: ${response.name}`)
    return fetchData(response.origin.url)
  })
  .then(response => console.log(`Dimensión: ${response.dimension}`))




/*
fetchData(API, (error1, data1) => {
  if (error1) return console.error('Error' + ' ' + error1);
  console.log('Primer Llamado...')
  data1 = JSON.parse(data1)
  //fetchData(API + data1.results[0].id, function (error2, data2) {
  fetchData(API + "/" + data1.results[0].id,  (error2, data2) => {
    if (error2) return console.error(error2);
    console.log('Segundo Llamado...')
    data2 = JSON.parse(data2)
    fetchData(data2.origin.url,  (error3, data3)=> {
      if (error3) return console.error(error3);
      data3 = JSON.parse(data3)
      console.log('Tercero Llamado...')
      console.log(`Personajes: ${data1.info.count}`);
      console.log(`Primer Personaje: ${data2.name}`);
      console.log(`Dimensión: ${data3.dimension}`);
    });
  });
});
*/


// fetchData(API, (error1, data1) => {
//   if (error1) return console.error('Error' + ' ' + error1);
//   console.log('Primer Llamado...')
//   data1 = JSON.parse(data1)
//   //fetchData(API + data1.results[0].id, function (error2, data2) {
//   fetchData(API + "/" + data1.results[0].id,  (error2, data2) => {
//     if (error2) return console.error(error2);
//     console.log('Segundo Llamado...')
//     data2 = JSON.parse(data2)
//     fetchData(data2.origin.url,  (error3, data3)=> {
//       if (error3) return console.error(error3);
//       data3 = JSON.parse(data3)
//       console.log('Tercero Llamado...')
//       console.log(`Personajes: ${data1.info.count}`);
//       console.log(`Primer Personaje: ${data2.name}`);
//       console.log(`Dimensión: ${data3.dimension}`);
//     });
//   });
// });