let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1010';



    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");

        // Capitalize the name for each Pokémon
        let capitalizedName = capitalize(pokemon.name);

        button.innerText = capitalizedName;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener('click', function () {
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
            item.abilities = details.abilities.map((ability) => capitalize(ability.ability.name.replace('-', ' ')));
        }).catch(function (e) {
            console.error(e);
        })
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }
    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');

        //Clear all existing modal content
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        //Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let imageElement = document.createElement('img');
        imageElement.classList.add('modal-img');
        imageElement.src = pokemon.imageUrl;

        let imageElementShiny = document.createElement('img');
        imageElementShiny.classList.add('modal-img');
        imageElementShiny.src = pokemon.imageUrlShiny;

        let heightElement = document.createElement('p');
        heightElement.innerText = 'Height:  ' + pokemon.height;

        let typesElement = document.createElement('p');
        typesElement.innerText = 'Types: ' + pokemon.types.map((type) => type.type.name).join(', ');

        let abilitiesElement = document.createElement('p');
        abilitiesElement.innerText = 'Abilities: ' + pokemon.abilities.join(', ');

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(imageElement);
        modal.appendChild(imageElementShiny);
        modal.appendChild(heightElement);
        modal.appendChild(typesElement);
        modal.appendChild(abilitiesElement);

        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
    };

    function hideModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    };

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    let modalContainer = document.querySelector('#modal-container');
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });


    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();




console.log(pokemonRepository.getAll());


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
})


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

/* pokemonRepository.add({
    name: 'Gengar',
    height: 4,
    types: ['ghost', 'poison'],
}) */