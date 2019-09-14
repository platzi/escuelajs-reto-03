const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = "https://rickandmortyapi.com/api/character/";
const xhttp = new XMLHttpRequest();

// const fetchData = (url_api, callback) => {
// 	xhttp.onreadystatechange = event => {
// 		if (xhttp.readyState === 4) {
// 			if (xhttp.status === 200) {
// 				callback(null, JSON.parse(xhttp.responseText));
// 			} else {
// 				return callback(url_api);
// 			}
// 		}
// 	};
// 	xhttp.open("GET", url_api, false);
// 	xhttp.send();
// };

const fetchData = url_api => {
	return new Promise((resolve, reject) => {
		xhttp.onreadystatechange = event => {
			if (xhttp.readyState === 4) {
				if (xhttp.status === 200) {
					resolve(JSON.parse(xhttp.responseText));
				} else {
					reject(url_api);
				}
			}
		};
		xhttp.open("GET", url_api, false);
		xhttp.send();
	});
};

fetchData(API)
	.then(data => {
		console.log("Primer Llamado...");
		console.log(`Personajes: ${data.info.count}`);
		return fetchData(API + data.results[0].id);
	})
	.then(data => {
		console.log("Segundo Llamado...");
		console.log(`Primer Personaje: ${data.name}`);
		return fetchData(data.origin.url);
	})
	.then(data => {
		console.log("Tercer Llamado...");
		console.log(`Dimensión: ${data.dimension}`);
	})
	.catch(error => {
		console.error("ERROR", error);
	});

// fetchData(API, (error1, data1) => {
// 	if (error1) return console.error(`Error ${error1}`);
// 	console.log("Primer Llamado...");
// 	fetchData(API + data1.results[0].id, (error2, data2) => {
// 		if (error2) return console.error(error1);
// 		console.log("Segundo Llamado...");
// 		fetchData(data2.origin.url, (error3, data3) => {
// 			if (error3) return console.error(error3);
// 			console.log("Tercero Llamado...");
// 			console.log(`Personajes: ${data1.info.count}`);
// 			console.log(`Primer Personaje: ${data2.name}`);
// 			console.log(`Dimensión: ${data3.dimension}`);
// 		});
// 	});
// });
