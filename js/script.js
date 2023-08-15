let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 2,
        types: ["grass", "poison"]
    },
    {
        name: 'Ivysaur',
        height: 3,
        types: ["grass", "poison"]
    },
    {
        name: 'Venasaur',
        height: 6,
        types: ["grass", "poison"]
    },
    {
        name: 'Charmander',
        height: 2,
        types: ["fire"]
    },
    {
        name: 'Charmeleon',
        height: 3,
        types: ["fire"]
    },
    {
        name: 'Charizard',
        height: 5,
        types: ["fire", "flying"]
    },
    {
        name: 'Squirtle',
        height: 1,
        types: ["water"]
    },
    {
        name: 'Wartortle',
        height: 3,
        types: ["water"]
    },
    {
        name: 'Blastoise',
        height: 5,
        types: ["water"]
    }
];

//Loop to display all items on pokemonList

for (let i = 0; pokemonList.length; i++) {
    if (pokemonList[i].height < 5 && pokemonList[i].height > 3) {
        document.write(pokemonList.name + ": Height-" + pokemonList[i].height + "' " + " That's an average Pokemon. ")
    } else if (pokemonList[i].height < 5) {
        document.write(pokemonList[i].name + ": Height-"+  pokemonList[i].height+ "' "  + "Wow! That's a big Pokemon! ")
    } else {
        document.write(pokemonList[i].name + ": Height-"+ pokemonList[i].height+ "' "  + " Wow! That's a small pokemon! ")
    }
}
