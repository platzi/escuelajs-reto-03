let API = "https://rickandmortyapi.com/api/character/";
let SimpleAPI = "https://rickandmortyapi.com/api/";

function getData(config) {
  this.api = config.api;
  this.apiSimple = config.apiSimple;
}

getData.prototype.fetchData = async function() {
  const datos = await fetch(this.api);
  const respuestaJSON = await datos.json();
  console.log("Primer Llamado...");
  console.log("Personajes:" + " " + respuestaJSON.info.count);
  console.log("Primer Personaje:" + " " + respuestaJSON.results[0].name);
  // console.log("final") se ejecuta antes dato que no hace
  // un request externo, si queremos que no se ejecute hasta
  // hasta esperar la respuesta le colocaminos await la funcion
  // fetchDataSecondCall
  await this.fetchDataSecondCall(`${this.apiSimple}location/1`);
  console.log("final");
};

getData.prototype.fetchDataSecondCall = async function(datosJSON) {
  const datosDimension = await fetch(datosJSON);
  const respuestaJSONDimension = await datosDimension.json();
  console.log(respuestaJSONDimension.dimension);
};

let datos = new getData({ api: API, apiSimple: SimpleAPI });
datos.fetchData();
