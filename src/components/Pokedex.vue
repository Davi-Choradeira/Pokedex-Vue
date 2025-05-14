<template>
  <div>
    <h1>Minha Pokédex</h1>
    <input v-model="searchQuery" placeholder="Digite um nome de Pokémon" />
    <div v-if="isLoading">Carregando Pokémon...</div>
    <p v-if="filteredPokemons.length === 0 && !isLoading">Nenhum Pokémon encontrado...</p>
    <div class="pokemon-list">
      <PokemonCard v-for="pokemon in filteredPokemons" :key="pokemon.name" :pokemon="pokemon" />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { fetchPokemons } from '../services/pokeApi';
import PokemonCard from '../components/PokemonCard.vue';
export default {
  components: { PokemonCard },
  setup() {
    const pokemons = ref([]);
    const searchQuery = ref('');
    const isLoading = ref(true);

    onMounted(async () => {
      try {
        pokemons.value = await fetchPokemons(50); // Reduzi o número para evitar erros
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
      }
      isLoading.value = false;
    });

    const filteredPokemons = computed(() => {
      return pokemons.value.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    return { searchQuery, filteredPokemons, isLoading };
  }
};
</script>

<style scoped>
input {
  width: 80%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ffcb05;
  border-radius: 8px;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
</style>