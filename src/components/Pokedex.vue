<template>
  <div class="pokedex">
    <div class="pokedex-frame">
      <div class="screen">
        <div v-if="selectedPokemon" class="pokemon-info">
          <PokemonCard :pokemon="selectedPokemon" class="small-card" />
        </div>
        <p v-else class="default-text">Selecione um Pokémon</p>
      </div>

      <div class="controls">
        <button class="control-button" @click="randomPokemon">🔍 Procurar</button>
        <button class="control-button" @click="clearSelection">❌ Resetar</button>
        <button class="nav-button" @click="goToList">📜 Lista</button>
        <button class="nav-button" @click="goToStart">🏠 Início</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchPokemons } from '../services/pokeApi';
import PokemonCard from '../components/PokemonCard.vue';

const pokemons = ref([]);
const selectedPokemon = ref(null);
const router = useRouter();

onMounted(async () => {
  pokemons.value = await fetchPokemons(50);
});

const randomPokemon = () => {
  if (pokemons.value.length > 0) {
    selectedPokemon.value = pokemons.value[Math.floor(Math.random() * pokemons.value.length)];
  }
};

const clearSelection = () => {
  selectedPokemon.value = null;
};

const goToList = () => {
  router.push('/lista');
};

const goToStart = () => {
  router.push('/');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.pokedex {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #d32f2f;
}

.pokedex-frame {
  width: 400px;
  height: 600px;
  background: #b71c1c;
  border: 10px solid black;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.screen {
  width: 350px;
  height: 250px;
  background: #333;
  color: white;
  font-family: 'Press Start 2P', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 8px solid black;
  box-shadow: 6px 6px black;
  padding: 8px;
}

.pokemon-info {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Reduzir o tamanho do card quando usado na Pokédex */
.small-card {
  transform: scale(0.7);
}
.default-text {
  font-size: 10px;
  text-align: center;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}

.control-button {
  font-family: 'Press Start 2P', sans-serif;
  background: linear-gradient(to bottom, yellow, orange);
  padding: 12px 18px;
  border: 4px solid black;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  box-shadow: 4px 4px black;
}

.control-button:hover {
  background: linear-gradient(to bottom, orange, red);
  transform: scale(1.1);
}

.nav-button {
  font-family: 'Press Start 2P', sans-serif;
  background: linear-gradient(to bottom, lightblue, blue);
  padding: 12px 20px;
  border: 4px solid black;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  box-shadow: 4px 4px black;
}

.nav-button:hover {
  background: linear-gradient(to bottom, blue, darkblue);
  transform: scale(1.1);
}
</style>
