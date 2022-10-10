class Schedule {
    #tasks = []

    get tasks (){
        return this.#tasks
    }

    showTasks () {
        this.#tasks.forEach((task, id) => console.log(`Task ${id} day: ${task.day} hour: ${task.hour}`))
    }

    addTask (newTask) {
        if(!this.#tasks.some(task => task.day === newTask.day && task.hour === newTask.hour)) {
            this.#tasks = [...this.#tasks,newTask]
            return "Tarea añadida con éxito"
        }

        return `Tiene una tarea el día ${newTask.day} a las ${newTask.hour}h` 
    } 

    removeTask (day, hour) {
        if(this.#tasks.some(task => task.day === day && task.hour === hour)) {
            this.#tasks = this.#tasks.filter(task => !(task.day === day && task.hour === hour))
            return "Tarea eliminada con éxito!"
        }

        return `No tiene tareas el día ${newTask.day} a las ${newTask.hour}h` 
    }

    removeTaskPass () {
        const toDay = new Date()
        const hour = toDay.getHours()
        const day = toDay.getDate()
        const taskLength = this.#tasks.length

        this.#tasks = this.#tasks.filter(task => task.day > day && task.hour < hour)

        return taskLength > this.#tasks.length ? `No tienes tareas antes del ${toDay}` : "Tareas antiguas borradas con éxito"
    }

    showTaskInOrder () {
        const inOrder = this.#tasks.sort((a,b) => {
            if(a.day > b.day || (a.day === b.day && a.hour > b.hour)) {
                return 1
            } else {
                return -1
            }
        })

        return inOrder
    }
}

export default Schedule