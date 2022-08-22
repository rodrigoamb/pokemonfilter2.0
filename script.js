/* LISTA POKEMON */
const listPokemon = [
  {
    id: '3',
    pokemon: 'venusaur',
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png',
    type: 'Grama',
    attacks: ['Folha navalha', 'Raio Solar', 'Chicote de vinha'],
  },
  {
    id: '6',
    pokemon: 'charizard',
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
    type: 'Fogo',
    attacks: ['Lança Chamas', 'Ataque voador', 'Ataque rápido'],
  },
  {
    id: '9',
    pokemon: 'blastoise',
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png',
    type: 'Água',
    attacks: ['Canhão de água', 'Ataque Surf', 'Mordida'],
  },
  {
    id: '12',
    pokemon: 'butterfree',
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png',
    type: 'Inseto',
    attacks: ['Pó do sono', 'Ataque rápido', 'Pó envenenado'],
  },
  {
    id: '18',
    pokemon: 'pidgeot',
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/018.png',
    type: 'Voador',
    attacks: ['Furacão', 'Ataque rápido', 'Ataque voador'],
  },
  {
    id: '25',
    pokemon: 'pikachu',
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
    type: 'Elétrico',
    attacks: ['Choque do trovão', 'Ataque rápido', 'Choque Paralizador'],
  },
  {
    id: '149',
    pokemon: 'dragonair',
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png',
    type: 'dragão',
    attacks: ['Hyper Bean', 'Ataque rápido', 'Garra de dragão'],
  },
  {
    id: '150',
    pokemon: 'mewtwo',
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png',
    type: 'psíquico',
    attacks: ['Ataque pisíquico', 'Onda Paralizante', 'multiplicação'],
  },
  {
    id: '151',
    pokemon: 'mew',
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/151.png',
    type: 'psíquico',
    attacks: ['Ataque pisíquico', 'Onda Paralizante', 'multiplicação'],
  },
];

/* PEGANDO ELEMENTOS DO DOM */
const inputSearch = document.querySelector('#search');
const containerCards = document.querySelector('.container-cards');
/* CRIANDO AS FUNCTIONS */
function creatingCards(list) {
  list.map((item) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="img-card">
          <img
            src=${item.img}
            alt="pokemon image"
          />
        </div>
        <div class="name-card">
          <p class="title">${item.pokemon}</p>
          <p class="type" id="type">${item.type}</p>
        </div>
        <div class="description-card">
          <ul>
            <li id="attack1">${item.attacks[0]}</li>
            <li id="attack2">${item.attacks[1]}</li>
            <li id="attack3">${item.attacks[2]}</li>
          </ul>
          <p class="pokemon-number">#${item.id}</p>
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
/* LÓGICA DA APLICAÇÃO */
creatingCards(listPokemon);

inputSearch.addEventListener('input', () => {
  const valueInput = inputSearch.value.toLowerCase();
  if (valueInput !== '') {
    const newList = filteringListPokemon(valueInput);
    hideCards();
    creatingCards(newList);
  } else {
    hideCards();
    creatingCards(listPokemon);
  }
});
