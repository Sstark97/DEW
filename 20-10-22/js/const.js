import Calculator from "./Calculator.js"
import { cOperation, ceOperation, deleteOperation } from "./functions.js"

const calculator = new Calculator()

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
    "C": output => cOperation(output),
    "CE": (output, firstNumber, operator) => ceOperation(output, firstNumber, operator),
    "delete": output => deleteOperation(output)
}

const memoryOptions = {
    "MC": () => calculator.memoryClear(),
    "MR": () => calculator.memory,
    "M+": x => calculator.memorySum(parseFloat(x)),
    "M-": x => calculator.memorySum(parseFloat(-x)),
    "MS": number => calculator.memory = number,
}

const calculatorState = {
    firstNumber: "",
    operator: "",
    secondNumber: ""
}

export {
    operations,
    calculatorState,
    deleteOps,
    memoryOptions
}