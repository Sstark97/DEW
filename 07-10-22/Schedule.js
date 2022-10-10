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

        return `Tiene una tarea el día ${newTask.day} at¡ las ${newTask.hour}h` 
    } 

    removeTask (day, hour) {
        if(this.#tasks.some(task => task.day === day && task.hour === hour)) {
            this.#tasks = this.#tasks.filter(task => !(task.day === day && task.hour === hour))
            console.log("Remove the Task succesfully")
        }

        return `You not have a Task in ${day} at ${hour}h` 
    }

    removeTaskPass () {
        const toDay = new Date()
        const hour = toDay.getHours()
        const day = toDay.getDate()

        this.#tasks = this.#tasks.filter(task => task.day > day && task.hour < hour)
        console.log("Remove old tasks succesfully")

        return `You not have a Task before ${toDay}` 
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