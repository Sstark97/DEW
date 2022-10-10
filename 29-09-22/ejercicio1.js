/*
    Crea un programa que pida muestre el número de días que quedan desde hoy hasta el fin de
    curso (por ejemplo, el 24 de junio).
*/

const dateToFinishCourse = () => {
    const dateToday = new Date()
    const dateToFinish = new Date("2023/06/24")

    const days = ((dateToFinish.getTime() - dateToday.getTime()) / 86_400_000).toFixed()

    return `Quedan ${days} días de clase`
}

console.log(dateToFinishCourse())