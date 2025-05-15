<template>
  <div class="start-screen">
    <h1 class="title"> Pokédex  </h1>
    <p class="instruction">Pressione <strong>START</strong> para acessar os dados dos Pokémon.</p>
    <button @click="start" class="start-button">START</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const start = () => {
  router.push('/pokedex'); // Redireciona para a Pokédex
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: radial-gradient(circle, #d32f2f, #b71c1c); /* Fundo mais imersivo */
  color: white;
  text-align: center;
  font-family: 'Press Start 2P', sans-serif;
  border: 8px solid black;
  box-shadow: 8px 8px 0px black;
  padding: 20px;
  animation: fadeIn 1s ease-in-out; /* Animação de entrada */
}

.title {
  font-size: 36px;
  text-shadow: 4px 4px black;
  margin-bottom: 20px;
  letter-spacing: 2px;
  animation: glow 2s infinite alternate; /* Efeito de brilho */
}

.instruction {
  font-size: 18px;
  margin-bottom: 20px;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 5px;
}

.start-button {
  padding: 15px 40px;
  font-size: 20px;
  font-family: 'Press Start 2P', sans-serif;
  border: 4px solid black;
  background: linear-gradient(to bottom, yellow, orange);
  color: black;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 4px 4px black;
  transition: transform 0.2s ease-in-out, background 0.3s;
  animation: pulse 1.5s infinite alternate; /* Efeito pulsante */
}

.start-button:hover {
  background: linear-gradient(to bottom, orange, red);
  transform: scale(1.1);
  box-shadow: 6px 6px black;
}

/* Animações */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes glow {
  from { text-shadow: 4px 4px black; }
  to { text-shadow: 6px 6px yellow; }
}

@keyframes pulse {
  from { transform: scale(1); opacity: 0.8; }
  to { transform: scale(1.1); opacity: 1; }
}
</style>