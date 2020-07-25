const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

let fetchData = (apiUrl, callback) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', apiUrl, true);
    xhttp.onreadystatechange = (event) => {
        if (xhttp.readyState === 4 ) {
            if(xhttp.status === 200 ) {
                callback(JSON.parse(xhttp.responseText));
            }else{
                const err = new Error(`Error: ${apiUrl}`);
                return callback(err);
            }
        }
    }
    xhttp.send();
};

fetchData(API, (data1, err1) => {
    if(err1) return console.log(err1);
    fetchData(`${API}${data1.results[0].id}`, (data2, err2) => {
        if(err2) return console.error(err2);
        fetchData(`${data2.origin.url}`, (data3, err3) => {
            if(err3) return console.error(err3);
            console.log(`Personajes: ${data1.info.count}`);
            console.log(`Primer personaje: ${data2.name}`);
            console.log(`Dimensión: ${data3.dimension}`);
        });
    });
});
