//Esta linea detenia la ejecución del scrip dado que no se cargo el modulo requireJS
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = "https://rickandmortyapi.com/api/character/";
var xhttp = new XMLHttpRequest();

function fetchData(url_api, callback) {
  xhttp.onreadystatechange = function(event) {
    console.log(xhttp); //En la consola podemos observar que el valor del
    // xhttp es igual a 4 como int y en el codigo estaba como String
    // entonces para que funcione puedes quitar un = o quitar las comillas dobles
    if (xhttp.readyState == "4") {
      //mi solucion no fue mover nada en la llamada fetchData
      //tan solo identificar que se estaba mandando un responseText y para evitar el parse de cada,
      //data1, data2, data3, ya que cada llamada venia en texto solo tuve que modificar el core de la funcion
      //parseando la respuesta a JSON del la funcion callback de data1,2,3 y listo!
      if (xhttp.status == 200) callback(null, JSON.parse(xhttp.responseText));
      else return callback(url_api);
    }
  };
  xhttp.open("GET", url_api, false);
  xhttp.send();
}

fetchData(API, function(error1, data1) {
  if (error1) return console.error("Error" + " " + error1);
  console.log("Primer Llamado...");
  fetchData(API + data1.results[0].id, function(error2, data2) {
    if (error2) return console.error(error1);
    console.log("Segundo Llamado...");
    fetchData(data2.origin.url, function(error3, data3) {
      if (error3) return console.error(error3);
      console.log("Tercero Llamado...");
      console.log("Personajes:" + " " + data1.info.count);
      console.log("Primer Personaje:" + " " + data2.name);
      console.log("Dimensión:" + " " + data3.dimension);
    });
  });
});
