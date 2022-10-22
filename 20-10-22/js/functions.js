import { calculatorState } from "./const.js"

const isNumber = (elementText, number) => /[0-9]$/.test(elementText) || elementText === "." && !number.includes(".")

const isOneElementOperation = operator => ["%", "x2", "2√x", "1/x", "+/-"].includes(operator)

const isOperator = operator => /[\+\-\/\*\^\%]/g.test(operator) || isOneElementOperation(operator)

const resolveOperation = (firstNumber, operator, secondNumber, elementText) => firstNumber !== "" && operator !== "" && secondNumber !== "" && elementText === "="

const updateCalculatorState = (first = "",operator = "",second = "") => {
    calculatorState.firstNumber = first
    calculatorState.operator = operator
    calculatorState.secondNumber = second
}

const updateOutput = (output, value) => {
    output.textContent = value
}

const cOperation = output => {
    output.textContent = "0"
    updateCalculatorState("", "", "")
}

const ceOperation = (output, firstNumber, operator) => {
    if(operator !== "") {
        updateCalculatorState(firstNumber, operator, "")
        updateOutput(output, `${firstNumber}${operator}`)
    } else {
        cOperation(output)
        updateCalculatorState("","", "")
    }
}

const deleteOperation = output => {
    if(output.textContent !== 0) {
        const deleteStr = output.textContent.substring(0, output.textContent.length - 1)
        const [first, operator, second] = deleteStr.split(" ")

        updateOutput(output,deleteStr !== "" ? deleteStr : "0")
        updateCalculatorState(first, operator ?? "", second ?? "")
    }
}

export {
    isNumber,
    isOneElementOperation,
    isOperator,
    resolveOperation,
    updateCalculatorState,
    updateOutput,
    ceOperation,
    cOperation,
    deleteOperation
}