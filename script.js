const loadData = (searchName) =>{
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchName}`
    fetch(url)
    .then(res =>res.json())
    .then(data => displayLeft(data.player))
}
const displayLeft = (data) =>{
    const gridContainer  = document.getElementById("grid-container")
    gridContainer.innerHTML = ''
    for(let players of data){
        const description = players.strDescriptionEN;
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl">
        <figure><img class ="w-full h-80" src="${players.strThumb ? players.strThumb : "https://picsum.photos/seed/picsum/200/300"}" alt="players" /></figure>
        <div class="card-body">
          <h2 class="card-title">${players.strPlayer}</h2>
          <p class="text-xl">${players.strNationality}</p>
          <div class="card-actions">
            <button onclick = "details(${players.idPlayer})" class="btn bg-amber-400 border-0">Details</button>  
            <button onclick ="deleteData()" class="btn bg-cyan-400 border-0">Delete</button>
        </div>
    </div>
        `
     gridContainer.appendChild(div)
    }
}
const details = (id) =>{
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayRight(data.players[0]))
}

const rightConatiner = document.getElementById("right-container");
const displayRight = data =>{
    rightConatiner.innerHTML = ''
    if(data.strGender === "Male"){
        document.getElementById("male").classList.remove("hidden")
        document.getElementById("female").classList.add("hidden")
    }else{
        document.getElementById("female").classList.remove("hidden") 
        document.getElementById("male").classList.add("hidden")
    }
    const div = document.createElement("div");
    div.innerHTML=`
    <div class="card lg:card-side bg-base-100 mb-5 shadow-xl">
    <figure>
    <img class=" w-full h-full" id="images" src="${data.strThumb ? data.strThumb : "https://picsum.photos/seed/picsum/200/300"}" alt="Album"/>
    </figure>
    <div class="card-body">
    <h2 class="card-title">${data.strPlayer}</h2>
    <h2>${data.dateBorn}</h2>
    <h2>${data.strGender}</h2>
    <p>${data.strDescriptionEN  !=  null ? data.strDescriptionEN.slice(0,100) : "Not Show Description data" }</p>
    </div>
    </div>
    `
    rightConatiner.appendChild(div)
    
}
const deleteData = ()=>{
    rightConatiner.innerHTML = ''
    document.getElementById("male").classList.add("hidden")
    document.getElementById("female").classList.add("hidden")

}
const getPlayerInfo = () =>{
    const searchInput = document.getElementById("input");
    const searchValue = searchInput.value;
    if(!isNaN(searchValue)||searchValue===''){
        alert("Please Input Player Name")
        searchInput.value = ''
    }else{
        loadData(searchValue)
        searchInput.value = ''
    }
}
loadData("messi")