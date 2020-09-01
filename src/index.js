//let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require("node-fetch");
let API = "https://rickandmortyapi.com/api/character/";
//let xhttp = new XMLHttpRequest();

//Solucion primer problema

// function fetchData(url_api, callback) {
//   xhttp.onreadystatechange = function (event) {
//     if (xhttp.readyState === 4) {
//       if (xhttp.status == 200) return callback(null, xhttp.responseText);
//       else return callback(url_api);
//     }
//   };
//   xhttp.open("GET", url_api, false);
//   xhttp.send();
// }

// fetchData(API, function (error1, data1) {
//   if (error1) return console.error("Error" + " " + error1);
//   console.log("Primer Llamado...");
//   //console.log(data1);
//   //Parseamos la respuesta del servidor a un objeto JSON
//   data1 = JSON.parse(data1);
//   //console.log(data1.results);
//   fetchData(API + data1.results[0].id, function (error2, data2) {
//     if (error2) return console.error(error1);
//     console.log("Segundo Llamado...");
//     //Parseamos la respuesta del servidor a un objeto JSON
//     data2 = JSON.parse(data2);
//     fetchData(data2.origin.url, function (error3, data3) {
//       if (error3) return console.error(error3);
//       console.log("Tercero Llamado...");
//       console.log("Personajes:" + " " + data1.info.count);
//       console.log("Primer Personaje:" + " " + data2.name);
//       console.log("Dimensión:" + " " + data3.dimension);
//     });
//   });
// });

const fetchPromise = fetch(API);
fetchPromise
  .then((response) => {
    return response.json(); //Primer llamada
  })
  .then((data) => {
    console.log("Primer llamado...");
    return data;
  })
  .then((data1) => {
    fetch(API + data1.results[0].id)
      .then((data2) => {
        console.log("Segundo llamado...");
        return data2.json(); //Segunda llamada
      })
      .then((data3) => {
        fetch(data3.origin.url)
          .then((response3) => {
            return response3.json();
          })
          .then((data4) => {
            console.log("Tercero Llamado...");
            console.log(`Personajes: ${JSON.stringify(data1.info)}`);
            console.log(`Primer Personaje: ${data3.name}`);
            console.log(`Dimensión: ${data4.dimension}`);
          });
      });
  });
