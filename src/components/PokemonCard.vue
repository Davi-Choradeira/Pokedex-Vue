<template>
  <div class="card">
    <img :src="pokemon.image" :alt="pokemon.name" />
    <p><strong>{{ pokemon.name }}</strong></p>
    <p>Tipo: {{ pokemon.types.join(', ') }}</p>
    <p>Habilidades: {{ pokemon.abilities.join(', ') }}</p>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: Object
  }
};
</script>

<style scoped>
.card {
  background: #3b4cca;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  width: 200px;
}
img {
  width: 100px;
  height: 100px;
}
</style>