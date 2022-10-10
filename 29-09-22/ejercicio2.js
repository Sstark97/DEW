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

const printSundayBirthay = birthday => {
    let res = "Mi cumpleaños cae domingo los años: "
    birthday.forEach(year => res += `${year}, `)
    res = res.substring(0, res.length -2)

    return res
}

const birthday = allSundayBirtDay(6,31)

console.log(printSundayBirthay(birthday))