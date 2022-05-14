<script lang="ts">
import store from '../store';
export default{
    data() {
        return {
            localUser: {}
        }
    },
    methods: {
        logout(){
            store.data.authenticatedUser = {loggedIn: false, id: 0, name: "", email: ""};
        }
    },
    mounted: function () {
        window.setInterval(() => {
            this.localUser = store.data.authenticatedUser;

            //for some goddamn reason, vue will only react when I do the mess that is the next 2 lines. Don't touch.
            this.localUser.id += 1;
            this.localUser.id -= 1;
        }, 250)
    },
    watch: {
		$route(to){
            this.localUser = store.data.authenticatedUser;

            //for some goddamn reason, vue will only react when I do the mess that is the next 2 lines. Don't touch.
            this.localUser.id += 1;
            this.localUser.id -= 1;
		}
	}
}
</script>

<template>
<div>
    <!-- nevermind, vue be like unga bunga and still won't react if we don't have the next line. Don't touch. -->
    <div style="display: none">{{localUser}}</div>

    <div v-if="localUser.loggedIn">
        <h2 style="float: left; margin-right: 10px;"> <router-link :to="`/profile/?id=${localUser.id}`"><button> {{localUser.name}} </button></router-link></h2>
        <h2 style="float: right"> <button @click="logout">Logout</button> </h2>
    </div>
    <div v-else>
        <h2 style="float: left; margin-right: 10px;"> <router-link :to="`/login`"><button> Login </button></router-link> </h2>
        <h2 style="float: right"> <router-link :to="`/register`"><button> Register </button></router-link> </h2>
    </div>
</div>
</template>
