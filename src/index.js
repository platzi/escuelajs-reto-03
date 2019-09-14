/**
 * El script pretende consumir un API con la información del
 * Show Ric&Morty.
 *  
 * Para ello hará 3 llamadas al API, dichas llamadas se 
 * entrelazan ya que cada una depende del resultado de la 
 * anterior.
 * 
 * El código de esta versión es una refactorización
 * luego de la revisión de el profesor Adan.
 * Le pregunté si era una buena práctica usar variables globales
 * para guardar los datos de cada llamada al API.
 * 
 * Él me recomendó evitar el uso de variables globales,
 * puesto que comprometen la seguridad de la aplicación.
 * 
 * Me recomendó usar await para cachar las respuestas y me
 * pareció una solución muy elegante. Así que decidí corregir mi 
 * script.
 * 
 * Me agrada await ahora que comienzo a entenderlo un poco mejor.
 * Sin embargo me temo que realizaré más ejercicios para 
 * mejorar mi entendimiento del asincronísmo.
 */


// Como la variable se declaró en mayúsculas, asumo que no cambiará
// por tanto la decararé como constante ya que las constantes
// por convención se nombran en mayúculas.
const API = 'https://rickandmortyapi.com/api/character/';




// ------------- Eliminando callback hell ---------------------

// EN ES6 la mejor manera de evitar el callback hell
// es mediante el uso de promesas
// En esta ocasió fetch data es una función que no responde
// de manera síncrona, ya que depende del tiempo de respuesta del API
// por tanto cambié su funcionamiento para que retorne una promesa
function fetchData (url_api) {
  
  return new Promise( (resolve, reject) => {

    // Dejo de usar el xhttp como variable gobal
    // así mejora la seguridad de la aplicación
    // y se vuelve una función fácil de reutilizar
    let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    let req = new XMLHttpRequest();

  
    req.onreadystatechange = (event) => {
      if(req.readyState === 4){
        if(req.status == 200){
          resolve(JSON.parse(req.responseText))
        }else{
          // Manejando el error de todos los callbacks
          reject(`Error: ${req.status}, No hay resultados :(`)
        }
      }
    }

    req.open('GET', url_api, false);
    req.send(null);

  } )  

}

async function fullRequest(api) {
 
  // De acuerdo con lo aprendido tras mi pregunta sobre try catch
  // David Aoresti mencionó que es buena práctica usar un try por cada
  // tipo de error similar.

  // En este caso todas las promesas darán un mismo tip de error
  // puesto que llaman a la misma función
  try{
    console.log('Primer Llamado...')
    let data1 = await fetchData(api)
    
    console.log('Segundo Llamado...')
    let data2 = await fetchData(api + data1.results[0].id)

    console.log('Tercer Llamado...')
    let data3 = await fetchData(data2.origin.url)

    console.log(`Personajes ${data1.info.count}`)
    console.log(`Primer Personaje: ${data2.name}`)
    console.log(`Dimensión: ${data3.dimension}`)

  }catch(error){
    console.log(error)
  }
  
}


// Mandamos a llamar a la función que obtiene toda la información del show
fullRequest(API)