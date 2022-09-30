/*
    Crea un programa que muestre la fecha actual en diferentes formatos, según el valor que meta
    el usuario por parámetro:
*/

const commonOptions = {
    year: 'numeric', month: 'long', day: 'numeric', weekday: "long" 
}
const allOptions = {
    1: { year: 'numeric', month: '2-digit', day: 'numeric' },
    2: {...commonOptions},
    3: {...commonOptions}
}

const comprobeFormat = format => {
    if(![1,2,3].includes(format)) {
        return `${format} no es un formato disponible, escriba un formato válido:
        1: 17/02/2016
        2: Miércoles, 17 de febrero de 2016
        3: Wednesday, February 17, 2016
        `
    }

    return ""
}

const getDateInFormat = format => {
    const formatComprobe = comprobeFormat(format)

    if(formatComprobe !== "") {
        return formatComprobe
    }

    const language = format === 2 ? "es-ES" : "en-US"

    const today  = new Date()
    
    return today.toLocaleDateString(language,allOptions[format])
}

console.log(getDateInFormat(1))