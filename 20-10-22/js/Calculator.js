class Calculator {
    #memory = 0

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

    get memory () {
        return this.#memory
    }

    set memory (x) {
        this.#memory = x
    }

    memoryClear() {
        this.#memory = 0
    }

    memorySum(x) {
        this.#memory += x
    }

    memoryLess(x) {
        this.#memory -= x
    }
}

export default Calculator