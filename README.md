# escuelajs-reto-03
Reto 3 Septiembre 14: Curso de Fundamentos de JavaScript

# Instalación

```
npm install
```
# Ejecución

```
npm run start
```

### Primer problema
La aplicación tiene errores que no permiten ejecutarla, lee detenidamente el código y determina dónde se encuentran al ejecutarlo en la consola.

-Primer error detectado: Se encontro que la comparacion xhttp.readyState === '4' no era valida por que la funcion regresa un valor numerico, por lo que al hacer la comparación estricta nunca daba verdadero
-Segundo error detectado: Se tuvo que utilizar la funcion JSON.parser para convertir el string que se recibe de la API para convertirlo en un objeto y asi poder procesarlo de tal forma

### Segundo Problema
Una vez que tu aplicación ya esté funcionando convierte el código a ECMAScript 6 (ES6)
* Arrow Functions
* Template Strings

### Tercer Problema
Transforma el código escrito en ECMAScript6(ES6) para que funcione con promesas y así evitar el Callback Hell del final.

# Contributing
If someone wants to add or improve something, I invite you to collaborate directly in this repository: [escuelajs-reto-03](https://github.com/platzi/escuelajs-reto-03/)

# License
escuelajs-reto-03 is released under the [MIT License](https://opensource.org/licenses/MIT).
