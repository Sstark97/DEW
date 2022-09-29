/*
    Crea un programa que muestre la fecha actual en diferentes formatos, según el valor que meta
    el usuario por parámetro:
*/

const getDateInFormat = format => {
    const options = { year: 'numeric', month: '2-digit', day: 'numeric' };
    const today  = new Date();
    
    console.log(today.toLocaleDateString("es-ES",options)); // 9/17/2016
}

getDateInFormat()