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
    "MC": memory => {
        calculator.memoryClear()
        memory.innerHTML = ""
    },
    "MR": (pos) => calculator.getMemory(pos),
    "M+": (x,pos) => calculator.memorySum(parseFloat(x),pos),
    "M-": (x, pos, cond) => calculator.memoryLess(parseFloat(x),pos,cond),
    "MS": number => calculator.memory = number,
    "MEMORY_POS": number => calculator.getMemoryPos(number),
    "UPDATE_MEMORY": (number, pos) => calculator.updateMemory(number,pos),
    "REMOVE_MEMORY": pos => calculator.removeElementInMemory(pos)
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