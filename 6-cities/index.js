const url = "https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88/cities_of_turkey.json"
const cities = [];

async function getCities(){
    const response =  await fetch(url);
    const data = await response.json();
    
    cities.push(...data);
}

function findMatches(WordToMatch, cities){
    
    return cities.filter(place =>{
        
        const regex = new RegExp(WordToMatch,"gi");

        return place.name.match(regex) || place.region.match(regex);
    })
}


function displayMatches(){
    const match = findMatches(this.value,cities);
   
    const html = match.map(place => {
        const regex = new RegExp(this.value,"gi");

        const cityName = place.name.replace(regex,`<span class = "h1">${this.value}</span>`)


        return ` <div class="city-card">
            <h4>${cityName}</h4>
            <h6>${place.population}</h6>
        </div>`;
    }).join('');    
    suggesitons.innerHTML = html

}

const search = document.querySelector(".search");
const suggesitons = document.querySelector(".city-suggesitons")



search.addEventListener("change",displayMatches)
search.addEventListener("keyup",displayMatches)

getCities();