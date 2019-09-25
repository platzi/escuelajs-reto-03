var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();



function fetchData(url_api, callback) {
  xhttp.onreadystatechange =  () => {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200)
        callback(null, xhttp.responseText);
      else return callback(url_api);
    }
  };
  xhttp.open('GET', url_api, false);
  xhttp.send();
}

const information = async()=> {
//  try{
  try{
  let datos1; 
  await fetchData(API,  (error1, data1) => {
    datos1 = JSON.parse(data1);
    return datos1;
  });
    console.log('Primer Llamado...');

  let datos2; 
  await fetchData(API+datos1.results[0].id,  (error1, data2) => {
    datos2 = JSON.parse(data2);
    return datos2;
  });
  console.log('Segundo  Llamado...');
  
  let datos3; 
  await fetchData(datos2.origin.url,  (error1, data3) => {
    datos3 = JSON.parse(data3);
    return datos3;
  });
  console.log('Tercer  Llamado...');
  console.log('El numero de Personajes son:' + ' ' + datos1.info.count);
  console.log('Primer Personaje:' + ' ' + datos2.name);
  console.log('Dimensión:' + ' ' + datos3.dimension);
  }
  catch(error) {
    console.log('Tenemos un error en los llamados')
  }
}

information()

