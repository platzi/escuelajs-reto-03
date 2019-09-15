const URL = "https://rickandmortyapi.com/api/character/";

const getCharacter = () => new Promise((resolve, rejected) => {
  fetch(`${URL}`)
    .then(response => resolve(response.json()))
    .catch(() => rejected());
});
const onError = () => {
  console.log(`Hubo un error`);
};
getCharacter().then((character) => {
  console.log(`Personajes: ${character.info.count}`);
  console.log(`Personaje Id: ${character.results[0].id}`)
  console.log(`Personaje Nombre: ${character.results[0].name}`)
  console.log(`Personaje vivo?: ${character.results[0].status}`)
}).catch(() => {
  onError();
});
