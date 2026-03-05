// Elementos del DOM
const container = document.getElementById("pokemon");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");

// Colores para cada tipo 
const typeColors = {
  grass: "#78C850",
  poison: "#A040A0",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  bug: "#A8B820",
  normal: "#A8A878",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  flying: "#A890F0"
};

// Almacenar todos los Pokémon
let allPokemon = [];

// Cargar todos los Pokémon desde la API
async function loadAllPokemon() {
  try {
    const countResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1");
    const countData = await countResponse.json();
    const total = countData.count;
    const batchSize = 100;

    for (let offset = 0; offset < total; offset += batchSize) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${batchSize}&offset=${offset}`);
      const data = await response.json();

      const pokemonPromises = data.results.map(poke =>
        fetch(poke.url).then(res => res.json())
      );

      const pokemons = await Promise.all(pokemonPromises);

      allPokemon.push(...pokemons);

      renderPokemonList(allPokemon);
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

// Renderizar lista de Pokémon
function renderPokemonList(list) {
  container.innerHTML = "";
  list.forEach(renderPokemon);
}

// Crear tarjeta de Pokémon
function renderPokemon(pokemon) {
  const card = document.createElement("div");
  card.classList.add("card");

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id}`;

  const name = document.createElement("h3");
  name.textContent =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const img = document.createElement("img");
  img.src = pokemon.sprites.front_default;

  const typesContainer = document.createElement("div");
  typesContainer.classList.add("types");

  pokemon.types.forEach(typeInfo => {
    const typeName = typeInfo.type.name;

    const type = document.createElement("span");
    type.classList.add("type");
    type.textContent = typeName;

    type.style.backgroundColor = typeColors[typeName] || "#777";
    type.style.color = "white";

    typesContainer.appendChild(type);
  });

  card.appendChild(number);
  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(typesContainer);

  container.appendChild(card);
}

// Eventos de búsqueda y filtro
searchInput.addEventListener("input", applyFilters);
typeFilter.addEventListener("change", applyFilters);

// Aplicar filtros de nombre, ID y tipo
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedType = typeFilter.value;

  const filtered = allPokemon.filter(pokemon => {

    const idString = pokemon.id.toString();

    const matchesSearch =
      pokemon.name.toLowerCase().includes(searchTerm) ||
      idString.includes(searchTerm);

    const matchesType =
      selectedType === "" ||
      pokemon.types.some(t => t.type.name === selectedType);

    return matchesSearch && matchesType;
  });

  renderPokemonList(filtered);
}

// Iniciar carga de Pokémon
loadAllPokemon();