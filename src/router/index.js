import { createRouter, createWebHistory } from 'vue-router';
import StartScreen from '../components/StartScreen.vue';
import Pokedex from '../components/Pokedex.vue';
import Lista from '../components/Lista.vue';

const routes = [
  { path: '/', component: StartScreen },
  { path: '/pokedex', component: Pokedex },
  { path: '/lista', component: Lista },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;