const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = "https://rickandmortyapi.com/api/character/";
const xhttp = new XMLHttpRequest();

const fetchData = url_api => {
  return new Promise((resolve, reject) => {
    xhttp.addEventListener("load", () => {
      resolve(JSON.parse(xhttp.responseText));
    });
    xhttp.addEventListener("error", () => {
      reject(new Error(xhttp.statusText)); // Este es para que el mismo HTTP mande el error
    });
    xhttp.open("GET", url_api, false);
    xhttp.send();
  });
};

const peticion = async () => {
  try {
    const data1 = await fetchData(API);
    const data2 = await fetchData(API + data1.results[0].id);
    const data3 = await fetchData(data2.origin.url);

    console.log(`Personajes: ${data1.info.count}`);
    console.log("Primer Personaje:" + " " + data2.name);
    console.log("Dimensión:" + " " + data3.dimension);
  } catch (error) {
    console.error("Ocurrio un error", error);
  }
};

peticion();
