const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <div class ="container">
            <a id="${pokemon.number}" onclick="moreDeitail(this.id)">
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>

                        <img src="${pokemon.photo}"
                                alt="${pokemon.name}">
                    </div>
                </li>
            </a>
        </div>
    `
}

function convertPokemonToLiMore(pokemon) {
    return `
        <div class="pokemon ${pokemon.type} pokemonMore">
        <img class="imgMore" src="${pokemon.photo}"
                    alt="${pokemon.name}">
        <div class="nameAndTypes">
            <span class="number numberMore">#${pokemon.number}</span>: <span class="name nameMore">${pokemon.name}</span>
            <ol class="types typesMore">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        </div>
        <div class = weightAndHeight>
            <span class="number numberMore">wWeight</span>: <span class="name nameMore">${pokemon.weight}</span>
            <span class="number numberMore">Height</span>: <span class="name nameMore">${pokemon.height}</span>
        </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function moreDeitail(id) {
    pokeApi.getPokemons((id - 1), 1).then((pokemons = []) => {
        pokemon = pokemons[0]
        pokemonList.innerHTML = 
        `
        <div class="pokemon ${pokemon.type} pokemonMore">
            <img class="imgMore" src="${pokemon.photo}"
                        alt="${pokemon.name}">
            <div class="nameAndTypes">
                <span class="number numberMore">#${pokemon.number}</span> 
                <span class="name nameMore">${pokemon.name}</span>
                <ol class="types typesMore">
                    ${pokemon.types.map((type) => `<li class="type typeMore ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <div class="weightAndHeight">
                <div class="weight">
                    <span class="number numberMore">Weight</span>: <span class="name">${pokemon.weight}</span>
                </div>
                <div class="height">
                    <span class="number numberMore">Height</span>: <span class="name">${pokemon.height}</span>
                </div>
            </div>
            <div class="stats">
                <ol class="stats">
                    ${pokemon.stats.map((stat) => 
                        `<li class="stat">
                        <div class="statName">${stat.statName}</div>
                        <div class="w3-light-grey w3-round-large">
                            <div class="w3-container w3-blue w3-round-large" style="width:${stat.statNumber}%">${stat.statNumber}</div>
                        </div>
                        </li>`).join('')}
                </ol>
            </div>
        </div>
        `
    })

    loadMoreButton.innerHTML = "Go Back"
    loadMoreButton.addEventListener('click', () => location.reload())
    
}
    

        