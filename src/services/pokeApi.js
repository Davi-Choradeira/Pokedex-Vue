import axios from 'axios';

export const fetchPokemons = async (limit = 10) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);

    return await Promise.all(response.data.results.map(async (pokemon) => {
      try {
        const details = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          image: details.data.sprites.front_default,
          types: details.data.types.map(t => t.type.name),
          abilities: details.data.abilities.map(a => a.ability.name),
        };
      } catch (error) {
        console.error(`Erro ao buscar detalhes de ${pokemon.name}:`, error);
        return {
          name: pokemon.name,
          image: '',
          types: [],
          abilities: []
        };
      }
    }));
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error);
    return [];
  }
};