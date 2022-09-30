/*
    Crea un programa que muestre la fecha actual en diferentes formatos, según el valor que meta
    el usuario por parámetro:
*/

const getDateInFormat = format => {
    const language = format === 2 ? "es-ES" : "en-US"

    const commonOptions = {
        year: 'numeric', month: 'long', day: 'numeric', weekday: "long" 
    }
    const allOptions = {
        1: { year: 'numeric', month: '2-digit', day: 'numeric' },
        2: {...commonOptions},
        3: {...commonOptions}
    }

    const today  = new Date();
    
    console.log(today.toLocaleDateString(language,allOptions[format]))
}

getDateInFormat(3)