let XMLHttpRequest = require ('xmlhttprequest').XMLHttpRequest;

const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        // True para acivar asincronismo dentro de xmlhttprequest
        xhttp.open('GET', url_api, true)
        // Escuchar cambios
        xhttp.onreadystatechange = (() => {
            // validar estado y conexion,
            // triple igual para validar valor y tipo
            if(xhttp.readyState === 4){ 
                (xhttp.status === 200)
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('Error', url_api))
            }
        })
        xhttp.send();
    });
}

// node common js para exports
module.exports = fetchData; 