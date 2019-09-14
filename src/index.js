const fetch = require("node-fetch");

const url_api = "https://rickandmortyapi.com/api/character/";
async function getFetch(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

(async function() {
  try {
    console.log(`Primer Llamado...`);
    let data1 = await getFetch(url_api);
    console.log(`Segundo Llamado...`);
    let data2 = await getFetch(`${url_api}${data1.results[0].id}`);
    let data3 = await getFetch(`${data2.origin.url}`);
    console.log(`Tercero Llamado...`);
    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  } catch {
    console.log(`Error al obtener archivos`);
  }
})();
