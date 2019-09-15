const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const COMPLETED_STATE = 4;
const STATUS_OK = 200;
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

const promiseA = fetchData(API);
const promiseB = promiseA.then(data1 => fetchData(`${API}${data1.results[0].id}`));
const promiseC = promiseB.then(data2 => fetchData(data2.origin.url));

const fetchAllData = async () =>{
  try {
    const dataA = await promiseA;
    const dataB = await promiseB;
    const dataC = await promiseC;
    console.log(`Personajes: ${dataA.info.count}`);
    console.log(`Primer Personaje: ${dataB.name}`);
    console.log(`Dimensión: ${dataC.dimension}`);
  } catch (error) {
    console.error(error);
  }
}

fetchAllData();