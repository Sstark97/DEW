import { validators } from "./const.js"
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
        result.textContent = validateRegex(text, regex)
    }
    regexSpan.textContent = regex

})