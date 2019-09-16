const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const BASE_API = "https://rickandmortyapi.com/api/character/",
  xhr = new XMLHttpRequest();

const fetchData = url => {
  xhr.open('GET', url, false)
  xhr.responseType = 'json'
  return new Promise((res, rej) => {
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          return res(response)
        } else {
          return rej(new Error('SORRY! ERROR HAS OCURRED :('))
        }
      }
    }
    xhr.send()
  })
}

const searchData  = async url => {
  try {
    console.log('L O A D I N G')
    const world = await fetchData(url)

    console.log('L O A D I N G . . .')
    const chapters = await fetchData(`${BASE_API}${world.results[0].id}`)

    console.log('L O A D I N G . . . . . .')
    const characters = await fetchData(`${chapters.origin.url}`)

    console.log(' ')
    console.log('------------------------------')
    console.log(' ')

    console.log(`1. Count characters: ${world.info.count}`)
    console.log(`2. First character: ${chapters.name}`)
    console.log(`3. Dimensions: ${characters.dimension}`)

    }catch(error) {
      console.log(error.text)
    }
}

searchData(BASE_API)