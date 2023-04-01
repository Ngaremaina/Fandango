let apiURL = "http://localhost:3000/films"

const fetchData = () =>{
    fetch(apiURL)
    .then(res => res.json())
    .then(data => {
        listNames(data)
        fetchFirstData(data)
    })
}
const listNames = (value)=>{
    value.forEach(element => {
        let titleContainer = document.querySelector(".side-bar")    
        let names=document.createElement("a")
        names.innerText = element.title
        titleContainer.appendChild(names)
    })
}


const detailDescription = (value) => {
    let card = document.querySelector(".card")
    let image = document.createElement("img")
    let title= document.createElement("h4")
    image.src = value.poster
    title.innerText = value.title
    card.appendChild(image)
    card.appendChild(title) 
    

}


const fetchFirstData = (value) => {
    let first = value[0]
    console.log(first)
    detailDescription(first)
}

document.addEventListener('DOMContentLoaded',fetchData)






// const listNames = (value)=>{
//     let titleContainer = document.querySelector(".side-bar")    
//     let names=document.createElement("a")
//     names.innerText = value.title
//     titleContainer.appendChild(names)

//     names.addEventListener('click', () => {
//         let card = document.querySelector(".card")
//         let image = document.createElement("img")
//         let title= document.createElement("h4")
//         image.src = value.poster
//         title.innerText = value.title
//         card.appendChild(image)
//         card.appendChild(title)
//     }, {once: true})
    
// }