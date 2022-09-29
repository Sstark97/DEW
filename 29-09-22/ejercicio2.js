/*
    Crea un programa que pida por parámetro tu cumpleaños (no hace falta el año) y saque todos
    os años en que tu cumpleaños va a caer en domingo desde este año hasta el año 2100.
*/

const allSundayBirtDay = (month, day) => {
    const year = new Date().getFullYear()
    const sundayYears = []

    for(let currentYear = year; currentYear <= 2100; currentYear++) {
        const currentDate = new Date(currentYear,month,day)
        const currentDay = currentDate.getDay()

        if(currentDay === 0) {
            sundayYears.push(currentDate.getFullYear())
        }
    }
    
    return sundayYears
}

console.log(allSundayBirtDay(6,31))