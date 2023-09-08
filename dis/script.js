let pokemonRepository = (function () {
  let t = [];
  function e() {
    return t;
  }
  function i(e) {
    t.push(e);
  }
  function n(t) {
    return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
  }
  function o(t) {
    return fetch(t.detailsUrl)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.other["official-artwork"].front_default),
          (t.imageUrlShiny = e.sprites.other["official-artwork"].front_shiny),
          (t.height = e.height),
          (t.weight = e.weight),
          (t.types = e.types.map((t) => n(t.type.name)).join(", ")),
          (t.abilities = e.abilities.map((t) =>
            n(t.ability.name.replace("-", " "))
          ));
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  function a(t) {
    o(t).then(function () {
      var e;
      let i, n, o, a, r, l, p, s, c;
      (e = t),
        (i = $(".modal-body")),
        (n = $(".modal-title")),
        $(".modal-header"),
        n.empty(),
        i.empty(),
        (o = $("<h1>" + e.name + "</h1>")),
        (a = $('<img class="modal-img" style="width:50%">')),
        a.attr("src", e.imageUrl),
        (r = $('<img class="modal-img" style="width:50%">')),
        r.attr("src", e.imageUrlShiny),
        (l = $("<p>Height: " + e.height + "</p>")),
        (p = $("<p>Weight: " + e.weight + "</p>")),
        (s = $("<p>Type: " + e.types + "</p>")),
        (c = $(
          "<p class='abilities'>Abilities: " + e.abilities.join(", ") + "</p>"
        )),
        n.append(o),
        i.append(a),
        i.append(r),
        i.append(l),
        i.append(p),
        i.append(s),
        i.append(c);
    });
  }
  return {
    getAll: e,
    add: i,
    addListItem: function t(e) {
      let i = document.querySelector(".pokemon-list"),
        o = document.createElement("li"),
        r = document.createElement("button"),
        l = n(e.name);
      r.setAttribute("data-toggle", "modal"),
        r.setAttribute("data-target", "#modal-container"),
        (r.textContent = l),
        r.classList.add("pokedex-button"),
        o.appendChild(r),
        i.appendChild(o),
        r.addEventListener("click", function () {
          a(e);
        });
    },
    loadList: function t() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=493")
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          t.results.forEach(function (t) {
            let e = { name: t.name, detailsUrl: t.url };
            i(e), console.log(e);
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: o,
    showDetails: a,
  };
})();
console.log(pokemonRepository.getAll()),
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (t) {
      pokemonRepository.addListItem(t);
    });
  });
