/*
    Escribe una función Javascript que encuentre los elementos únicos de dos
    arrays.
*/

const foundUniqueElements = (arr,arr2) => [...new Set([...arr, ...arr2])]

console.log(foundUniqueElements([1,2,3,4,5],[2,3,5,8,9,12,1]))