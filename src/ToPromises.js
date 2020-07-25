const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (apiUrl) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', apiUrl, true);
    return new Promise((resolve, reject) => {
        xhttp.onreadystatechange = (event) => {
            if (xhttp.readyState === 4 ) {
                xhttp.status === 200 
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error(`Error: ${apiUrl}`))
            }
        }
        xhttp.send();
    });
};

fetchData(API)
    .then(response => {
        console.log(`Personas: ${response.info.count}`);
        return fetchData(`${API}${response.results[0].id}`)
    })
    .then(response => {
        console.log(`Primer personaje: ${response.name}`);
        return fetchData(`${response.origin.url}`);
    })
    .then(response => {
        console.log(response.dimension);
    })
    .catch(err => console.log(`Error: ${err}`));