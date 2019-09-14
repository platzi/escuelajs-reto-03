/*

0. Clonar proyecto

1. Encontrar los errores

2. Cambiar la sintaxis a ES6

3. Hacer uso de promesas para cambiar los callbacks
*/
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();


const fetchData = url_api => {
 
  return new Promise( (resolve, reject) => {
    xhttp.onreadystatechange =  (event)  => {
      
      if (xhttp.readyState === 4) {
        
        if (xhttp.status === 200) resolve(xhttp.responseText);
        else reject(xhttp.status);
      }
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();})
};

const execute = async () => {
  console.log('Primer LLamado...')
  const data1 = JSON.parse(await fetchData(API))

  const data2Url  =  `${API}${data1.results[0].id}`
  console.log('Segundo Llamado...')
  const data2 = JSON.parse(await fetchData(data2Url))

  const data3 = JSON.parse(await fetchData(data2.origin.url))
  console.log('Tercer Llamado...')
  console.log('Tercero Llamado...')
  console.log(`Personajes: ${data1.info.count}`);
  console.log(`Primer Personaje: ${data2.name}`);
  console.log(`Dimensión: ${data3.dimension}`);
}

execute()