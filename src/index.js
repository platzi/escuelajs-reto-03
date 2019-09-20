"use strict";

const { XMLHttpRequest } = require("xmlhttprequest");

const API = "https://rickandmortyapi.com/api/character";

const fetchData = url_api => {
  const READY_STATE_NOT_INITIALIZED = 0;
  const READY_STATE_LOADING = 1;
  const READY_STATE_LOADED = 2;
  const READY_STATE_INTERACTIVE = 3;
  const READY_STATE_COMPLETED = 4;
  const NOT_INITIALIZED = "Not initialized.";
  const LOADING = "Loading…";
  const LOADED = "Loaded.";
  const INTERACTIVE = "Interactive.";
  const COMPLETED = "Completed.";
  const HTTP_STATUS_SUCCESS = 200;

  return new Promise((resolve, reject) => {
    const status = ({ readyState }) => {
      switch (readyState) {
        case READY_STATE_NOT_INITIALIZED:
          return NOT_INITIALIZED;
        case READY_STATE_LOADING:
          return LOADING;
        case READY_STATE_LOADED:
          return LOADED;
        case READY_STATE_INTERACTIVE:
          return INTERACTIVE;
        case READY_STATE_COMPLETED:
          return COMPLETED;
      }
    };

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url_api, true);
    xhttp.send(null);

    const readyStateChange = event => {
      if (status(xhttp) === COMPLETED) {
        if (xhttp.status === HTTP_STATUS_SUCCESS) {
          return resolve(JSON.parse(xhttp.responseText));
        } else {
          return reject(`Error fetching url: ${url_api}`);
        }
      }
    };
    xhttp.onreadystatechange = readyStateChange;
  });
};

const getCharactersInfo = async () => {
  try {
    const charactersInfo = await fetchData(`${API}/`);
    process.stdout.write(`Primer Llamado…\n\r`);
    process.stdout.write(`Personajes: ${charactersInfo.info.count}\n\r`);

    const firstCharacter = await fetchData(`${API}/${charactersInfo.results[0].id}`);
    process.stdout.write(`Segundo Llamado…\n\r`);
    process.stdout.write(`Primer Personaje: ${firstCharacter.name}\n\r`);

    const dimensions = await fetchData(firstCharacter.origin.url);
    process.stdout.write(`Tercer Llamado…\n\r`);
    process.stdout.write(`Dimensión: ${dimensions.dimension}\n\r`);
  } catch (error) {
    process.stdout.write(`Error: ${error}\n\r`);
  }
};

getCharactersInfo();
