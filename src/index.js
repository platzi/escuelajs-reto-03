var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

const promiseFetchData = (url_api) => {
  return new Promise((resolve, reject) => {
     xhttp.onreadystatechange = (event) => {
        if (xhttp.readyState === 4) {
          if (xhttp.status == 200)
            resolve(JSON.parse(xhttp.responseText));
          else reject(url_api);
        }
      };

      xhttp.open('GET', url_api, false);
      xhttp.send();
    });
  }


const llamados = async () => {
  const responseOne = await promiseFetchData(API);
  console.log('Primer Llamado...')
  const responseTwo = await promiseFetchData(`${API}${responseOne.results[0].id}`);
  console.log('Segundo Llamado...')
  const responseThree = await promiseFetchData(responseTwo.origin.url);
  console.log('Tercero Llamado...')
  console.log(`Personajes: ${responseOne.info.count}`);
  console.log(`Primer Personaje: ${responseTwo.name}`);
  console.log(`Dimensión: ${responseThree.dimension}`);
}

llamados();
