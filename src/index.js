const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API_URL = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

const fetchDataFromAPI = url => {
    return new Promise((resolve, reject) => {
        xhttp.onreadystatechange = () => {
            const response = JSON.parse(xhttp.responseText)
            xhttp.status === 200 ? resolve(response) : reject(new Error(`${xhttp.status}`));
        };
        xhttp.open("GET", url, false);
        xhttp.send();
    })
};

const getDataFromAPI = async API_URL => {
    try {
        console.log("First fetch...");
        const wholeData = await fetchDataFromAPI(API_URL);
        console.log("Second fetch...");
        const firstCharacter = await fetchDataFromAPI(`${API_URL}${wholeData.results[0].id}`);
        console.log("Third fetch...");
        const characterOrigin = await fetchDataFromAPI(`${firstCharacter.origin.url}`);
        console.log(`There are ${wholeData.info.count} living forms in the universe`);
        console.log(`Hi Morty, burp!, i'm ${firstCharacter.name}`);
        console.log(`burp!, i'm from ${characterOrigin.name}`);
    } catch (err) {
        console.log(`Something is wrong!! | ${err}`)
    }
}
getDataFromAPI(API_URL)

