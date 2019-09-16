const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

const fetch = (url, config = { method: 'GET', async: true, body: null }) => {
  const { method, async, body } = config;

  return new Promise((resolve, reject) => {

    const xhttp = new XMLHttpRequest();
  
    xhttp.onreadystatechange = function (event) {
      if (xhttp.readyState === 4){

        if(xhttp.status == 200) {          
          resolve(xhttp.responseText);
        } else {
          reject(new Error('This is your error'));
        }

      }

    };

    xhttp.open(method, url, async);
    xhttp.send(body);
  });

};

const loadCharacters = () => {
  console.log('First call...');

  return fetch(API)
  .then(res => { return JSON.parse(res); });
};

const getCharter = (characterId) => {
  console.log('Second call...');
  
  return fetch(API + characterId)
  .then(res => { return JSON.parse(res); });
};

const getDimension = (url) => {
  console.log('Third call...');

  return fetch(url)
  .then(res => {
    const parse = JSON.parse(res);
    return parse.dimension;
  });
};

const stack = async () => {
  try {
    const characters = await loadCharacters();
    const character = await getCharter(characters.results[0].id);
    const dimension = await getDimension(character.origin.url);

    console.log(`
    Personajes: ${characters.info.count}
    Primer Personaje: ${character.name}
    Dimensión: ${dimension}
    `);
  
  } catch(err) {
    console.log(err);
    
  }
}

stack();