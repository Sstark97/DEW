/*
    Realiza una función Javascript que mezcle dos arrays y elimine todos los
    elementos duplicados.
*/

const mixArray = (arr,arr2) => {
    const allArray = [...arr, ...arr2]

    return  allArray.filter((num, index) => !allArray.some((n, i) => n === num && i !== index))
}

console.log(mixArray([1,2,3,4,5],[2,3,5,8,9,12,1]))