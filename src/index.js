const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url_api) => {
    const xhttp = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhttp.onreadystatechange = event => {
            if (xhttp.readyState === 4 && xhttp.status === 200)
                resolve(JSON.parse(xhttp.responseText))
        };
        xhttp.open('GET', url_api, true);
        xhttp.send();
    });
};

const exec = async () => {
    try {
        let res1 = await fetchData(API);
        let res2 = await fetchData(`${API}\\${res1.results[0].id}`);
        let res3 = await fetchData(res2.origin.url);
        console.log(`Personajes: ${res1.info.count}\nPrimer Personaje: ${res2.name}\nDimensión: ${res3['dimension']}`);
    } catch (error) {
        console.log(error);
    }
};

exec();
