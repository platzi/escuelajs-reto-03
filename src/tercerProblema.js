//Reto: hacer uso de PROMESAS para evitar Callback Hell
//Versión trabajada apartir del segundo problema

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

const fetchData = url_api => {
  return new Promise( (resolve, reject) => {//Se define la promesa
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText));//Se hace el llamado a resolve
        }
        else{
          reject(url_api);//Se llama a reect en caso de error
        }
      }
    }
    xhttp.open('GET', url_api, false);
    xhttp.send(null);
  });
};

fetchData(API)
  .then( data1 => { //Resutado 1ra promesa
    console.log('Primer Llamado...');
    console.log(`Personajes: ${data1.info.count}`);
    return fetchData(API + data1.results[0].id); //Llamado 2da promesa
  })
  .then( data2 => {//Resultado 2da promesa
    console.log('Segundo Llamado...');
    console.log(`Primer Personaje: ${data2.name}`);
    return fetchData(data2.origin.url)//Llamado a 3ra promesa
  })
  .then( data3 => {//Resultado 3ra promesa
    console.log('Tercer Llamado...');
    console.log(`Dimensión: ${data3.dimension}`);
  })
  .catch( error1 => {//Caso de error
    console.error(`Error ${error1}`);
  })