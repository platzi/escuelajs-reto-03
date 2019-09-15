//Usé el browser para correr y corregir este script. Razón por la cual el require no está presente.

var API = 'https://rickandmortyapi.com/api/character/';

const fetchData = url_api => {
	return new Promise((resolve, reject) => {
		var xhttp = new XMLHttpRequest();
		xhttp.responseType = 'json';

		xhttp.onreadystatechange = function(event) {
			if (xhttp.readyState === 4) {
				if (xhttp.status == 200) resolve(xhttp.response);
				else return callback(url_api);
			}
		};
		xhttp.open('GET', url_api, true);
		xhttp.send();
	});
};

async function getRickandMortyData() {
	try {
		console.log(`Primer Llamado...`);
		let characterData = await fetchData(API);

		console.log(`Segundo Llamado...`);
		let getCharacter = await fetchData(API + characterData.results[0].id);

		console.log(`Tercer Llamado...`);
		let getDimension = await fetchData(getCharacter.origin.url);

		console.log(`El número de personajes en R&M son: ${characterData.info.count}`);
		console.log(`El personaje #${getCharacter.id} es: ${getCharacter.name}`);
		console.log(`La dimensión en la que ${getCharacter.name} vive es: ${getDimension.dimension}`);
	} catch (error) {
		console.log(error.message);
	}
}

getRickandMortyData();
