const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const search = document.querySelector('.lupa')

let searchPokemon = 1

const fetchPokemons = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemons(pokemon);
    if (data){
        pokemonImage.style.display = "inline";
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        if(data.id < 650){
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }else{
            pokemonImage.src = data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default'];
        }
        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Ops! Not found';
        pokemonNumber.innerHTML = '';

    }

}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
});

buttonPrev.addEventListener('click',()=>{
    if(searchPokemon >1){
        searchPokemon -=1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click',()=>{
    searchPokemon +=1;
    renderPokemon(searchPokemon);
});


search.addEventListener('click',()=>{
    renderPokemon(searchPokemon);
});
renderPokemon(1);