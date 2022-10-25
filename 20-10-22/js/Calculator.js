class Calculator {
    #memory = []

    sum(x, y) {
        return x + y
    }

    minus(x,y) {
        return x - y
    }

    product(x,y) {
        return x * y
    }

    div(x,y) {
        return x / y
    }

    powToTwo(x) {
        return x ** 2
    }

    sqrt(x) {
        return Math.sqrt(x)
    }

    percent(x) {
        return x / 100
    }

    inverse(x) {
        return 1 / x
    }

    toNegative(x) {
        return -x
    }

    getMemory (pos) {
        return this.#memory[pos]
    }

    getMemoryPos (number) {
        return this.#memory.indexOf(parseFloat(number))
    }

    get memory () {
        return this.#memory
    }

    set memory (x) {
        this.#memory.push(x)
        console.log(this.#memory)
    }

    memoryClear() {
        this.#memory = []
    }

    memorySum(x,pos) {
        return this.#memory[pos] ? this.#memory[pos] + x : x
    }

    memoryLess(x,pos) {
        return this.#memory[pos] ? x - this.#memory[pos] : -x
    }
}

export default Calculator