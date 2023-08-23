let pokemonRepository = (function () {
    let pokemonList = [{
        name: 'Bulbasaur',
        height: 2,
        types: ["grass", "poison"],
    },
    {
        name: 'Ivysaur',
        height: 3,
        types: ["grass", "poison"],
    },
    {
        name: 'Venasaur',
        height: 6,
        types: ["grass", "poison"],
    },
    {
        name: 'Charmander',
        height: 2,
        types: ["fire"],
    },
    {
        name: 'Charmeleon',
        height: 3,
        types: ["fire"],
    },
    {
        name: 'Charizard',
        height: 5,
        types: ["fire", "flying"],
    },
    {
        name: 'Squirtle',
        height: 1,
        types: ["water"],
    },
    {
        name: 'Wartortle',
        height: 3,
        types: ["water"],
    },
    {
        name: 'Blastoise',
        height: 5,
        types: ["water"],
    }
    ]



    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener('click', showDetails(pokemon))
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

pokemonRepository.add({
    name: 'Gengar',
    height: 4,
    types: ['ghost', 'poison'],
})

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});


/* pokemonRepository.getAll().forEach(function (pokemon) {
    let pokemonStats = pokemon.name + " (Height: " + pokemon.height + ")";
    document.write(pokemonStats)
    if (pokemon.height < 5 && pokemon.height > 3) {
        document.write("That's an average Pokémon" + "<br>")
    } else if (pokemon.height > 5) {
        document.write("Wow! That's a big Pokemon! " + "<br>")
    } else {
        document.write(" Wow! That's a small pokemon! " + "<br>")
    }

}) */


//Loop to display all items on pokemonList

/* for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height < 5 && pokemonList[i].height > 3) {
        document.write("<br>" + pokemonList.name + ": Height-" + pokemonList[i].height + "' " + " That's an average Pokemon. ")
    } else if (pokemonList[i].height < 5) {
        document.write("<br>" + pokemonList[i].name + ": Height-"+  pokemonList[i].height+ "' "  + "Wow! That's a big Pokemon! ")
    } else {
        document.write("<br>" + pokemonList[i].name + ": Height-"+ pokemonList[i].height+ "' "  + " Wow! That's a small pokemon! ")
    }
} */

