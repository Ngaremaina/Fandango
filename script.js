let apiURL = "http://localhost:3000/films"
// let filmobj = {
//     id:"",
//     title:"",
//     runtime: "",
//     capacity:"",
//     showtime: "",
//     tickets_sold:"",
//     description:"",
//     poster:"", 
// }

const fetchData = () =>{
    fetch(apiURL)
    .then(res => res.json())
    .then(data => {
        listNames(data)
        fetchFirstData(data)
    })
}

const fetchFirstData = (value) => {
    let first = value[0]
    // console.log(first)
    detailDescription(first)
}

const listNames = (value)=>{
    value.forEach(element => {
        let titleContainer = document.querySelector(".side-bar")    
        let names=document.createElement("a")
        // filmobj.title = element.title
        names.innerHTML = element.title
        titleContainer.appendChild(names)

        // names.addEventListener("click", result => detailDescription(result))
    })
}

const detailDescription = (value) => {
    let card = document.querySelector(".card")
    let container = document.querySelector(".card-details")
    let image = document.createElement("img")
    let title= document.createElement("h4")
    let description = document.createElement("p")
    let runtime = document.createElement("p")
    let showtime=document.createElement("p")
    let availableTickets =document.createElement("p")
    let buyTickets = document.createElement("button")
    
    // filmobj.poster = value.poster
    // filmobj.description = value.description
    // filmobj.runtime = value.runtime
    // filmobj.showtime = value.showtime
    // filmobj.capacity = value.capacity

    image.src = value.poster
    title.innerText = value.title
    description.innerText = value.description
    runtime.innerText = `Duration: ${value.runtime} minutes`
    showtime.innerText = `Time: ${value.showtime}`

    let diff = parseInt(value.capacity) - parseInt(value.tickets_sold)
    availableTickets.innerText = `Available Tickets: ${diff}`

    if (diff <= 0){
        buyTickets.innerText = "SOLD OUT"
        buyTickets.disabled = true
    }
    else{
        buyTickets.innerText = "Buy Ticket"
    }

    card.appendChild(image)
    container.appendChild(title) 
    container.appendChild(description) 
    container.appendChild(runtime) 
    container.appendChild(showtime) 
    container.appendChild(availableTickets)
    container.appendChild(buyTickets) 
    
    buyTickets.addEventListener('click', (e) => {
        value.tickets_sold ++
        let tickets_sold = value.tickets_sold
        let posId = value.id
        console.log(tickets_sold, posId)
        updateTicketNum(posId, {tickets_sold})      
        
    })
}

const updateTicketNum = (id, value) =>{
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(value)
    }
    fetch(`http://localhost:3000/films/${id}`, options)
    .then(res => res.json)
}

document.addEventListener('DOMContentLoaded',fetchData)
