const containerCards = document.querySelector('.container-cards');
const containerBtn = document.querySelector('.container-btn');
const nextBtn = document.getElementById('next-btn');

let currentPage = 1;

async function getDataPokemon(accumulated = 1, page = 1) {
  const listPokemon = [];
  for (let i = accumulated; i <= 6 * page; i++) {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + i;
    const response = await fetch(url);
    const data = await response.json();
    listPokemon.push(data);
  }
  creatingCards(listPokemon);
}

async function getDataLastPage(accumulated, lastPokemon) {
  const listPokemon = [];
  for (let i = accumulated; i < lastPokemon; i++) {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + i;
    const response = await fetch(url);
    const data = await response.json();
    listPokemon.push(data);
  }
  creatingCards(listPokemon);
}

function creatingCards(list) {
  list.map((item) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="img-card">
          <img
            src=${item.sprites.other.dream_world.front_default}
            alt="pokemon image"
          />
        </div>
        <div class="name-card">
          <p class="title">${item.name}</p>
          <p class="type" id="type">${item.types[0].type.name}</p>
        </div>
        <div class="description-card">
          <p class="pokemon-number">nº ${item.id}</p>
        </div>
      </div>
    `;
    containerCards.append(card);
  });
}

getDataPokemon();

nextBtn.addEventListener('click', () => {
  if (currentPage === 1) {
    currentPage++;
    let accumulated = 7;
    getDataPokemon(accumulated, currentPage);
  } else if (currentPage === 41) {
    nextBtn.style = 'visibility: hidden';
    currentPage++;
    let accumulated = 247;
    getDataLastPage(accumulated, 252);
  } else {
    currentPage++;
    let accumulated = 6 * (currentPage - 1) + 1;
    getDataPokemon(accumulated, currentPage);
  }
});
