// IIFE created using "pokemonRepository" as its name.
let pokemonRepository = (function(){

    // The pokemonList array has been defined here.
    let pokemonList = [];

    // Create a link to access the pokemonAPI webpage
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // Create a variable for the modal
    let modalContainer = document.querySelector('#modal-container');

    function showModal(pokemon) {
        
        // Define new modal variables using jQuery
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');

        // Clear existing modal content
        modalTitle.empty();
        modalBody.empty();

        // Create modal content: Name, Image, Height, Weight, Type, Abilities
        let nameElement = $('<h5>' + pokemon.name + "</h5>");
        let imageElement = $('<img class="modal-img" style="width: 50%">');
        imageElement.attr('src', pokemon.imageUrl);
        let heightElement = $('<p>' + 'Height: ' + pokemon.height/10 + 'm' + '</p>');
        let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + 'kg' + '</P>');
        let typeElement = $('<p>' + 'Type: ' + pokemon.types + '</p>');
        let abilitiesElement = $('<p>' + 'Abilities: '+ pokemon.abilities + '</p>');

        // Append newly created jQuery modal content elements
        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typeElement);
        modalBody.append(abilitiesElement);
    }

    // Create a function for hiding the modal container
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    // Add an Event Listener to hide the modal whenthe user presses the "Escape" key
    window.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
            hideModal();
        }
    });

    // Add an Event Listener to hide the modal container when user clicks outside of the modal
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

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
        let pokeListItem = document.createElement('li')
        pokeListItem.classList.add('poke-list-item');
        let pokeButton = document.createElement('button');
        pokeButton.innerText = pokemon.name;
        pokeButton.classList.add('poke-button');
        pokeButton.setAttribute('data-target', '#exampleModal');
        pokeButton.setAttribute('data-toggle', 'modal');

        pokeListItem.classList.add('list-group-item');
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
            item.weight = details.weight;

            item.types = [];
            for (var i = 0; i < details.types.length; i++) {
              item.types.push(' ' + details.types[i].type.name);
            }
            item.abilities = [];
            
            for (var i = 0; i < details.abilities.length; i++) {
              item.abilities.push(' ' + details.abilities[i].ability.name);
            }
        }).catch(function(e){
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function(){
            console.log(pokemon);
            showModal(pokemon);
        });
    }

    // The above-mentioned functions have been further defined/labeled here to allow for easier access from outside the IIFE.
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
        hideModal: hideModal
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


//Scroll-to-top button
let mybutton = document.getElementById("topBtn");

//Create function that displays the button whent he user scrolls down > 200px from the top
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

$(document).ready(function () {
    $('#search-input').on('keyup', function () {
        var value = $(this).val().toLowerCase();
        $('.pokemon-list .list-group-item').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
