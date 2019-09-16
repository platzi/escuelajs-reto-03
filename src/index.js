const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

const obtenerData = url => {
    return new Promise((resolve, reject) => {
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4) {
                if (xhttp.status == 200) {
                    const response = JSON.parse(xhttp.responseText);
                    return resolve(response);
                } else {
                    return reject(new Error('Error'));
                }
            }
        }
        xhttp.open('GET', url, false);
        xhttp.send();
    })
}

const obtenerDataPorPromesa = async url => {
    try {

        console.log('Realizando primera consulta...');
        let data = await obtenerData(url);

        console.log('Realizando segunda consulta...');
        let primerPersonaje = await obtenerData(
            `${API}${data.results[0].id}`
        );

        console.log('Realizando tercera consulta...');
        let ubicacion = await obtenerData(`${primerPersonaje.origin.url}`);


        let cantidadPersonajes = data.info.count;
        let dimension = ubicacion.dimension;

        console.log('');
        console.log('Resultados:');
        console.log('-----------');
        console.log(`Cantidad de personajes: ${cantidadPersonajes}`);
        console.log(`Primer Personaje: ${primerPersonaje.name}`);
        console.log(`Dimensión: ${dimension}`);

    } catch (error) {

        console.log(error.text);

    }
}

obtenerDataPorPromesa(API);
