const API = 'https://rickandmortyapi.com/api/character/'; // success
let REGISTERS_COUNT;
// API = 'https://rickandmortyapi.com/api/characters/';// error

/*
 * nos alertará en consola sobre cualquier error al obtener información del api
 * @error = el objeto JSON del error, éste deberá de tener un atributo llamado @responseText
 */
function consoleError(error) {
  // eslint-disable-next-line no-console
  console.log(error.responseText);
}

/*
 * Pinta en un input el resultado de la operación
 * @message = el mensaje que va a ser dibujado
 * @element = El query que haga referencia al input que se vaya a dibujar
 * En caso de no ser especificado el element se alertará el resultado, ésto fue 
 * muy útil antes de definir la estructura HTML para testear desde js
 */
function renderInput(message, element) {
  if (element) {
    // Dibujar en el DOM
    // const $elementObj = document.querySelector(element);
    // eslint-disable-next-line no-console
    console.log(`Drawing element: ${element} with ${message}`);
    const $elementObj = document.querySelector(element);
    $elementObj.setAttribute('value', message);
    // eslint-disable-next-line no-console
  } else {
    // alertar el resultado para mostrarlo
    // eslint-disable-next-line no-alert
    alert(message);
    // eslint-disable-next-line no-console
    console.log(message);
  }
}


function renderImage(src, element) {
  // eslint-disable-next-line no-console
  console.log(`Drawing element: ${element} with ${src}`);
  const $elementObj = document.querySelector(element);
  $elementObj.setAttribute('src', src);
  //
}

function getCharacter(URL_API) {
  fetch(URL_API, {}).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    // debugger;
    return 0;
  }).then((data) => {
    if (data) {
      // resultado 2
      const NAME = data.name;
      const IMAGE_URL = data.image;
      renderInput(`${NAME}`, '#characterName');
      renderImage(IMAGE_URL, '#characterImage');
      const URL_API = data.origin.url;
      if (URL_API) {
        fetch(URL_API, {}).then((response) => response.json()).then((data) => {
          // resultado 3
          const DIMENSION = data.dimension;
          renderInput(DIMENSION, '#characterDimension');
        });
      }
    } else {
      const DIMENSION = 'dimension desconocida';
      renderInput(DIMENSION, '#characterDimension');
      // eslint-disable-next-line no-alert
      alert('No encontramos el personaje');
    }
  });
}

function getCharacters() {
  const id = document.querySelector('#idCharacter').value;
  if (id) {
    getCharacter(API + id);
  } else {
    getCharacter(API + 1);
  }
}

fetch(API, {}).then((response) => response.json()).then((data) => {
  // resultado 1
  REGISTERS_COUNT = data.info.count;
  const $idCharacter = document.querySelector('#idCharacter');
  $idCharacter.setAttribute('max', REGISTERS_COUNT);
  renderInput(REGISTERS_COUNT, '#totalRecords');
  const URL_API = API + data.results[0].id;
  getCharacter(URL_API);
});
