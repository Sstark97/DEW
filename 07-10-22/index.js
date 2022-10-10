import Schedule from "./Schedule.js"
import Task from "./Task.js"

const schedule = new Schedule()

const showTasksMenu = () => {
    const tasks = schedule.tasks
    const taskString = "Las tareas son: \n"

    tasks.forEach((task, id) => taskString += `Task ${id} day: ${task.day} hour: ${task.hour}\n`)

    return taskString
}

const addTaskMenu = () => {
    const day = prompt("Digame un día (1-31)")
    const hour = prompt("Digame una hora (0-23)")
    const place = prompt("Indiqueme el lugar")
    const comments = prompt("Escriba los comentarios de la tarea")
    const type = prompt("Indique el tipo de tarea (reunion, medico, clases, gestiones varias)")

    try {
        const task = new Task(day, hour, place, comments, type)
        const res = schedule.addTask(task)

        alert(res)
    } catch (e) {
        alert(e)
    }
}

const removeTaskMenu = () => {
    const day = prompt("Digame un día (1-31)")
    const hour = prompt("Digame una hora (0-23)")

    const resRemove = schedule.removeTask(day, hour)

    alert(resRemove)
}

const removeTaskPassMenu = () => {
    const resRemoveAll = schedule.removeTaskPass()

    alert(resRemoveAll)
}

const menu = {
    1: () => showTasksMenu(),
    2: () => addTaskMenu(),
    3: () => removeTaskMenu(),
    4: () => removeTaskPassMenu()
}

const todo1 = addTaskMenu(23,2,"","","reunion")
const todo2 = new Task(23,3,"","","reunion")
const todo3 = new Task(23,4,"","","reunion")

// schedule.addTask(todo1)
// schedule.addTask(todo2)
// schedule.addTask(todo3)

// schedule.removeTask(23,4)
schedule.showTasks()