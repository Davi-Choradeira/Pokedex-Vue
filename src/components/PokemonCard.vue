<template>
  <div class="pokemon-card" :class="mainType">
    <div class="effect-background"></div>

    <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
    <h2 class="pokemon-name">{{ pokemon.name }}</h2>
    <div class="pokemon-description">
      <p><strong>Tipo:</strong> {{ pokemon.types.join(', ') }}</p>
      <p><strong>Poderes:</strong> {{ pokemon.abilities.join(', ') }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  pokemon: Object
});

const mainType = props.pokemon.types[0]; // pega o primeiro tipo para a estilização
</script>

<style scoped>
.pokemon-card {
  position: relative;
  width: 230px;
  height: 280px;
  border-radius: 15px;
  padding: 18px;
  box-sizing: border-box;
  font-family: 'Press Start 2P', cursive;
  color: white;
  text-align: center;
  overflow: hidden;
  border: 4px solid black;
  cursor: default;
  filter: drop-shadow(3px 3px 0 black);
  background: #222; /* fallback */
}

/* Fundo animado por tipo */
.effect-background {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  opacity: 0.3;
  z-index: 0;
  pointer-events: none;
  border-radius: 15px;
}

/* Fogo */
.fire .effect-background {
  background: repeating-radial-gradient(circle at center, 
    #ff4500 0, #ff4500 5px, #ff8c00 6px, #ff8c00 10px);
  animation: fire-flicker 3s infinite;
}
@keyframes fire-flicker {
  0%, 100% { filter: brightness(1) saturate(1.2); }
  50% { filter: brightness(1.3) saturate(1.5); }
}

/* Água */
.water .effect-background {
  background: repeating-linear-gradient(
    45deg, #4fc3f7 0 10px, #0288d1 10px 20px);
  animation: water-wave 4s infinite linear;
}
@keyframes water-wave {
  0% { background-position: 0 0; }
  100% { background-position: 40px 40px; }
}

/* Elétrico */
.electric .effect-background {
  background: repeating-linear-gradient(
    135deg, #fff176 0 3px, transparent 3px 6px);
  animation: electric-flash 1.5s infinite alternate;
}
@keyframes electric-flash {
  0% { opacity: 0.2; }
  100% { opacity: 0.5; }
}

/* Planta */
.grass .effect-background {
  background: repeating-radial-gradient(circle at center, 
    #4caf50 0 8px, #2e7d32 9px 15px);
  animation: grass-sway 4s infinite ease-in-out;
}
@keyframes grass-sway {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(0.8); }
}

/* Venenoso */
.poison .effect-background {
  background: repeating-radial-gradient(circle at center, 
    #6a1b9a 0 8px, #4a148c 9px 15px);
  animation: poison-glow 3s infinite alternate;
}
@keyframes poison-glow {
  0% { filter: brightness(0.7); }
  100% { filter: brightness(1.2); }
}

/* Vento (flying) */
.flying .effect-background {
  background: repeating-linear-gradient(
    45deg, rgba(255,255,255,0.15) 0 15px, transparent 15px 30px);
  animation: wind-blow 6s infinite linear;
}
@keyframes wind-blow {
  0% { background-position: 0 0; }
  100% { background-position: 30px 30px; }
}

/* Terra */
.ground .effect-background, .rock .effect-background {
  background: repeating-radial-gradient(circle at center, 
    #8d6e63 0 6px, #5d4037 7px 12px);
  animation: ground-shift 5s infinite ease-in-out;
}
@keyframes ground-shift {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(0.85); }
}

/* Imagem pixelada */
.pokemon-image {
  width: 100px;
  height: 100px;
  image-rendering: pixelated;
  position: relative;
  z-index: 1;
  margin-bottom: 12px;
}

/* Nome grande e destacado */
.pokemon-name {
  font-size: 16px;
  margin: 0 0 10px 0;
  text-transform: capitalize;
  z-index: 1;
  position: relative;
}

/* Descrição menor e legível */
.pokemon-description {
  font-size: 8px;
  line-height: 1.2;
  z-index: 1;
  position: relative;
  text-transform: capitalize;
}

/* Para tipos não mapeados - padrão */
.normal, .psychic, .dragon, .fairy, .dark, .ice {
  background: #555;
}

/* Hover suave */
.pokemon-card:hover {
  filter: drop-shadow(5px 5px 1px black);
  transform: scale(1.05);
  transition: all 0.3s ease;
}
</style>
