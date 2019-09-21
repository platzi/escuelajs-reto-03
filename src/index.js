const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = "https://rickandmortyapi.com/api/character/";
const xhttp = new XMLHttpRequest();

function fetchData(url_api) {
  return new Promise((resolve, rejected) => {
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          let response = JSON.parse(xhttp.responseText);
          resolve(response);
        } else rejected(url_api);
      }
    };
    xhttp.open("GET", url_api, false);
    xhttp.send();
  });
}
let dato1;
let dato2;

fetchData(API)
  .then(data => {
    console.log("Primer Llamado...");
    dato1 = data;
    return fetchData(`${API}${data.results[0].id}`);
  })
  .then(data => {
    console.log("Segundo Llamado...");
    dato2 = data;
    return fetchData(data.origin.url);
  })
  .then(data => {
    console.log("Tercero Llamado...");
    console.log("Personajes:" + " " + dato1.info.count);
    console.log("Primer Personaje:" + " " + dato2.name);
    console.log("Dimensión:" + " " + data.dimension);
  })
  .catch(err => {
    console.log(err);
  });