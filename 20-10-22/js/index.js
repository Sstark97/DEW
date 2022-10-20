import Calculator from "./Calculator.js";

const calculator = new Calculator()

const calculatorDOM = document.querySelector("main div")
const output = document.querySelector("output")

calculatorDOM.addEventListener("click", e => {
    const element = e.target

    if(element.nodeName === "BUTTON" && /[0-9]$/.test(element.textContent) || element.textContent === ",") {
        if(output.textContent.length < 12) {
            output.textContent = output.textContent != 0 ? output.value + element.textContent : element.textContent
        }
    }
})