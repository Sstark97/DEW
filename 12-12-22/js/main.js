import { validators, colors } from "./const.js"
import { validateRegex } from "./functions.js"

const regexSelect = document.querySelector('select')
const result = document.querySelector('#result')
const regexUsed = document.querySelector('#regex_used')
const textInput = document.querySelector('input')
const main = document.querySelector('main')

window.addEventListener('load', () => {
    const regexSpan = document.createElement('span')
    regexSpan.id = "regex_span"
    regexSpan.textContent = validators[regexSelect.value]
    regexSpan.className = 'font-bold'

    regexUsed.append(regexSpan)
})

main.addEventListener('click', e => {
    const element = e.target
    const regex = validators[regexSelect.value]
    const text = textInput.value
    const regexSpan = document.querySelector('#regex_span')

    if(element.nodeName === 'BUTTON') {
        const validate = regex.test(text)
        result.textContent = validate ? `El texto ${text} ha pasado la validación` : `El texto ${text} no ha pasado la validación`

        if(validate && result.className.includes(colors.error)) {
            result.className = result.className.replace(colors.error, "")
            result.className += colors.okey
        } else if (!validate && result.className.includes(colors.okey)){
            result.className = result.className.replace(colors.okey, "")
            result.className += colors.error
        } else {
            result.className += validate ? colors.okey : colors.error
        }
    }
    regexSpan.textContent = regex

})