import { createRouter, createWebHistory } from 'vue-router';
import Pokedex from '../components/Pokedex.vue'; // Ajuste de caminho

const routes = [
  { path: '/', component: Pokedex }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;