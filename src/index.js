const fetch = require("node-fetch");

const API = 'https://rickandmortyapi.com/api/character/';

async function getData(url){
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getCharacters(url){
  const response = await getData(url);
  const characters = response.info
  return characters;
}
async function getCharacter(url, id){
  const response = await getData(url);
  const character = response.results[id]
  return character;
}

async function getCharacterDimension(url){
  const response = await getData(url);
  return response
}
getCharacters(API).then(characters => console.log(`Personajes: ${characters.count} `));
getCharacter(API, 0)
.then(character =>{
    console.log(`Primer Personaje: ${character.name} `);
    getCharacterDimension(character.origin.url)
      .then(response => console.log(`Dimensión: ${response.dimension}`));
  });

    
