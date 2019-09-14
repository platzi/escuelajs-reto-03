const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();


const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = (event) => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText));
        }
        else
          reject(url_api);
      }
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();
  });
}

const llamadoDatos = async () => {
  try {
    console.log('Primer Llamado...');
    let data1 = await fetchData(API);
    console.log('Segundo Llamado...');
    let data2 = await fetchData(`${API}${data1.results[0].id}`);
    console.log('Tercero Llamado...')
    let data3 = await fetchData(data2.origin.url);
    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  } catch (error) {
    console.error(`Error al consultar los datos`, error);
  }
}

llamadoDatos();