let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=493";

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

    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal-container");
    button.textContent = capitalizedName;
    button.classList.add("pokedex-button");

    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.other["official-artwork"].front_default;
        item.imageUrlShiny =
          details.sprites.other["official-artwork"].front_shiny;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types
          .map((type) => capitalize(type.type.name))
          .join(", ");
        item.abilities = details.abilities.map((ability) =>
          capitalize(ability.ability.name.replace("-", " "))
        );
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + pokemon.name + "</h1>");

    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", pokemon.imageUrl);

    let imageElementShiny = $('<img class="modal-img" style="width:50%">');
    imageElementShiny.attr("src", pokemon.imageUrlShiny);

    let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");

    let weightElement = $("<p>" + "Weight: " + pokemon.weight + "</p>");

    let typesElement = $("<p>" + "Type: " + pokemon.types + "</p>");

    let abilitiesElement = $(
      "<p class='abilities'>" +
        "Abilities: " +
        pokemon.abilities.join(", ") +
        "</p>"
    );

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(imageElementShiny);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
