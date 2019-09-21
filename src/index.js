//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = "https://rickandmortyapi.com/api/character/";
var xhttp = new XMLHttpRequest();
//Resolución d elso primeros dos problemas

function fetchData(url_api, callback) {

/*   function status(readyState) {
    switch (readyState) {
      case 0: return 'no inicializado'
      case 1: return 'cargando...'
      case 2: return 'cargado'
      case 3: return 'interactivo'
      case 4: return 'completado'        
    }
    
  }
 */

  xhttp.open("GET", url_api, true);  
  xhttp.send();
  xhttp.onreadystatechange = even => {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200) callback(null, JSON.parse(xhttp.responseText));
          reject(new Error("Algo salió mal."));
    }
  }; 
  
}

function fetchDatapromise(url_api) {
  return new Promise((resolve,reject)=>{

  })
  
}

fetchData(API, function(error1, data1) {
  if (error1) return console.error("Error" + " " + error1);
  console.log("Primer Llamado...");
  fetchData(API + data1.results[0].id, function(error2, data2) {
    if (error2) return console.error(error1);
    console.log("Segundo Llamado...");
    fetchData(data2.origin.url, function(error3, data3) {
      if (error3) return console.error(error3);
      console.log(`Tercero Llamado...`);
      console.log(`Personajes: ${data1.info.count}`);
      console.log(`Primer Personaje: ${data2.name}`);
      console.log(`Dimensión: ${data3.dimension}`);
    });
  });
});
