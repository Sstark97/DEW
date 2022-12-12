const validateRegex = (text, regex) => regex.test(text) ? `El texto ${text} ha pasado la validación` : `El texto ${text} no ha pasado la validación`

export {
    validateRegex
}