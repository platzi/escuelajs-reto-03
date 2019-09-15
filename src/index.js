const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

function fetchData(url_api, callback) {
  xhttp.onreadystatechange = function (event) {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200)
        callback(null, xhttp.responseText);
      else return callback(url_api);
    }
  };
  xhttp.open('GET', url_api, false)
  xhttp.send()
};

fetchData(API, (error1, data1) => {
  if (error1) return console.error(`Error ${error1}`)
	console.log('Primer Llamado callback...')
	data1 = JSON.parse(data1)
  fetchData(`${API}${data1.results[0].id}`, (error2, data2) => {
    if (error2) return console.error(error1)
		console.log('Segundo Llamado callback...')
		data2 = JSON.parse(data2)
    fetchData(data2.origin.url, (error3, data3) => {
			if (error3) return console.error(error3)
			data3 = JSON.parse(data3)
      console.log('Tercer Llamado callback..')
      console.log(`Personajes: ${data1.info.count}`)
      console.log(`Primer Personaje: ${data2.name}`)
      console.log(`Dimensión: ${data3.dimension}`)
    })
  })
})

const fetchDataWithPromise = (url_api) => {
	return new Promise((resolve, reject) => {
		xhttp.onreadystatechange = function (event) {
			if (xhttp.readyState === 4) {
				if (xhttp.status === 200)
					resolve(xhttp.responseText)
				else 
					reject({
						status: this.status,
						statusText: xhttp1.statusText
					})
			}
		};
		xhttp.open('GET', url_api, false)
		xhttp.send()
	})
}

let data1 ={}
let data2 ={}
let data3 ={}

fetchDataWithPromise(API).then(data => {
	data1 = JSON.parse(data)
	console.log('Primer Llamado Promise...')
	return fetchDataWithPromise(`${API}${data1.results[0].id}`)
}).then(data => {
	data2 = JSON.parse(data)
	console.log('Segundo Llamado Promise...')
	return fetchDataWithPromise(data2.origin.url)
}).then(data => {
	data3 = JSON.parse(data)
	console.log('Tercer Llamado Promise...')
	console.log(`Personajes: ${data1.info.count}`)
	console.log(`Primer Personaje: ${data2.name}`)
	console.log(`Dimensión: ${data3.dimension}`)
}).catch(error => {
	console.log(error)
})

const doRequestsWithAsyncAwait = async() => {
	let data1 = await fetchDataWithPromise(API);	
	data1 = JSON.parse(data1)	
	console.log('Primer Llamado async await...')
	let data2 = await fetchDataWithPromise(`${API}${data1.results[0].id}`)
	data2 = JSON.parse(data2)
	console.log('Segundo Llamado async await...')
	let data3 = await fetchDataWithPromise(data2.origin.url)
	data3 = JSON.parse(data3)
	console.log('Tercer Llamado async await...')
	console.log(`Personajes: ${data1.info.count}`)
	console.log(`Primer Personaje: ${data2.name}`)
	console.log(`Dimensión: ${data3.dimension}`)
}

doRequestsWithAsyncAwait().catch(error => {
    console.log('Error', error)
})