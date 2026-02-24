const container = document.getElementById("pokemon");

for (let i = 1; i <= 100; i++) {

    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(response => response.json())
        .then(data => {

            const card = document.createElement("div");
            card.classList.add("card");

            const name = document.createElement("h3");
            name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);

            const img = document.createElement("img");
            img.src = data.sprites.front_default;

            card.appendChild(img);
            card.appendChild(name);
            container.appendChild(card);
        })
        .catch(error => console.error("Error:", error));
}