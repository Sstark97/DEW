const arr =  Array.from({ length: 51 }, (value, index) => index);
arr.shift()

const API_URI = `https://rickandmortyapi.com/api/character/${arr}`

export {
    API_URI
}