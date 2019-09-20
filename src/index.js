var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = "https://rickandmortyapi.com/api/character/";
var xhttp = new XMLHttpRequest();

function fetchData(url_api, callback) {
  xhttp.onreadystatechange = function(event) {
    // comprobar que tipo de dato regresa
    //console.log("tipo de dato: ", xhttp.readyState);
    //cambiamos a 4 entero ya que el === comprueba el tipo de dato
    if (xhttp.readyState === 4) {
      //se comprueba que tipo de respuesta esta regresando
      //console.log("respuesta: ", xhttp.responseText);
      let respuesta = JSON.parse(xhttp.responseText);
      if (xhttp.status == 200) callback(null, respuesta);
      else return callback(url_api);
    }
  };
  xhttp.open("GET", url_api, false);
  xhttp.send();
}

fetchData(API, function(error1, data1) {
  if (error1) return console.error("Error" + " " + error1);
  console.log("Primer Llamado...");
  // para poser extraer la info, lo convertimos a un objeto JSON
  //data1 = JSON.parse(data1);
  //console.log(data1.results[0]);
  fetchData(API + data1.results[0].id, function(error2, data2) {
    if (error2) return console.error(error1);
    console.log("Segundo Llamado...");
    //data2 = JSON.parse(data2);
    fetchData(data2.origin.url, function(error3, data3) {
      if (error3) return console.error(error3);
      console.log("Tercero Llamado...");
      console.log("Personajes:" + " " + data1.info.count);
      console.log("Primer Personaje:" + " " + data2.name);
      console.log("Dimensión:" + " " + data3.dimension);
    });
  });
});
