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
    if(values.length === 0) {
        container.textContent = "No hay elementos en el carrito"
        return
    }

    const elements = [];
    container.innerHTML = "";
    container.className += values.length !== 0 ? "border border-slate-200 rounded" : null;
    container.append(createHeader());

    values.forEach( (value, index) => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const btn = document.createElement("button");
        const icon = document.createElement("i");

        div.className = "mt-5 w-full flex justify-center items-center border-b-2 border-slate-200 pb-3";
        p.className = "w-3/4 pl-6";
        btn.className = "w-1/4 pr-6";
        icon.className = "bx bx-trash bg-red-400 p-2 rounded delete"
        
        icon.id = index
        p.textContent = value;

        btn.append(icon);
        div.append(p, btn);
    
        elements.push(div);
    })

    container.append(...elements)
}

export {
    cookieToArray,
    createTable
}