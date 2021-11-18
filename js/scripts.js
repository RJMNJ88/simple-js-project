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







    //---------- OLD CODE ----------

    //     // Clear all content from previously created <div>
    //     modalContainer.innerHTML = '';
    //     // Create a new <div> inside "modalContainer"
    //     let modal = document.createElement('div');
    //     modal.classList.add('modal');
    //     // Create the close button for the modal
    //     // Add an event listener to the button to allow for closing out the modal
    //     let closeButtonElement = document.createElement('button');
    //     closeButtonElement.classList.add('modal-close');
    //     closeButtonElement.innerText = 'Close';
    //     closeButtonElement.addEventListener('click', hideModal);

    //     // Create the pokemon title, height, and type elements for the modal
    //     let titleElement = document.createElement('h1');
    //     titleElement.classList.add('title-element');
    //     titleElement.innerText = pokemon.name;
    //     let heightElement = document.createElement('p')
    //     heightElement.classList.add('height-element');
    //     heightElement.innerText = 'Height: ' + pokemon.height/10 + 'm';
    //     let imageElement = document.createElement('img');
    //     imageElement.classList.add('image-element');
    //     imageElement.src = pokemon.imageUrl;

    //     // Append all newly created elements
    //     modal.appendChild(imageElement);
    //     modal.appendChild(titleElement);
    //     modal.appendChild(heightElement);
        
       
    //     modalContainer.appendChild(modal);

        // pokemon.types.forEach(item => {
        //     let typeElement = document.createElement('p');
        //     typeElement.innerText = 'Type: ' + item.type.name;
        //     modal.appendChild(typeElement);
        // })

    //     modal.appendChild(closeButtonElement);

    //     // Create a class to enable toggling of the modal container's visibility
    //     modalContainer.classList.add('is-visible');

        // $(document).ready(function () {
    //     $('#search-input').on('keyup', function () {
    //         var value = $(this).val().toLowerCase();
    //         $('.pokemon-list .list-group-item').filter(function () {
    //             $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    //         });
    //     });
    // });