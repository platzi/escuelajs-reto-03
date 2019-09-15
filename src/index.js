const response_then = document.querySelector('.response_then');
const response_asyncawait = document.querySelector('.response_asyncawait');
const API = "https://rickandmortyapi.com/api/character/";

function fetchData(url_api, data) {
  const xhttp = new XMLHttpRequest();
  xhttp.responseType = 'json';

  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          resolve({
            response: xhttp.response,
            prevData: data
          });
        } else return reject(url_api);
      }
    };

    xhttp.open("GET", url_api, true);
    xhttp.send();
  });
}

// Solución reto 3 utilizando Then() y Catch()
response_then.innerHTML = "";

fetchData(API)
  .then(({ response }) => {

    const liItem = document.createElement('li');
    liItem.innerHTML = `<p>Primer Lllamado then()...</p>`; 
    response_then.appendChild(liItem);

    console.log("Primer Llamado...");
    return fetchData(`${API}${response.results[0].id}`, response);
  })
  .then(({ response, prevData }) => {
    console.log("Segundo Llamado...");

    const liItem = document.createElement('li');
    liItem.innerHTML = `<p>Segundo Lllamado then()...</p>`; 
    response_then.appendChild(liItem);

    const response2 = {
      ...prevData,
      prevData2: response
    };

    return fetchData(response.origin.url, response2);
  })
  .then(({ response, prevData }) => {

    const liItem = document.createElement('li');
    const liItemCount = document.createElement('li');
    const liItemName = document.createElement('li');
    const liItemDimension = document.createElement('li');

    liItem.innerHTML = `<p>Tercer Lllamado then()...</p>`; 
    liItemCount.innerHTML = `<p>${prevData.info.count}</p>`; 
    liItemName.innerHTML = `<p>${prevData.prevData2.name}</p>`; 
    liItemDimension.innerHTML = `<p>${response.dimension}</p>`; 
    response_then.appendChild(liItem);
    response_then.appendChild(liItemCount);
    response_then.appendChild(liItemName);
    response_then.appendChild(liItemDimension);

    console.log("Tercero Llamado...");
    console.log("Personajes:" + " " + prevData.info.count);
    console.log("Primer Personaje:" + " " + prevData.prevData2.name);
    console.log("Dimensión:" + " " + response.dimension);
  })
  .catch(url => {
    console.log(`Error ${url}`)
  });

//Solución reto 3 utilizando Async Await
response_asyncawait.innerHTML = "";
async function challenge(API) {
  try {

    const data = await getFirstCalled(API);
    const data2 = await getSecondCalled(`${API}${data.response.results[1].id}`);
    const data3 = await getThirdCalled(data2.response.origin.url);

    const liItemCount = document.createElement('li');
    const liItemName = document.createElement('li');
    const liItemDimension = document.createElement('li');

    liItemCount.innerHTML = `<p>${data.response.info.count}</p>`; 
    liItemName.innerHTML = `<p>${data2.response.name}</p>`; 
    liItemDimension.innerHTML = `<p>${data3.response.dimension}</p>`; 
    response_asyncawait.appendChild(liItemCount);
    response_asyncawait.appendChild(liItemName);
    response_asyncawait.appendChild(liItemDimension);


    console.log("Personajes:" + " " + data.response.info.count);
    console.log("Primer Personaje:" + " " + data2.response.name);
    console.log("Dimensión:" + " " + data3.response.dimension);

  } catch (error) {
    console.log(`Error ${API}`)
    console.log(error);
  }
}

async function getFirstCalled(API) {
  try {
    const liItem = document.createElement('li');
    liItem.innerHTML = `<p>Primer Lllamado Async Await...</p>`; 
    response_asyncawait.appendChild(liItem);
    
    console.log("Primer Llamado Async Await...");
    const data = await fetchData(API);
    return data;
  } catch (error) {
    console.log(`Error ${API}`);
  }
}

async function getSecondCalled(API) {
  try {
    const liItem = document.createElement('li');
    liItem.innerHTML = `<p>Segundo Lllamado Async Await...</p>`; 
    response_asyncawait.appendChild(liItem);

    console.log("Segundo Llamado Async Await...");
    const data2 = await fetchData(API);
    return data2;
  } catch (error) {
    console.log(`Error ${API}`);
  }
}

async function getThirdCalled(API) {
  try {

    const liItem = document.createElement('li');
    liItem.innerHTML = `<p>Tercer Lllamado Async Await...</p>`;     
    response_asyncawait.appendChild(liItem);

    console.log("Tercero Llamado Async Await...");
    const data3 = await fetchData(API);
    return data3;
  } catch (error) {
    console.log(`Error ${API}`);
  }
}

challenge(API);