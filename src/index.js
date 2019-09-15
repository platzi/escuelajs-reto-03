let API = 'https://rickandmortyapi.com/api/character/'; // success
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


function renderImage (src, element) {
  // eslint-disable-next-line no-console
  console.log(`Drawing element: ${element} with ${src}`);
  const $elementObj = document.querySelector(element);
  $elementObj.setAttribute('src', src);
  //
}

function fetchData({ urlApi, callbacks = false, success = () => {}, error = () => {} }) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = (event) => {
    if (request.readyState === 4) {
      // console.log(event);
      if (request.status === 200) { // success
        // console.log(`HTTP Response: ${request.status}`);
        // console.log(request.responseText);
        success(request.responseText);
      } else { // error
        // renderInput("entramos en el error");
        // renderInput(event.target.responseText);
        error(request);
      }
    }
  };
  request.open('GET', urlApi, false);
  request.send(null);
}

function data3(responseText) {
  // console.log('responseJSON: ');
  const response = JSON.parse(responseText);
  // console.log(response);
  renderInput(response.dimension, '#characterDimension');
}

function data2(responseText) {
  const response = JSON.parse(responseText);
  // debugger;
  // alert(response.image);
  renderImage(response.image, '#characterImage');
  renderInput(`${response.name}`, '#characterName');
  if (response.origin.url) {
    const urlApi = response.origin.url;
    fetchData({
      urlApi,
      success: data3,
      error: consoleError,
    });
  }else{
    renderInput('no especificada', '#characterDimension');
  }
}

const data1 = (responseText) => {
  // const ELEMENTS = (JSON.parse(response)); // result 1
  const characters = JSON.parse(responseText);
  const character = characters.results[0];
  const urlApi = API + character.id;
  const charactersCount = characters.info.count;
  renderInput(charactersCount, '#totalRecords');

  const $characterIdInput = document.getElementById('idCharacter');
  // Asignar como valor máximo del input del id el máximo de personajes 
  $characterIdInput.setAttribute('max', charactersCount);

  // console.log(character.id === 1);
  // debugger;
  fetchData({
    urlApi,
    success: data2,
    error: consoleError,
  });
};

fetchData({
  urlApi: API,
  success: data1,
  error: consoleError,
});

function getCharacters() {
  const id = document.querySelector('#idCharacter').value;
  fetchData({
    urlApi: API + id,
    success: data2,
    error: consoleError,
  });
}

// Botón que saque el personaje desde el id