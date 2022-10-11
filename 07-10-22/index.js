import Schedule from "./Schedule.js"
import Task from "./Task.js"

const schedule = new Schedule()
schedule.addTask(new Task(2,3,"LPA","Nada", "reunion"))
schedule.addTask(new Task(4,3,"LPA","Nada", "medico"))
schedule.addTask(new Task(5,4,"LPA","Nada", "clases"))
schedule.addTask(new Task(10,8,"LPA","Nada", "gestiones varias"))
schedule.addTask(new Task(2,3,"LPA","Nada", "reunion"))

const showTasksMenu = () => {
    const tasks = schedule.tasks
    let taskString = tasks.length === 0 ? "No hay tareas" : "Las tareas son: \n"

    tasks.forEach((task, id) => taskString += `Tarea ${id} ${task.toString()}\n`)

    alert(taskString)
}

const addTaskMenu = () => {
    const day = parseInt(prompt("Digame un día (1-31)"))
    const hour = parseInt(prompt("Digame una hora (0-23)"))
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
    const day = parseInt(prompt("Digame un día (1-31)"))
    const hour = parseInt(prompt("Digame una hora (0-23)"))

    const resRemove = schedule.removeTask(day, hour)

    alert(resRemove)
}

const removeTaskPassMenu = () => {
    const resRemoveAll = schedule.removeTaskPass()

    alert(resRemoveAll)
}

const showTasksMenuInOrder = () => {
    const tasks = schedule.showTaskInOrder()
    let taskString = "Las tareas en orden son: \n"

    tasks.forEach((task, id) => taskString += `Task ${id} day: ${task.day} hour: ${task.hour}\n`)

    alert(taskString)
}

const menu = {
    1: () => showTasksMenu(),
    2: () => addTaskMenu(),
    3: () => removeTaskMenu(),
    4: () => removeTaskPassMenu(),
    5: () => showTasksMenuInOrder()
}

const appOptions = [
    "Agenda",
    "Seleccione la operación a realizar(Escriba un número)",
    "1) Ver las tareas",
    "2) Añadir Tarea",
    "3) Eliminar Tareas",
    "4) Eliminar Tareas Antiguas",
    "5) Ver tareas ordenadas",
    "6) Salir de la App",
]

const scheduleManager = () => {
    while (true) {
        const option = parseInt(prompt(appOptions.join("\n")));
    
        if (option === 6) break;
    
        if (menu[option] !== undefined) {
          menu[option]();
        } else {
          alert("La opción no es válida");
        }
      }
}

scheduleManager()
