const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = "https://rickandmortyapi.com/api/character/";
const xhttp = new XMLHttpRequest();

function fetchData(url_api, values = null) {
  return new Promise((resolve, rejected) => {
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          let response = JSON.parse(xhttp.responseText);
          if (values === null) {
            values = [];
          }
          resolve([response, values]);
        } else rejected(url_api);
      }
    };
    xhttp.open("GET", url_api, false);
    xhttp.send();
  });
}

fetchData(API)
  .then(data => {
    let respuesta = data[0]
    let acum = data[1];
    acum.push(respuesta);
    console.log("Primer Llamado...");
    return fetchData(`${API}${respuesta.results[0].id}`, acum);
  })
  .then(data => {
    let respuesta = data[0]
    let acum = data[1];
    acum.push(respuesta);
    console.log("Segundo Llamado...");
    return fetchData(respuesta.origin.url, acum);
  })
  .then(data => {
    let respuesta = data[0]
    let acum = data[1];
    acum.push(respuesta);
    console.log("Tercero Llamado...");
    console.log(`Personajes: ${acum[0].info.count}`);
    console.log(`Primer Personaje: ${acum[1].name}`);
    console.log(`Dimensión: ${acum[2].dimension}`);
  })
  .catch(err => {
    console.log(err);
  });