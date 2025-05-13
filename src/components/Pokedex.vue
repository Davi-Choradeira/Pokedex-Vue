<template>
  <div>
    <h1>Minha Pokédex</h1>
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.name">
        <img :src="pokemon.image" :alt="pokemon.name" />
        <p><strong>{{ pokemon.name }}</strong></p>
        <p>Tipo: {{ pokemon.types.join(', ') }}</p>
        <p>Habilidades: {{ pokemon.abilities.join(', ') }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const pokemons = ref([]);

    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        pokemons.value = await Promise.all(response.data.results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: details.data.sprites.front_default,
            types: details.data.types.map(t => t.type.name),
            abilities: details.data.abilities.map(a => a.ability.name),
          };
        }));
      } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
      }
    };

    onMounted(fetchPokemons);

    return { pokemons };
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: #ffcb05;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

li {
  background: #3b4cca;
  color: white;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  text-align: center;
  width: 200px;
}

img {
  width: 100px;
  height: 100px;
}

p {
  margin: 5px 0;
}
</style>