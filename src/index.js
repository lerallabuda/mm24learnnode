import './style.scss';

import { createApp } from 'vue';

import App from './App.vue';

import { createMemoryHistory, createWebHashHistory, createWebHistory, createRouter } from 'vue-router';

import CookieClicker from './pages/CookieClicker.vue';

const routes = [
  { path: '/cookieclicker', component: CookieClicker, name: 'Cookie Clicker', meta: {noContainer: true} },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});


let app = createApp(App);
app.use(router);
app.mount('#app');