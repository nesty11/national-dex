let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1010';



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
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.imageUrlShiny = details.sprites.front_shiny;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
            item.ability = details.ability;
        }).catch(function (e) {
            console.error(e);
        })
    }

    function showDetails(item) {
        loadDetails(item).then(function () {
            console.log(item);
        });
    }


    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

/* pokemonRepository.add({
    name: 'Gengar',
    height: 4,
    types: ['ghost', 'poison'],
}) */

console.log(pokemonRepository.getAll());


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
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

