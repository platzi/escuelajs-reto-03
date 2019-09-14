const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();


const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = (event) => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200)
          resolve(xhttp.responseText);
        else
          reject(url_api);
      }
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();
  });
}

const obtenerPersonaje = (id) => {
  return fetchData(`${API}${id}`);
}


const llamadoDatos = async () => {
  console.log('Primer Llamado...');
  let data1 = await fetchData(API);
  data1 = JSON.parse(data1);
  console.log('Segundo Llamado...');
  let data2 = await obtenerPersonaje(data1.results[0].id);
  data2 = JSON.parse(data2);
  let data3 = await fetchData(data2.origin.url);
  data3 = JSON.parse(data3);
  console.log('Tercero Llamado...')
  console.log(`Personajes: ${data1.info.count}`);
  console.log(`Primer Personaje: ${data2.name}`);
  console.log(`Dimensión: ${data3.dimension}`);
}

llamadoDatos();