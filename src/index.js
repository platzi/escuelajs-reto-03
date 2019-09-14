const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';
const fetch = require('node-fetch');

function getCharacter(url) {
  return getCharacterPromise = new Promise( (success, reject) => {
    fetch(url)
    .then(function(response) {
      success(response.json())
    }).catch( function (err) {
      reject(err);
    });
  });
}

async function getDataCharacter(){
  const persons = await getCharacter(API);
  const person = await getCharacter(`${API}/${persons.results[0].id}`);
  const origin = await getCharacter(person.origin.url);

  console.log(`Personajes: ${persons.info.count}`);
  console.log(`Primer Personaje: ${person.name}`);
  console.log(`Dimensión: ${origin.dimension}`); 
}

getDataCharacter();
