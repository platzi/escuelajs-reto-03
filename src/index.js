var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var API = 'https://rickandmortyapi.com/api/character/'
var xhttp = new XMLHttpRequest()

const existError = error => console.log(`Error: ${error}`)
/*FUNCION FECTHDATA CREA Y RETORNA LOS RESULTADOS DE LA PROMESA*/
const fetchData = url_api => {
  return new Promise((resolve, reject) => {
  xhttp.onreadystatechange = event => {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200)
        resolve(JSON.parse(xhttp.responseText))
      else return reject(url_api)
    }
  };
  xhttp.open('GET', url_api, false)
  xhttp.send()
})
}
/*GENERA NUMERO ALEATORIO PARA SELECCIONAR EL PERSONAJE A BUSCAR Y MOSTRAR*/ 
const randomCharacter = character => { return Math.round(character * Math.random()) }

/*DEFINIMOS NUEVA FUNCION SEARCH PARA EJECUTAR ASINCRONAMENTE LAS CONSULTAS*/
const searchCharacters = async () => {
  try {
    const characters = await fetchData(API)
    const TOTAL_CHARACTER=characters.info.count - 1
    const SELECT_CHARACTER = randomCharacter(TOTAL_CHARACTER)
    console.log(`Searching character...${SELECT_CHARACTER}`)
    const new_character = await fetchData(API + SELECT_CHARACTER)
    console.log(`Searching more...`)
    const data_character = await fetchData(new_character.url)
    console.log(`Getting data...`)
    //console.log(`Total Character:${characters.info.count}`);
    console.log(`*************CHARACTER**************`)
    console.log(`Name #${SELECT_CHARACTER}: ${data_character.name}`)
    console.log(`Status: ${data_character.status}`)
    console.log(`Species: ${data_character.species}`)
    console.log(`Gender: ${data_character.gender}`)
    console.log(`Location: ${data_character.location.name}`)
    console.log(`************************************`)
  } catch (error) {
      console.error(error)
  }
}
searchCharacters()