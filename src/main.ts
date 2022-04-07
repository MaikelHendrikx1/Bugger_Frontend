import { createApp } from "vue";
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import App from "./App.vue";

import Index from './components/index.vue'
import Overview from './components/overview.vue'
import PageNotFound from './components/pageNotFound.vue'

const routes = [
    { path: '/', component: Index },
    { path: '/:pathMatch(.*)/overview', component: Overview },
    { path: '/:pathMatch(.*)', component: PageNotFound }
]

const router = createRouter({
    history: createWebHistory(),    
    routes: routes,
})

const app = createApp(App);
app.use(router);
app.mount('#app');