<script lang="ts">
import { URLSearchParams } from 'url';
import { Router, useRoute } from 'vue-router';
import store from '../store';
import endpoints from '../services.json'
import {AxiosError, AxiosRequestConfig} from 'axios';

import axios from 'axios';

export default {
    data() {
        return {
            pageInfo: null as {id: Number, name: String, description: String, ownerId: Number, maintainers: [number]},
            createNew: false as boolean,
            maintainerList: [],
            addMaintainerElement: null as HTMLInputElement
        }
    },
    methods: {
        addMaintainer(){
            try {
                let that = this;
                let newMaintainerEmail = this.addMaintainerElement.value;

                if (newMaintainerEmail == store.data.authenticatedUser.email) {
                        alert("Can not add yourself as a maintainer.");
                        throw "exit";
                }

                that.maintainerList.forEach(element => {
                    if (element.email == newMaintainerEmail){
                        alert("'" + newMaintainerEmail + "' is already a maintainer.");
                        throw "exit";
                    }
                });

                let config: AxiosRequestConfig = {
                    params: {
                        email: newMaintainerEmail,
                    }
                }

                axios.get(endpoints.urls.account + 'Account/getByEmail', config).then(
                    function(response){
                        that.maintainerList.push(response.data);
                        that.addMaintainerElement.value = '';
                    }
                ).catch(
                    function(error: AxiosError){
                        if (error.response.status == 404){
                            alert("Found no user with email '" + newMaintainerEmail + "'. Are you sure the user has made an account on Bugger?")
                        }
                    }
                )
            }
            catch {

            }
        },
        removeMaintainer(maintainer){
            this.maintainerList.splice(this.maintainerList.indexOf(maintainer), 1);
        },
        CreatePage(){
            let name = (document.getElementById('input_name') as HTMLInputElement).value;
            let description = (document.getElementById('input_description') as HTMLInputElement).value;
            let that = this;

            if (name.length > 3){
                let data = {
                    name: name,
                    description: description,
                    ownerId: store.data.authenticatedUser.id,
                    maintainers: this.maintainerList.map(a => a.id)
                }

                console.log(data);

                axios.post(endpoints.urls.buggerpage + 'BuggerPages/add', data)
                .then (
                    function (response) {
                        if (typeof response.data == "number"){
                            that.$router.push({ path: '/overview/', query: {id: response.data} })
                        }
                        else {
                            alert("Something went wrong while trying to create this page.");
                            console.log(response);
                        }
                    }
                )
                .catch (
                    function (error) {
                        if (error.response.status == 422) {
                            alert("A page with this name already exists.");
                        }
                        else {
                            alert("Something went wrong while trying to create this page.");
                            console.log(error);
                            console.log(error.response);
                        }
                    }
                )
            }   
            else {
                alert('Name has to be longer than 3 characters.')
            }
        }
    },
    beforeMount() {
        let that = this;
        if (this.$route.query.id != null){
            axios.get(endpoints.urls.buggerpage + 'buggerpages/get?pageId=' + this.$route.query.id).then(
                function(response) {
                    if (store.data.authenticatedUser.loggedIn && response.data.ownerId == store.data.authenticatedUser.id) {
                        that.pageInfo == response.data;
                    }
                    else {
                        that.createNew = false;
                    }
                }
            )
        }
        else {
            that.createNew = true;
        }
    },
    mounted() {
        this.addMaintainerElement = document.getElementById('input_addMaintainer');
    }
}
</script>

<template>
    <div class="card-body" style="width: 50%; margin: auto;" v-if="pageInfo == null && createNew">
        <h1>Creating a new page.</h1>
        <form>
            <div class="form-group">
                <label for="input_name">Page name:</label>
                <h6 class="text-warning">Can not be changed later.</h6>
                <input required class="form-control" id="input_name" type="text">
            </div>
            <br>
            
            <div class="form-group">
                <label for="input_description">Page description:</label>
                <textarea required class="form-control" id="input_description" type="text"/>
            </div>
            <br>

            <div class="form-group">
                <label for="input_description">Add a maintainer (by email)</label>

                <div class="input-group">
                    <input class="form-control" id="input_addMaintainer" type="text" aria-describedby="addMaintainerBtn">
                    <button id="addMaintainerBtn" class="btn btn-secondary" @click="addMaintainer()" type="button">Add</button>
                </div>

                <br>
                
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="maintainer in maintainerList" :key="maintainer">
                            <th>{{maintainer.id}}</th>
                            <th>{{maintainer.email}}</th>
                            <th>{{maintainer.username}}</th>
                            <th><b @click="removeMaintainer(maintainer)" style="color: red; cursor: pointer">[x]</b></th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br>

            <button @click="CreatePage" type="button">Create page</button>
        </form>
    </div>

    <div v-else-if="pageInfo != null && !createNew">
        editing existing page
    </div>

    <div v-else>
        Unauthorized
    </div>
</template>