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
    <h1 style="text-align: center"> {{userInfo.username}} | {{userInfo.email}} </h1>
    <hr>
    <br>

    <div v-if="isSelf" style="width: 80%; margin: auto">
        <div v-if="pages_owner.length > 0">
            <h1>You are the owner of:</h1>

            <table class="table table-dark">
                <thead>
                    <tr>
                        <th scope="col"><b>Id</b></th>
                        <th scope="col"><b>Name</b></th>
                        <th scope="col"><b>Maintainer count</b></th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="page in pages_owner" :key="page">
                        <td>{{page.id}}</td>
                        <td>{{page.name}}</td>
                        <td>{{page.maintainers.length}}</td>
                        <td style="text-align: end;"><router-link :to="`/overview/?id=${page.id}`">View</router-link> | <router-link :to="`/overview/?id=${page.id}`">Edit</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <router-link :to="`/editbuggerpage`">Create a new bugger page.</router-link>

        <hr>    
        <br>
        <br>

        <div v-if="pages_maintainer.length > 0">
            <h1>You are a maintainer in:</h1>
            
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th scope="col"><b>Id</b></th>
                        <th scope="col"><b>Name</b></th>
                        <th scope="col"><b>Owner id</b></th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="page in pages_maintainer" :key="page">
                        <td>{{page.id}}</td>
                        <td>{{page.name}}</td>
                        <td>{{page.ownerId}}</td>
                        <td style="text-align: end;"><router-link :to="`/overview/?id=${page.id}`">View</router-link> | <router-link :to="`/overview/?id=${page.id}`">Edit</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div v-else style="width: 80%; margin: auto">
        <div v-if="pages_owner.length > 0">
            <h1>Is the owner of:</h1>

            <table class="table table-dark">
                <thead>
                    <tr>
                        <th scope="col"><b>Id</b></th>
                        <th scope="col"><b>Name</b></th>
                        <th scope="col"><b>Maintainer count</b></th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="page in pages_owner" :key="page">
                        <td>{{page.id}}</td>
                        <td>{{page.name}}</td>
                        <td>{{page.maintainers.length}}</td>
                        <td style="text-align: end;"><router-link :to="`/overview/?id=${page.id}`">View</router-link> | <router-link :to="`/overview/?id=${page.id}`">Edit</router-link></td>
                    </tr>
                </tbody>
            </table>  
            <br>
            <br>
        </div>

        <div v-if="pages_maintainer.length > 0">
            <h1>Is a maintainer in:</h1>
            
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th scope="col"><b>Id</b></th>
                        <th scope="col"><b>Name</b></th>
                        <th scope="col"><b>Owner id</b></th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="page in pages_maintainer" :key="page">
                        <td>{{page.id}}</td>
                        <td>{{page.name}}</td>
                        <td>{{page.ownerId}}</td>
                        <td style="text-align: end;"><router-link :to="`/overview/?id=${page.id}`">View</router-link> | <router-link :to="`/overview/?id=${page.id}`">Edit</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>