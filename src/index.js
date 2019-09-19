var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();
var dataBox = [];

function fetchData(url_api, data){
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = (event) =>{
      if (xhttp.readyState === 4 && xhttp.status == 200){
        resolve(JSON.parse(xhttp.responseText), data);
      } else return reject(url_api);
    }
    xhttp.open('GET', url_api, false);
    xhttp.send();
  })  
}

fetchData(API).then((data1) => {
  console.log(`Primer Llamado...`);
  dataBox.push(data1);
  return fetchData(API + data1.results[0].id, data1);
}).catch((error1) => {
  console.error(`Error ${error1}`);
})
.then((data2) => {
  console.log(`Segundo Llamado...`);
  dataBox.push(data2);
  return fetchData(data2.origin.url);
}).catch((error2) => {
  console.error(`${error2}`);
})
.then((data3) => {
  console.log(`Tercer Llamado...`);
  console.log(`Personajes: ${dataBox[0].info.count}`);
  console.log(`Primer Personaje: ${dataBox[1].name}`);
  console.log(`Dimensión: ${data3.dimension}`);
}).catch((error3) => {
  console.error(`${error3}`);
})