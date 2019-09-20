
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

let fetchData = (url_api, callback) => {
  xhttp.onreadystatechange = function (event) {
    if (xhttp.readyState == 4) {//Cambie el === por == ya que no son valores iguales
      if (xhttp.status == 200)
        callback(null, xhttp.responseText);
      else return callback(url_api);
    }
  };
  xhttp.open('GET', url_api, false);//el valor por defecto es true
  xhttp.send();
}

let result;//Guardo el resultado de data2 para que sea global
fetchData(API, function (error1, data1){
  let promesa = new Promise((_b,m)=> {
    if (error1) return console.error(`Error ${error1}`);
  data1 = JSON.parse(data1);//Hice el llamado del JSON de cada data
  console.log(`Primer Llamado...`)
  })
  
.then(
  fetchData(`${API}${data1.results[0].id}`,  (error2, data2) => {//segun la documentacion de API toca entrar en el id
    if (error2) return console.error(error1);
    result = JSON.parse(data2);
    console.log(`Segundo Llamado...`)
  })
)

.then(
  fetchData(result.origin.url, (error3, data3) =>{
    if (error3) return console.error(error3);
    data3 = JSON.parse(data3);
    console.log(`Tercero Llamado...`)
    console.log(`Personajes: ${data1.info.count}`);
    console.log(` Primer Personaje:  ${result.name}` );
    console.log(`Dimensión: ${data3.dimension}`);
  })
)
})