const fetch = require("node-fetch");

var API = 'https://rickandmortyapi.com/api/character/';


async function getData(url){
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function obtenerPersonajes(url){
  const response = await getData(url);
  const personajes = response.info
  return personajes;
}
async function obtenerPersonaje(url, id){
  const response = await getData(url);
  const personaje = response.results[id]
  return personaje;
}

async function obtenerDimensionPersonaje(url){
  const response = await getData(url);
  return response
}
obtenerPersonajes(API).then(personajes => console.log('Personajes:',personajes.count));
obtenerPersonaje(API, 0)
.then(personaje =>{
    console.log('Primer Personaje:' ,personaje.name);
    obtenerDimensionPersonaje(personaje.origin.url)
      .then(response => console.log('Dimensión:', response.dimension));
  });

    
