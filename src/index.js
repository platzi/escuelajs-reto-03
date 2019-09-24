const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';

const fetchAPI = (url) => {
  let xhttp = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          const data = JSON.parse(xhttp.responseText);
          resolve(data);
        } else {
          reject(new Error("Algo salió mal."));
        }
      }
    };
    xhttp.open('GET', url, false);
    xhttp.send(null);
  });
}

async function allCalls() {
  const first = await firstCall(API);
  const second = await secondCall(API + first.results[0].id);
  const third = await thirdCall(second.origin.url);

  console.log(`
  Personajes: ${first.info.count}
  Primer personaje: ${second.name}
  Dimensión: ${third.dimension}
  `);
}

async function firstCall(url) {
  try {
    const data1 = await fetchAPI(url);
    console.log('Primer llamado');
    return data1;
  } catch (error) {
    console.log(error);
  }
}

async function secondCall(url) {
  try {
    const data2 = await fetchAPI(url);
    console.log(`Segundo llamado`);
    return data2;
  } catch (error) {
    console.log(error);
  }
}

async function thirdCall(url) {
  try {
    const data3 = await fetchAPI(url);
    console.log('Tercer llamado');
    return data3;
  } catch (error) {
    console.log(error);
  }
}

allCalls();
