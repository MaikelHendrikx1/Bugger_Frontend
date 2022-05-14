import { createApp } from "vue";
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import App from "./App.vue";

import store from "./store";

import Index from './components/index.vue'
import Overview from './components/overview.vue'
import PageNotFound from './components/pageNotFound.vue'
import CreateReport from './components/createreport.vue'
import Login from './components/login.vue';
import Register from './components/register.vue';
import AccountOverview from './components/accountOverview.vue';
import CreateBuggerPage from './components/createBuggerPage.vue';

const routes = [
	{ path: '/', component: Index },
	{ path: '/overview', component: Overview },	
	{ path: '/createreport', component: CreateReport },
	{ path: '/login', component: Login},
	{ path: '/register', component: Register},
	{ path: '/profile', component: AccountOverview },
	{ path: '/editbuggerpage', component: CreateBuggerPage },
	{ path: '/:pathMatch(.*)', component: PageNotFound }
]

const router = createRouter({
	history: createWebHistory(),    
	routes: routes,
})

const app = createApp(App);
app.use(router);
app.mount('#app');

if (import.meta.env.MODE == "development"){
	store.data.authenticatedUser = { id: 1, loggedIn: true, name: 'Maikel Hendrikx', email: 'maikel.hendrikx@outlook.com' }
}