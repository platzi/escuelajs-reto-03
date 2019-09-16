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
       var numero = prompt("Numero personaje");
        personajeSeleccionado = datos4.results[numero]
        console.log(personajeSeleccionado)
    })
    .catch((error) => { console.log(`se presento el siguiente ${error}`)})