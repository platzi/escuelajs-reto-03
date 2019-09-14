var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

const fetchData = api => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = event => {
      if (xhttp.status === 200) {
        var response = JSON.parse(xhttp.responseText)
        resolve(response)
      }
      if (xhttp.readyState === 4) {
        reject(api)
      }
    };
    xhttp.open('GET', api);
    xhttp.send();
  })
};

const callData = async () => {
  try {
    console.log(`Primer llamado`);
    let firstData = await fetchData(API)
    let firstCharacter = `${API}${firstData.results[0].id}`

    console.log(`Segundo llamado`);
    let secondData = await fetchData(firstCharacter)
    let origin = secondData.origin.url
    
    console.log(`Tercer llamado`);
    let thirdData = await fetchData(origin)

    console.log(`Personajes: ${firstData.info.count}`);
    console.log(`Primer Personaje: ${secondData.name}`);
    console.log(`Dimensión: ${thirdData.dimension}`);
  } catch (error) {
    console.error(`Error`, error);
  }
}

callData();