const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore-button');

const maxRecords = 1292
const limit = 8
let offset = 0



function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>`
            <li class="pokemon ${pokemon.type}">
                <span class="pokemon-number">#${pokemon.number}</span>
                <span class="pokemon-name">${pokemon.name}</span>
        
                <div class="detail">
                    <ol class="pokemon-type">
                        ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}"> 
                </div>
            </li>  
            `
        ).join('');
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItens(offset, limit) 

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPgae = offset + limit

    if(qtdRecordNextPgae >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
 
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
        loadPokemonItens(offset, limit)
    }

})

