// IIFE created using "pokemonRepository" as its name.
let pokemonRepository = (function(){
// The pokemonList array has been defined here.
    let pokemonList = [
        {
        name: "Venusaur",
        height: 2,
        type: ["Grass", "Poison"]
        }, 
        {
        name: "Blastoise",
        height: 1.6,
        type: ["Water"]
        }, 
        {
        name: "Charizard", 
        height: 1.7, 
        type: ["Fire", "Flying"]
        }, 
        {
        name: "Pikachu", 
        height: 0.4, 
        type: ["Electric"]}, 
        {
        name: "Cubone", 
        height: 0.4, 
        type: ["Ground"]
        }
    ];
// The following function will allow users to add pokemon to the pokemonList array.
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
// The following function will allow users to call on and list the objects inide the pokemonList array.
    function getAll() {
        return pokemonList;
    }
// The above-mentioned functions have been further defined/labeled here to allow for easier access from outside the IIFE.
    return {
        add: add,
        getAll: getAll
    };
})();

// A forEach() loop has been created to access the pokemonList inside the pokemonRepository
pokemonRepository.getAll().forEach(function(pokemon){
    if (pokemon.height > 0.0 && pokemon.height <= 0.9){
        document.write("<b>" + pokemon.name + "</b>" + " (height: " + pokemon.height + ") - <i>Small</i> <br>");
    } else if (pokemon.height >= 1.0 && pokemon.height <= 1.9){
        document.write("<b>" + pokemon.name + "</b>" + " (height: " + pokemon.height + ") - <i>Medium</i> <br>");
    } else {
        document.write("<b>" + pokemon.name + "</b>" + " (height: " + pokemon.height + ") - <i>Wow, that's big !</i> <br>");
    }
});
