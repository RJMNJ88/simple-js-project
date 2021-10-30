// IIFE created using "pokemonRepository" as its name.
let pokemonRepository = (function(){
// The pokemonList array has been defined here.
    let pokemonList = [];
// Create a link to access the pokemonAPI webpage
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// The following function will allow users to add pokemon to the pokemonList array.
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
// The following function will allow users to call on and list the objects inide the pokemonList array.
    function getAll() {
        return pokemonList;
    }

// The following function will create a list of buttons representing each Pokemon in the Pokedex.
    function addListItem(pokemon) {
        let pokeList = document.querySelector('.pokemon-list');
        let pokeListItem = document.createElement('li');
        let pokeButton = document.createElement('button');
        pokeButton.innerText = pokemon.name;
        pokeButton.classList.add('pokemon-button');
        pokeListItem.appendChild(pokeButton);
        pokeList.appendChild(pokeListItem);
        
        pokeButton.addEventListener('click', function() {
            showDetails(pokemon)
        });

    }

   

// Create a function to GET information from the pokemonAPI webpage
    function loadList() {
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(json){
            json.results.forEach(function (item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function(e){
            console.error(e);
        })
    }

// Adding details to the fetch() from the pokemonAPI
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e){
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function(){
            console.log(pokemon);
        });
    }

// The above-mentioned functions have been further defined/labeled here to allow for easier access from outside the IIFE.
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

// A forEach() loop has been created to access the pokemonList inside the pokemonRepository

pokemonRepository.getAll().forEach(function (pokemon){

    pokemonRepository.addListItem(pokemon);

  });

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});



