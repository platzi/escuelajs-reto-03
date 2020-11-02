const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.onreadystatechange = function () {
			if (request.readyState === 4 && request.status === 200) {
				const data = JSON.parse(request.responseText);
				resolve(data);
			} else {
				reject('error obteniendo la fuente');
			}
		};

		request.open('GET', url_api, false);
		request.send();
	});
}

fetchData(API)
	.then((data) => {
		console.log(`Primer Llamado. Hay ${data.info.count} personajes`);
		return fetchData(API + data.results[0].id);
	})
	.then((data) => {
		console.log(`Segundo Llamado. El primer personaje es ${data.name}.`);
		return fetchData(data.origin.url);
	})
	.then((data) => {
		console.log(`Tercer Llamado. Ubicacion: ${data.dimension}`);
	})
	.catch((err) => {
		console.log(`Error ${err}`);
	});
