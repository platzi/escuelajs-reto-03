//Iraida Mercedes Barreto Díaz
//20190918

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; //importar modulo XMLHttpRequest

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();


function fetchData (API_URL) {
  return new Promise (function (resolve, reject){
  
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200){
          resolve(JSON.parse(xhttp.responseText));
        }
        else {
          return reject(API_URL);
        }
      }
    };

    xhttp.open('GET', API_URL, false);
    xhttp.send();
  })  
}

function onError(API){
  console.log(`ocurrió un error en la traía de datos ${API}`)
}

fetchData (API)
  .then (characters => {
    console.log(`Personajes: ${characters.info.count}`)
    console.log(`Primer personaje: ${characters.results[0].name}`)
    return fetchData (characters.results[0].origin.url) 
  })
  .then (dimensions =>{
    console.log(`Dimensión: ${dimensions.dimension}`)
  }) 
  .catch(onError)