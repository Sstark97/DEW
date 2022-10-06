/*
    Diseña una clase “Colegio” y otra “Alumno”. La clase colegio tendrá como atributos “nombre”,
    “numeroAulas” y “numeroAlumnos”. Cada alumno se representará como un objeto de la clase
    “Alumno”. En ella se guardarán los atributos “DNI”, “nombre” y “notaMedia”.
    • Implementa métodos en las clases anteriores para modificar la nota media.
*/

class Colegio {
    #name
    #roomNumbers
    #studenNumbers

    constructor(name, roomNumbers, studentNumbers) {
        this.#name = name
        this.#roomNumbers = roomNumbers
        this.#studenNumbers = studentNumbers
    }

    get name () {
        return this.#name
    }

    get roomNumbers () {
        return this.#roomNumbers
    }

    get studentNumbers () {
        return this.#studenNumbers
    }

}

class Student {
    #dni
    #name
    #averageNote

    constructor(dni, name, averageNote) {
        this.#dni = dni
        this.#name = name
        this.#averageNote = averageNote
    }

    get name () {
        return this.#name
    }

    get dni () {
        return this.#dni
    }

    set averageNote (newAverageNote) {
        this.#averageNote = newAverageNote
    }

    get averageNote () {
        return this.#averageNote
    }
}

const student = new Student("1232434", "Pepe", 2.3)

student.averageNote = 3
console.log(student.dni)