const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const STATUS_OK = 200;
const COMPLETED_STATE = 4;
const API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url_api) => {
  const xhttp = new XMLHttpRequest();
  return new Promise( 
    (resolve,reject) => {
      xhttp.onreadystatechange = (event) => {
        if(xhttp.readyState === COMPLETED_STATE){
          xhttp.status === STATUS_OK 
          ? resolve(JSON.parse(xhttp.responseText))
          : reject(`ERROR - URL: ${url_api}`);
        }
      }
      xhttp.open('GET', url_api, true);
      xhttp.send();
    }
  );
};

const fetchAllData = async () =>{
  try {
    const dataA = await fetchData(API);
    console.log('Primer Llamado...')
    const dataB = await fetchData(`${API}${dataA.results[0].id}`);
    console.log('Segundo Llamado...')
    const dataC = await fetchData(dataB.origin.url);
    console.log('Tercero Llamado...')
    console.log(`Personajes: ${dataA.info.count}`);
    console.log(`Primer Personaje: ${dataB.name}`);
    console.log(`Dimensión: ${dataC.dimension}`);
  } catch (error) {
    console.error(error);
  }
}

fetchAllData();