/*
    Diseña las clases “Aeropuerto” y “Vuelo”. Tendrá como atributos “nombre”, “ciudad” y
    “numeroVuelosDiarios”. Cada vuelo diario se representará como un objeto de la clase “Vuelo”.
    En ella se guardarán los atributos “codigo”, “hora_llegada” y “hora_salida”.
    • Implementa métodos en aeropuerto y vuelo para modificar la hora de llegada,
    para modificar la hora de salida y para comprobar si la hora de salida es
    posterior a la hora de llegada.
*/

class Airport {
    #name
    #city
    #numFlightsDay

    constructor(name, city, numFlightDay) {
        this.#name = name
        this.#city = city
        this.#numFlightsDay = numFlightsDay
    }

    get name () {
        return this.#name
    }

    get city () {
        return this.#city
    }

    get numFlightsDay () {
        return this.#numFlightsDay
    }
}

class Flight {
    #cod
    #arrivalTime
    #outTime

    constructor(cod, arrivalTime, outTime) {
        this.#cod = cod
        this.#arrivalTime = arrivalTime
        this.#outTime = outTime
    }

    get cod () {
        return this.#cod
    }

    get arrivalTime () {
        return this.#arrivalTime
    }

    set arrivalTime (newArrivalTime) {
        this.#arrivalTime = newArrivalTime
    }

    get outTime () {
        return this.#outTime
    }

    set outTime (newOutTime) {
        this.#outTime = newOutTime
    }

    outIsGratterThanArrival () {
        return this.#outTime > this.#outTime
    }
}