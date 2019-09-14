var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

const API = 'https://rickandmortyapi.com/api/character/'

const fetchData = (url_api, obj = {}) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = event => {
            if (xhttp.readyState === 4) {
                if (xhttp.status == 200) resolve({
                    data: JSON.parse(xhttp.responseText),
                    store: obj
                })
                else return reject(url_api)
            }
        }

        xhttp.open('GET', url_api, false)
        xhttp.send()
    })
}

fetchData(API)
    .then( ({ data }) => {
        console.log('Primer Llamado...')
        return fetchData(`${API}${data.results[0].id}`, { count: data.info.count })
    } )
    .then( ({ data, store }) => {
        console.log('Segundo Llamado...')
        return fetchData(data.origin.url, { ...store, name:data.name })
    } )
    .then( ({ data, store }) => {
        console.log('Tercero Llamado...')
        console.log('Personajes:' + ' ' + store.count);
        console.log('Primer Personaje:' + ' ' + store.name);
        console.log('Dimensión:' + ' ' + data.dimension);
    } )
    .catch( error => console.error(`Error ${error}`) )