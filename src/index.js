const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = "https://rickandmortyapi.com/api/character/";

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (event) => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          return resolve(JSON.parse(xhttp.responseText));
        } else {
          const err = new Error(`Error ${url_api}`);
          return reject(err);
        }
      }
    };
    xhttp.open("GET", url_api, false);
    xhttp.send();
  });
};
fetchData(API)
  .then((data) => {
    let count = data.info.count;
    let id = data.results[0].id;
    console.log(`Personajes: ${count}`);
    return fetchData(`${API}${id}`);
  })
  .then((data) => {
    let name = data.name;
    console.log(`Primer Personaje: ${name}`);
    return fetchData(data.origin.url);
  })
  .then((data) => {
    let dimension = data.dimension;
    console.log(`Dimensión: ${data.dimension}`);
  })
  .catch((err) => console.log(err));
