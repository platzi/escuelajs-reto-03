const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = "https://rickandmortyapi.com/api/character/";
const xhttp = new XMLHttpRequest();

const fetchData = url_api => {
	return new Promise((res, rej) => {
		xhttp.onreadystatechange = function(event) {
			if (xhttp.readyState === 4) {
				if (xhttp.status === 200) res(JSON.parse(xhttp.responseText));
				else rej(console.log("error"));
			}
		};
		xhttp.open("GET", url_api, false);
		xhttp.send();
	});
	/* xhttp.onreadystatechange = function(event) {
		if (xhttp.readyState === 4) {
			if (xhttp.status === 200) callback(null, JSON.parse(xhttp.responseText));
			else console.log(`Error`);
		}
	}; */
};

fetchData(API)
	.then(data1 => {
		console.log("Primer Llamado..." + data1.results[0].id);
		//console.log(`${API}${data1.results[0].id}`);
		return fetchData(`${API}${data1.results[0].id}`);
	})
	.then(data2 => {
		console.log("Segundo Llamado...");
		//console.log(data2);
		return fetchData(data2.origin.url);
	})
	.then(data3 => {
		console.log("Tercero Llamado...");
		/* console.log(`Personajes: ${data3.info.count}`);
		console.log(`Primer Personaje: ${data3.name}`); */
		console.log(`Dimensión: ${data3.dimension}`);
	})
	.catch(error => {
		console.log("error");
	});
