const createElements = (value)=>{
    let titleContainer = document.querySelector(".side-bar")    
    let names=document.createElement("a")
    names.innerText = value.title
    titleContainer.appendChild(names)
}
const fetchData = () =>{
    fetch("http://localhost:3000/films")
    .then(res => res.json())
    .then(data => data.forEach(value => createElements(value)))
}
document.addEventListener('DOMContentLoaded',fetchData)