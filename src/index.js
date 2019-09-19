/*var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;*/

const API = "https://rickandmortyapi.com/api/character/";
const xhttp = new XMLHttpRequest();

function fetchData(url_api) {
    return new Promise((resolve, reject) => {
        xhttp.onreadystatechange = event => {
            if (xhttp.readyState === 4) {
                if (xhttp.status == 200)
                    resolve(JSON.parse(xhttp.responseText));
                else 
                    reject(new Error("Tienes un error"));
            }
        };
        xhttp.open("GET", url_api, true);
        xhttp.send();
    });
}

fetchData(API)
.then(data1 => {
    console.log("Primer Llamado...");
    fetchData(API + data1.results[0].id)
    .then(data2 => {
        console.log("Segundo Llamado...");
        fetchData(data2.origin.url)
        .then(data3 => {
            console.log("Tercero Llamado...");
            console.log(`Personajes: ${data1.info.count}`);
            console.log(`Primer Personaje: ${data2.name}`);
            console.log(`Dimensión: ${data3.dimension}`);
        })
    })
})
.catch(error => console.error(`Error ${error}`))