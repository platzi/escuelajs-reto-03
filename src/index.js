// se pasaron las variables a const
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// se asigna la url la variable API
const API = 'https://rickandmortyapi.com/api/character/'

const xhttp = new XMLHttpRequest();
// La "function fetchData" la convertimos Arrow functions y hacemos que retorne un promesa: "new Promise((resolve, reject)"
// y el texto plano de retorno de la url la convertimos en JSON: "JSON.parse(xhttp.responseText)"
const fetchData = url_api => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState === xhttp.DONE) { 
        if (xhttp.status === 200) {  // -- se ejecutó el llamado exitosamente
          resolve(JSON.parse(xhttp.responseText)); // se convierte en Json
        } else { // -- hubo un error en el llamado
          reject(url_api);
        }
      }
    };
    xhttp.open('GET', url_api); 
    xhttp.send();
  });
}; // Ahora "fetchData"es una promesa que retorna un JSON

//aplicamos Async-await es la manera más simple y clara de realizar tareas asíncronas. 
//Await detiene la ejecución del programa hasta que todas las promesas sean resueltas. 
// Para poder utilizar esta forma, hay que colocar async antes de la definición de la función, y encerrar el llamado a Promises.all() dentro de un bloque try … catch.
const loadCharacters = async () => {
  console.log(`ingreso a metodo ASYNC esperando respuesta...`)
  try {
    // aplicamos (template strings) a los console.log('') => console.log(`${}`)
    console.log(`llamado..Primero .API `)
    const data1 = await fetchData(API)
    console.log(`llamado..Segundo. DATO1: ${data1}`)
    const data2 = await fetchData(API + data1.results[0].id);
    console.log(`llamado..Tercer.  DATO2: ${API + data1.results[0].id}`);
    const data3 = await fetchData(data2.origin.url);
    console.log(`Tercero Llamado...DATO3: ${data2.origin.url}`);
    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  } catch (error) { // si resulta un error en el llamado
    console.error(error);
  }
};

loadCharacters(); // llamado a la funcion asincrona
