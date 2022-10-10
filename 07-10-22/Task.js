class Task {
    #day
    #hour
    #place
    #comments
    #type

    constructor(day, hour, place, comments, type) {
        if (day <= 0 || day > 31) throw new Error("Los dias deben ser entre 1 - 31")
        if(hour < 0 || hour > 23) throw new Error ("Las horas válidas son de 0 - 23")
        if(!["reunion", "medico", "clases", "gestiones varias"].includes(type)) throw new Error("Los tipos válidos son reunion, medico, clases, gestiones varias")
 
        this.#day = day
        this.#hour = hour
        this.#place = place 
        this.#comments = comments
        this.#type = type
    }

    get day (){
        return this.#day
    }

    set day (newDay) {
        this.#day = newDay
    }

    get hour () {
        return this.#hour
    }

    set hour (newHour) {
        this.#hour = newHour
    }

}

export default Task