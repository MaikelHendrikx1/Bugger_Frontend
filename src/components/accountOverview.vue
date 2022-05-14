<script lang="ts">
import store from '../store';
import { URLSearchParams } from 'url';
import { Router, useRoute } from 'vue-router';
import axios from 'axios';
import endpoints from '../services.json';
import {AxiosRequestConfig} from 'axios';
import { userInfo } from 'os';

export default{
    data() {
        return {
            isSelf: false,
            userInfo: {},
            pages_owner: [],
            pages_maintainer: []
        }
    },
    beforeMount() {
        let that = this;
        this.isSelf = (store.data.authenticatedUser.loggedIn && store.data.authenticatedUser.id == this.$route.query.id);

        axios.get(endpoints.urls.account + 'Account/get', {params: {id: this.$route.query.id}}).then(
            function (response){
                that.userInfo = response.data;
                axios.get(endpoints.urls.buggerpage + 'BuggerPages/allByUser', {params: {userID: that.$route.query.id}}).then(
                    function(response) {
                        response.data.forEach(element => {
                            if (element.ownerId == that.userInfo.id) {
                                that.pages_owner.push(element);
                            }
                            else {
                                that.pages_maintainer.push(element);
                            }
                        });
                    }
                )
            }
        )
    }
}
</script>

<template>
    <div v-if="isSelf">
        <h1 v-if="pages_owner.length > 0">You are the owner of:</h1>
        <h3 v-for="page in pages_owner" :key="page">{{page}}</h3>

        <router-link :to="`/editbuggerpage`">Create a new bugger page.</router-link>

        <br>

        <h1 v-if="pages_maintainer.length > 0">You are a maintainer in:</h1>
        <h3 v-for="page in pages_maintainer" :key="page">{{page}}</h3>
    </div>

    <div v-else>
        <h1 v-if="pages_owner.length > 0">Is owner of:</h1>
        <h3 v-for="page in pages_owner" :key="page">{{page}}</h3>

        <br>
        
        <h1 v-if="pages_maintainer.length > 0">Is maintainer in:</h1>
        <h3 v-for="page in pages_maintainer" :key="page">{{page}}</h3>
    </div>
</template>