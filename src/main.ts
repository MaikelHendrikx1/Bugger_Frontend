import { createApp } from "vue";
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import App from "./App.vue";

import Index from './components/index.vue'
import Overview from './components/overview.vue'
import PageNotFound from './components/pageNotFound.vue'
import CreateReport from './components/createreport.vue'
import Login from './components/login.vue';
import Register from './components/register.vue';

const routes = [
	{ path: '/', component: Index },
	{ path: '/overview', component: Overview },	
	{ path: '/createreport', component: CreateReport },
	{ path: '/login', component: Login},
	{ path: '/register', component: Register},
	{ path: '/:pathMatch(.*)', component: PageNotFound }
]

const router = createRouter({
	history: createWebHistory(),    
	routes: routes,
})

const app = createApp(App);
app.use(router);
app.mount('#app');