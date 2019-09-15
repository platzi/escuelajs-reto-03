var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var API = 'https://rickandmortyapi.com/api/character/';
var resultados = {};

const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = (event) => {
        if (xhttp.readyState === 4) {
          if (xhttp.status == 200){
            resolve (JSON.parse(xhttp.responseText));
          } else {
            reject (url_api);
          }
        }
      }
      xhttp.open('GET', url_api, true);
      xhttp.send(null);
    });   
}

fetchData(API)
  .then ( resultado => {
    console.log(`Primer Llamado...`);
    resultados.res1 = resultado;
    return fetchData(`${API}${resultado.results[0].id}`);
  })
  .then( resultado2 => {
    console.log(`Segundo Llamado...`);
    resultados.res2 = resultado2;
    return fetchData(`${resultado2.origin.url}`);
  })
  .then ( resultado3 => {
    console.log(`Tercer Llamado...`);
    console.log(`Personajes: ${resultados.res1.info.count}`);
    console.log(`Primer Personaje: ${resultados.res2.name}`); 
    console.log(`Dimensión: ${resultado3.dimension}`);
  }).catch(error => {
    console.log(`Error: ${error}`);
  });

 
