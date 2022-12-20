const cookieToArray = () => {

    if(!document.cookie) {
        return undefined
    }

    const cookie = document.cookie
    const equal = cookie.indexOf('[')
    const values = cookie.substring(equal + 1, cookie.length - 1)

    return values.split(',')
}

const createHeader = () => {
    const headerExist = document.querySelector("#header_task") 

    if(headerExist) {
        headerExist.delete()
        return
    }

    const header = document.createElement("div")
    const element = document.createElement("div")
    const actions = document.createElement("div")

    element.textContent = "Productos"
    element.className = "w-3/4 pl-6 text-lg font-bold"

    actions.textContent = "Acciones"
    actions.className = "w-1/4 pr-6 text-lg font-bold"

    header.className = "mt-5 w-full flex justify-center items-center border-b-2 border-slate-200 pb-3"

    header.append(element, actions)

    return header
}

const createTable = (values, container) => {
    container.innerHTML = "";
    container.append(createHeader())

    values.forEach( (value, index) => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const btn = document.createElement("button");
        const icon = document.createElement("i");

        container.className = "mt-4 flex flex-col justify-center items-center w-5/12 border border-slate-200 rounded";

        icon.className = "bx bx-trash bg-red-400 p-2 rounded delete"
        icon.id = index

        btn.append(icon);
        btn.className = "w-1/4 pr-6";
        p.textContent = value;
        p.className = "w-3/4 pl-6";

        div.append(p, btn);
        div.className = "mt-5 w-full flex justify-center items-center border-b-2 border-slate-200 pb-3";
    
        container.append(div);
    })
}

export {
    cookieToArray,
    createTable
}