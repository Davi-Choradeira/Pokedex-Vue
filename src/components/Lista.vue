<template>
  <div class="lista-container">
    <h1>Lista de Pokémon</h1>

    <div class="controls">
      <input
        type="text"
        placeholder="Buscar por nome..."
        v-model="searchTerm"
        @input="filterPokemons"
        class="search-input"
      />

      <select id="filter" v-model="selectedType" @change="filterPokemons" class="type-select">
        <option value="">Todos os tipos</option>
        <option 
          v-for="type in allTypes" 
          :key="type" 
          :value="type"
        >
          {{ typeEmoji(type) }} {{ type.charAt(0).toUpperCase() + type.slice(1) }}
        </option>
      </select>
    </div>

    <p class="count">Total: {{ filteredPokemons.length }} Pokémon(s)</p>

    <div class="pokemon-grid">
      <PokemonCard
        v-for="pokemon in filteredPokemons"
        :key="pokemon.name"
        :pokemon="pokemon"
      />
    </div>

    <button class="back-button" @click="goToPokedex">🔙 Voltar</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { fetchPokemons } from '../services/pokeApi';
import PokemonCard from '../components/PokemonCard.vue';

const pokemons = ref([]);
const selectedType = ref('');
const searchTerm = ref('');
const router = useRouter();

onMounted(async () => {
  pokemons.value = await fetchPokemons(50);
});

const allTypes = computed(() => {
  const typesSet = new Set();
  pokemons.value.forEach(p => p.types.forEach(t => typesSet.add(t)));
  return Array.from(typesSet).sort();
});

const filteredPokemons = computed(() => {
  return pokemons.value.filter(pokemon => {
    const matchesType = selectedType.value ? pokemon.types.includes(selectedType.value) : true;
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    return matchesType && matchesSearch;
  });
});

const filterPokemons = () => {
  // Computeds já atualizam automaticamente
};

const goToPokedex = () => {
  router.push('/pokedex');
};

function typeEmoji(type) {
  const emojis = {
    fire: '🔥',
    water: '💧',
    electric: '⚡',
    grass: '🌱',
    poison: '☠️',
    flying: '🌬️',
    ground: '🌍',
    rock: '🪨',
    bug: '🐛',
    fairy: '✨',
    ice: '❄️',
    dragon: '🐉',
    psychic: '🔮',
    ghost: '👻',
    steel: '⚙️',
    fighting: '🥊',
    normal: '⭐',
  };
  return emojis[type] || '';
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.lista-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  min-height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('../assets/nature-background.jpg') center/cover no-repeat;
  font-family: 'Press Start 2P', sans-serif;
  color: white;
  padding-bottom: 40px;
}

h1 {
  margin-bottom: 20px;
}

.controls {
  display: flex;
  gap: 12px;
  margin-bottom: 15px;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  max-width: 600px;
}

.search-input {
  flex: 1;
  min-width: 150px;
  font-family: 'Press Start 2P', cursive;
  padding: 10px 15px;
  border-radius: 12px;
  border: none;
  outline: none;
  font-size: 10px;
  color: #222;
}

.type-select {
  font-family: 'Press Start 2P', cursive;
  padding: 10px 15px;
  border-radius: 12px;
  border: none;
  font-size: 10px;
  cursor: pointer;
  min-width: 150px;
}

.count {
  font-size: 11px;
  margin-bottom: 10px;
  font-weight: bold;
  text-transform: uppercase;
}

.pokemon-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  max-width: 90%;
}

.back-button {
  margin-top: 20px;
  padding: 12px 20px;
  font-size: 14px;
  font-family: 'Press Start 2P', sans-serif;
  background: linear-gradient(to right, #fceabb, #f8b500);
  border: 2px solid black;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  user-select: none;
}

.back-button:hover {
  background: linear-gradient(to right, #f8b500, #fceabb);
  transform: scale(1.1);
}
</style>
