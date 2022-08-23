const inputSearch = document.querySelector('#search');
const containerCards = document.querySelector('.container-cards');
const containerBtn = document.querySelector('.container-btn');
const nextBtn = document.getElementById('next-btn');
const previousBtn = document.getElementById('previous-btn');
const numberPage = document.getElementById('number-page');
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

window.onload = function loadPage() {
  getDataPokemon();
  previousBtn.style = 'visibility: hidden';
};

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

function filteringListPokemon(search) {
  let filteredList = listPokemon.filter((pkm) => pkm.pokemon.includes(search));
  return filteredList;
}

function hideCards() {
  containerCards.innerHTML = '';
}

nextBtn.addEventListener('click', () => {
  if (currentPage === 1) {
    previousBtn.style = 'visibility: none';
    currentPage++;
    let accumulated = 7;
    hideCards();
    getDataPokemon(accumulated, currentPage);
    numberPage.innerHTML = currentPage;
  } else if (currentPage === 41) {
    nextBtn.style = 'visibility: hidden';
    currentPage++;
    let accumulated = 247;
    hideCards();
    getDataLastPage(accumulated, 252);
    numberPage.innerHTML = currentPage;
  } else {
    previousBtn.style = 'visibility: none';
    currentPage++;
    let accumulated = 6 * (currentPage - 1) + 1;
    hideCards();
    getDataPokemon(accumulated, currentPage);
    numberPage.innerHTML = currentPage;
  }
});

previousBtn.addEventListener('click', () => {
  if (currentPage === 2) {
    previousBtn.style = 'visibility: hidden';
    currentPage--;
    hideCards();
    getDataPokemon();
    numberPage.innerHTML = currentPage;
  } else {
    nextBtn.style = 'visibility: none';
    currentPage--;
    let accumulated = 6 * (currentPage - 1) + 1;
    hideCards();
    getDataPokemon(accumulated, currentPage);
    numberPage.innerHTML = currentPage;
  }
});
