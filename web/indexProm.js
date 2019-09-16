// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';
const $image = document.querySelector("#image")
const $name = document.querySelector("#name")
const $dimension = document.querySelector("#dimension")

const fetchData = (urlApi) => {
  const xhttp = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange =  () => { 
        if(xhttp.readyState === 4) {
          if(xhttp.status === 200){
            return resolve(xhttp.responseText);
          } else {
            return reject(xhttp.statusText)
        }
      }
    }
    xhttp.open('GET', urlApi, true)
    xhttp.send()
  })  
}

const askCharacter = CharacterSelected => {
  return  CharacterSelected = prompt("¿Que personaje desea consultar?")-1;
}

const showCharList = (data) => {
  return new Promise ((resolve, reject) => {
    const resultsLength = JSON.parse(data).results.length
    console.log(`Mostrando los primeros : ${resultsLength}`)
    for(let i = 0;i<resultsLength;i++)
    {
      $name.innerHTML += `${i+1}. ${JSON.parse(data).results[i].name}<br>`
      console.log(`${i+1}. ${JSON.parse(data).results[i].name}`)
    }
    return resolve()
  })
  
}

function renderCharacter(charName,charImage) {
  $name.textContent = charName;
  $image.setAttribute('src', charImage);
}

fetchData(API)
.then((data1) => {
  console.log('Primer Llamado...')
  console.log(`Personajes:  ${JSON.parse(data1).info.count}`)
  showCharList(data1)
  return fetchData(`${API}${JSON.parse(data1).results[askCharacter()].id}`)
})
.then((data2) => {
  console.log('Segundo Llamado...')
  console.log(`Primer Personaje: ${JSON.parse(data2).name}`)
  renderCharacter(JSON.parse(data2).name,JSON.parse(data2).image)
  return fetchData(JSON.parse(data2).origin.url)
})
.then((data3) => {
  console.log('Tercer Llamado...')
  console.log(`Dimensión: ${JSON.parse(data3).dimension}`)
  $dimension.textContent = `Dimensión: ${JSON.parse(data3).dimension}`
})
.catch((error) => {
  console.error(`Problemas, recibimos error: ${error}`)
})
