import Calculator from "./Calculator.js";

const calculator = new Calculator()
const calculatorState = {
    firstNumber: "",
    operator: "",
    secondNumber: ""
}

const calculatorDOM = document.querySelector("main div")
const output = document.querySelector("output")

const updateOutput = value => {
    output.textContent = value
}

const updateCalculatorState = (first = "",operator = "",second = "") => {
    calculatorState.firstNumber = first
    calculatorState.operator = operator
    calculatorState.secondNumber = second
}

const cOperation = () => {
    output.textContent = "0"
    updateCalculatorState("", "", "")
}

const ceOperation = (firstNumber, operator) => {
    if(operator !== "") {
        updateCalculatorState(firstNumber, operator, "")
        updateOutput(`${firstNumber}${operator}`)
    } else {
        cOperation()
        updateCalculatorState("","", "")
    }
}

const deleteOperation = () => {
    if(output.textContent !== 0) {
        const deleteStr = output.textContent.substring(0, output.textContent.length - 1)
        const [first, operator, second] = deleteStr.split(" ")

        updateOutput(deleteStr !== "" ? deleteStr : "0")
        updateCalculatorState(first, operator ?? "", second ?? "")
    }
}

const operations = {
    "+": (x,y) => calculator.sum(x,y),
    "-": (x,y) => calculator.minus(x,y),
    "*": (x, y) => calculator.product(x,y),
    "/": (x, y) => calculator.div(x,y),
    "%": x => calculator.percent(x),
    "x2": x => calculator.powToTwo(x),
    "2√x": x => calculator.sqrt(x),
    "1/x": x => calculator.inverse(x),
    "+/-": x => calculator.toNegative(x)
} 

const deleteOps = {
    "C": () => cOperation(),
    "CE": (firstNumber, operator) => ceOperation(firstNumber, operator),
    "delete": () => deleteOperation()
}

const isNumber = (elementText, number) => /[0-9]$/.test(elementText) || elementText === "." && !number.includes(".")

const isOperator = elementText => /[\+\-\/\*\^\%]/g.test(elementText) || ["%", "x2", "2√x", "1/x", "+/-"].includes(elementText)

calculatorDOM.addEventListener("click", e => {
    const element = e.target
    let { firstNumber, operator, secondNumber } = calculatorState

    if(element.nodeName === "BUTTON" && output.textContent.length < 12) {
        const elementName = element.name
        const elementText = element.textContent

        if(deleteOps[elementName]) {
            elementName === "CE" ? deleteOps[elementName](firstNumber,operator) : deleteOps[elementName]() 
        } else {

            if(operator === "" && isNumber(elementText, firstNumber)) {
                firstNumber += elementText
            }
            
            if(firstNumber !== ""  && isOperator(elementText)) {
                operator = elementText
            }
            
            if(operator !== "" && isNumber(elementText, secondNumber)){
                secondNumber += elementText
            }

            if(firstNumber !== "" && ["%", "x2", "2√x", "1/x", "+/-"].includes(operator)) {
                const firts = parseFloat(firstNumber)
                const res = operations[operator](firts).toFixed(2)

                updateOutput(res)
                firstNumber = res
                secondNumber = ""
                operator = ""
            }

            if(firstNumber !== "" && operator !== "" && secondNumber !== "" && elementText === "=" ) {
                const firts = parseFloat(firstNumber)
                const second = parseFloat(secondNumber)
                const res = operations[operator](firts, second).toFixed(2)

                updateOutput(res)
                firstNumber = res
                secondNumber = ""
                operator = ""
            } 

            if(firstNumber !== "" && output.textContent !== "0" && element.name === "delete") {
                firstNumber = firstNumber.substring(0, firstNumber.substring(0, firstNumber.length -1))
            }
            
            updateOutput(`${firstNumber}${operator}${secondNumber}`)
            updateCalculatorState(firstNumber, operator, secondNumber)
        }
    }
})