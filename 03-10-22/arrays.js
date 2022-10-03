/*
    Vamos a gestionar una lista de países haciendo uso de Arrays. Para ello necesitarás crear un
    archivo arrays.js que incluya las siguientes funciones:
*/

//  Mostrar el número de elementos del array.
const len = arr => arr.length

// Muestra todos los elementos del array
const show = arr => console.log(arr)

// Muestra los elementos del array en sentido inverso.
const reverse = arr => console.log(arr.reverse())

// Muestra los elementos del array ordenados alfabéticamente (pero no los ordena)
const sortAlphebetic = arr => console.log(arr.sort((a, b) => a + b))

// Añadir un elemento al principio del array.
const addElement = (arr, elem) => arr.unshift(elem)

// Añadir un elemento al final del array
const addToEnd = (arr, elem) => arr.push(elem)

// Borrar un elemento al principio del array (y decir cuál se ha borrado).
const remove = arr => arr.shift()

//  Borrar un elemento al final del array (y decir cuál se ha borrado)
const removeToEnd = arr => arr.pop()

// Muestra el elemento que se encuentra en una posición que el usuario indica.
const showElement = (arr, pos) => arr.at(pos)

// Muestra la posición en la que se encuentra un elemento que le indica el usuario.
const showElementPos = (arr, elem) => arr.indexOf(elem)

// Muestra los elementos que se encuentran en un intervalo que indique el usuario
const showIntervalArray = (arr,start,end) => arr.slice(start, end + 1)