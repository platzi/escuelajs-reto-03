const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

function fetchData(url_api, callback) {
    xhttp.onreadystatechange = function(event) {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                return callback(null, xhttp.responseText);
            } else {
                return callback(url_api);
            }
        }
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();
};

console.log('Primer Llamado...')
fetchData(API, function(error1, data1) {
    data1 = JSON.parse(data1)
    if (error1) {
        return console.error('Error' + ' ' + error1);
    }
    console.log('Personajes:' + ' ' + data1.info.count);

    console.log('Segundo Llamado...')
    fetchData(API + data1.results[0].id, function(error2, data2) {


        if (error2) {
            return console.error(error1);
        }
        data2 = JSON.parse(data2)
        console.log('Primer Personaje:' + ' ' + data2.name);


        console.log('Tercer Llamado...')
        fetchData(data2.origin.url, function(error3, data3) {
            if (error3) {
                return console.error(error3);
            }

            data3 = JSON.parse(data3)
            console.log('Dimensión:' + ' ' + data3.dimension);
        });
    });
});
