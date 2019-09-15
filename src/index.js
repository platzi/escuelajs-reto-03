const { XMLHttpRequest } = require("xmlhttprequest");

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();
const statusRequest = {
  success: 200,
  notFound: 404,
  internalServerError: 500,
  done: 4
};


const pomesafetchData = (url_api) => {

  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = function (event) {

      if (xhttp.readyState === statusRequest.done) {
        if (xhttp.status === statusRequest.success)
          resolve(JSON.parse(xhttp.responseText));
        else
          reject(`Request error ${xhttp.status}`);
      }

    };
    xhttp.open('GET', url_api, false);
    xhttp.send();

  });
}

const callData = async () => {
  try {
    const dataResult1 = await pomesafetchData(API);
    console.log(dataResult1);
    const dataResult2 = await pomesafetchData(`${API}${dataResult1.results[0].id}`);
    console.log(dataResult2);
    const dataResult3 = await pomesafetchData(dataResult2.origin.url);
    console.log(dataResult3);
  } catch (error) {
    console.log(error);
  }
}

callData();

