//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = "https://rickandmortyapi.com/api/character/";
const xhttp = new XMLHttpRequest();

function fetchData(urlApi, callback) {
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        return callback(null, xhttp.responseText);
      }
      return callback(urlApi);
    }
  };

  xhttp.open("GET", urlApi, true);
  xhttp.send();
}

fetchData(API, (error1, data1) => {
  if (error1) {
    console.error(`Se obtuvo el error: ${error1}`);
  }
  console.log("Primer Llamado...");
  fetchData(API + JSON.parse(data1).results[0].id, (error2, data2) => {
    if (error2) {
      console.error(error1);
    }

    console.log("Segundo Llamado...");
    // console.log(JSON.parse(data2));
    fetchData(JSON.parse(data2).origin.url, (error3, data3) => {
      if (error3) {
        console.error(error3);
      }
      console.log("Tercer Llamado...");
      console.log(`Personajes:  ${JSON.parse(data1).info.count}`);
      console.log(`Primer Personaje: ${JSON.parse(data2).name}`);
      console.log(`Dimensión: ${JSON.parse(data3).dimension}`);
    });
  });
});
