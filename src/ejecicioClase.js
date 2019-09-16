const fetchData = () => {
  let xhttp = new XMLHttpRequest();
  //Elemento para detectar un cambio.
  xhttp.onreadystatechange = event => {
    //readystate me informa como responde o donde esta mi intencion.
    /**
     * espero estatus 4. Solo meresponde entre 0 y 4
     * 4: done
     */

    if (xhttp.readyState === 4) {
      //comprueba que retorna el servidor.
      /**
       * 200: es correcta la peticion
       * 300: redireccion.
       * 400: error con una direccion que no existe. not found.
       * 500: error del servidor
       */
      if (xhttp.status === 200) {
        //
        console.log(xhttp.responseText);
      } else {
        console.error("Error!");
      }
    }
  };
  xhttp.open("GET", "https://rickandmortyapi.com/api/character/");
  xhttp.send();
};

fetchData();
