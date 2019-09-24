const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';

const fetchAPI = (url) => {
  const xhttp = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          const data = JSON.parse(xhttp.responseText);
          resolve(data);
        } else {
          return reject(xhttp.status);
        }
      }
    };
    xhttp.open('GET', url, false);
    xhttp.send(null);
  });
}

async function todosLosLlamados() {
  const primer = await primerLlamado(API);
  const segundo = await segundoLlamado(API + primer.results[0].id);
  const tercer = await tercerLlamado(segundo.origin.url);

  console.log(`Personajes: ${primer.info.count}`);
  console.log(`Primer personaje: ${segundo.name}`);
  console.log(`Dimensión: ${tercer.dimension}`);
}

async function primerLlamado(url) {
  try {
    const data1 = await fetchAPI(url);
    console.log('Primer llamado');
    return data1;
  } catch (error) {
    console.log(error);
  }
}

async function segundoLlamado(url) {
  try {
    const data2 = await fetchAPI(url);
    console.log(`Segundo llamado`);
    return data2;
  } catch (error) {
    console.log(error);
  }
}

async function tercerLlamado(url) {
  try {
    const data3 = await fetchAPI(url);
    console.log('Tercer llamado');
    return data3;
  } catch (error) {
    console.log(error);
  }
}

todosLosLlamados();
