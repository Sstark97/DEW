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

const cOperation = () => {
    output.textContent = "0"
}

calculatorDOM.addEventListener("click", e => {
    const element = e.target
    let { firstNumber, operator, secondNumber } = calculatorState

    if(element.nodeName === "BUTTON" && output.textContent.length < 12) {
        if(element.textContent === "C") {
            cOperation()
            updateCalculatorState("", "", "")
        } else if(element.textContent === "CE") {
            if(operator !== "") {
                updateCalculatorState(firstNumber, operator, "")
                updateOutput(`${firstNumber}${operator}`)
            } else {
                cOperation()
                updateCalculatorState("","", "")
            }
        } else if(element.name === "delete" && output.textContent !== 0) {
            const deleteStr = output.textContent.substring(0, output.textContent.length - 1)
            const [first, operator, second] = deleteStr.split(" ")

            updateOutput(deleteStr !== "" ? deleteStr : "0")
            updateCalculatorState(first, operator ?? "", second ?? "")
        }
        
        else {

            if(operator === "" && (/[0-9]$/.test(element.textContent) || element.textContent === "." && !firstNumber.includes(".")) ) {
                firstNumber += element.textContent
            }
            
            if(firstNumber !== "" && operator === ""  && (/[\+\-\/\*\^\%]/g.test(element.textContent) || ["%", "x2", "2√x", "1/x", "+/-"].includes(element.textContent))) {
                operator = element.textContent
            }
            
            if(operator !== "" && (/[0-9]$/.test(element.textContent) || element.textContent === ".") && !secondNumber.includes(".")){
                secondNumber += element.textContent
            }

            if(firstNumber !== "" && ["%", "x2", "2√x", "1/x", "+/-"].includes(operator)) {
                const firts = parseFloat(firstNumber)
                const res = operations[operator](firts).toFixed(2)

                updateOutput(res)
                firstNumber = res
                secondNumber = ""
                operator = ""
            }

            if(firstNumber !== "" && operator !== "" && secondNumber !== "" && element.textContent === "=" ) {
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