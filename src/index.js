const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText));
        } else reject(url_api);
      }
    };
    xhttp.open('GET', url_api);
    xhttp.send();
  });
};

const renderData = async () => {
  try {
    console.log(`Primer llamado con cambios`);
    let data1 = await fetchData(API);
    console.log(data1.results[0].id);
    console.log('Segundo llamado...');
    let data2 = await fetchData(API);
    console.log(data2.results[0].url);
    console.log('Tercer llamado');
    let data3 = await fetchData(API);
    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.results[0].name}`);
    console.log(`Dimensión: ${data3.results[0].location.name}`);
  } catch (error) {
    console.error(`Error al consultar los datos`, error);
  }
};

renderData();
