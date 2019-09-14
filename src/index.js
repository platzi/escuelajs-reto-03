// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api) {

  return new Promise((resolve, reject) => {

    // console.log("Entro a promise...")
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', url_api, true); 
    
    //async: true; El event loop NO se bloquea y no aparece el error de main thread bloqueado
    //async: false; El main thread se bloqueará

    xhttp.onreadystatechange = () => {
      // console.log(xhttp.readyState)
      if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
          // console.log("resolvio el callback")
          return resolve(JSON.parse(xhttp.responseText));
        }
        // console.log("rejected")
        // return resolve(JSON.parse(xhr.responseText));
        return reject(url_api);
      }
    }
    xhttp.send();
  });
}

// xhttp.onreadystatechange = (event) => {
//   if (xhttp.readyState == 4) {
//     if (xhttp.status == 200)
//       callback(null, xhttp.responseText);
//     else return callback(url_api);
//   }
// };

// console.log("Consultare fetchData")
const datas = {};
fetchData(API)
  .then(data1 => {
    datas.data1 = data1;
    return fetchData(`${API}${data1.results[0].id}`)
  })
  .then(data2 => {
    datas.data2 = data2;
    return fetchData(data2.origin.url)
  })
  .then(data3 => {
    datas.data3 = data3;
  })
  .then(()=>{
    console.log(`Personajes: ${datas.data1.info.count}`);
    console.log(`Primer Personaje: ${datas.data2.name}`);
    console.log(`Dimensión: ${datas.data3.dimension}`);
  })

  

// })
// fetchData(API).then(data1 => console.log(`Personajes: ${JSON.parse(data1).info.count}`)) //`${API}${JSON.parse(data1).results[0].id}`).then()
// fetchData(API, function (error1, data1) {
//   if (error1) return console.error(`Error ${error1}`);

//   fetchData(`${API}${JSON.parse(data1).results[0].id}`, (error2, data2) => {
//     if (error2) return console.error(error1);

//     fetchData(JSON.parse(data2).origin.url, (error3, data3) => {
//       if (error3) return console.error(error3);
//       console.log(`Personajes: ${JSON.parse(data1).info.count}`);
//       console.log(`Primer Personaje: ${JSON.parse(data2).name}`);
//       console.log(`Dimensión: ${JSON.parse(data3).dimension}`);
//     });
//   });
// });