var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
/* var xhttp = new XMLHttpRequest();
 */

const apiData = new Promise((results, reject) =>{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = (event) => {
      
        /*     console.log(xhttp.readyState) */
        if (xhttp.readyState === 4) {
            if (xhttp.status == 200) {
                results(JSON.parse(xhttp.responseText))
            } else {
                reject(error(xhttp.statusText))
            };
        }
    };

    xhttp.open('GET', API, false);
    xhttp.send();
})
const prompts = require('prompts');
apiData
    .then((datos) => {
        personajes = datos.info.count
        return datos
    })
    .then((datos2) => {
        primerPersonaje= datos2.results[0].name
        return datos2
    })
    .then((datos3) => {
        dimension = datos3.results[0].origin.name
        console.log(`Personajes: ${personajes}`);
        console.log(`Primer Personaje: ${primerPersonaje}`);
        console.log(`Dimensión: ${dimension}`);
        return datos3    
    })
    .then((datos4) =>{
    //utilizando el objero @prompts asignado al let numero
    //se le preguntara al usuario el numero de id del personaje
    //que quiere ver.      
        (async () => {
            let numero = await prompts({
              type: 'number',
              name: 'value',
              message: '¿Qué numero de personaje quieres ver?',
              validate: value => value > 494 ? `Numero fuera del rango` : true
            });
           
          
            personajeSeleccionado = datos4.results[numero.value - 1]
            console.log(`id personaje : ${personajeSeleccionado.id}`)
            console.log(`Nombre personaje : ${personajeSeleccionado.name}`)
            console.log(`Dimensión : ${personajeSeleccionado.origin.name}`)
          })();

    })
    .catch((error) => { console.log(`se presento el siguiente ${error}`)})