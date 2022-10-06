/*
    Diseña una clase “Hospital”. Tendrá como atributos “nombre”, “ciudad” y “numPacientes”
    (número de pacientes ingresados). Cada paciente se representará como un objeto de la clase
    “Paciente”. En ella se guardarán los atributos “DNI”, “nombre”, “enfermedad”.
    • Implementa un método en “Hospital” que reciba el código de paciente y se le de
    alta a dicho paciente (equivale a eliminar al paciente)
*/

class Hospital {
    #name
    #city
    #patientsNum

    constructor(name, city, patientsNum) {
        this.#name = name
        this.#city = city
        this.#patientsNum = patientsNum
    }

    get name () {
        return this.#name
    }

    get city () {
        return this.#city
    }

    get patientsNum () {
        return this.#patientsNum 
    }

    removePatient(patientCode) {
        this.#patientsNum = this.#patientsNum.filter(patient => patient.dni !== patientCode)
    }

    showPatients() {
        this.#patientsNum.forEach(patient => console.log(patient.toString()))
    }
}

class Patient {
    #dni
    #name
    #illness

    constructor(dni, name, illness) {
        this.#dni = dni
        this.#name = name
        this.#illness = illness
    }

    get name () {
        return this.#name
    }

    get dni () {
        return this.#dni
    }

    get illness () {
        return this.#illness
    }

    toString() {
        return `${this.#name} ${this.#dni} ${this.#illness}`
    }
}

const patient1 = new Patient("12345", "Pepe", "Diabetes")
const patient2 = new Patient("12346", "Paco", "Resfriado")

const hospital = new Hospital("Negrin", "LPA", [patient1, patient2])

console.log("Hospital antes")
console.log(hospital.showPatients())
console.log("\nHospital después")
hospital.removePatient("12345")
console.log(hospital.showPatients())
