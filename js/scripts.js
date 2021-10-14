// Define Pokemon List as an array
let pokemonList = [];
// Add pokemon to pokemonList array. Currently 5 pokemon (objects).
pokemonList = [
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
// Create a "for" loop that will list Pokemon from pokemonList with their corresponding heights.
for (let i = 0; i < pokemonList.length; i++){
      if (pokemonList[i].height > 0.0 && pokemonList[i].height <= 0.9){
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") <br>");
    } else if (pokemonList[i].height >= 1.0 && pokemonList[i].height <= 1.9){
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") <br>");
    } else {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - <i>Wow, that's big !</i> <br>");
    }
}
