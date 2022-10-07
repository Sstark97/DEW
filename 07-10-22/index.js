import Schedule from "./Schedule.js"
import Task from "./Task.js"

const schedule = new Schedule()

const showAgenda = schedule => schedule.showTasks() 

const addTask = (day, hour, place, comments, type) => schedule.addTask(new Task(day, hour, place, comments, type))

const todo1 = new Task(23,2,"","","reunion")
const todo2 = new Task(23,3,"","","reunion")
const todo3 = new Task(23,4,"","","reunion")

schedule.addTask(todo1)
schedule.addTask(todo2)
schedule.addTask(todo3)

schedule.removeTask(23,4)
schedule.showTasks()