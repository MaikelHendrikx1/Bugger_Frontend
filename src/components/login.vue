<script lang="ts">
import { emitWarning } from 'process';
import { Console } from 'console';
import axios, { AxiosError } from 'axios';
import endpoints from '../services.json';
import {AxiosRequestConfig} from 'axios';
import store from '../store';

export default{
    data() {
        return {

        }
    },

    methods: {
        AttemptLogin(){
            let inputEmail = document.getElementById("input_email") as HTMLInputElement;
            let inputPassword = document.getElementById("input_password") as HTMLInputElement;

            let config: AxiosRequestConfig = {
                params: {
                    email: inputEmail.value,
                    password: inputPassword.value
                }
            }

            let that = this;
            axios.get(endpoints.urls.account + "Account/login", config).then(
                function(response) { 
                    store.data.authenticatedUser.loggedIn = true;
                    store.data.authenticatedUser.id = response.data.id;
                    store.data.authenticatedUser.email = response.data.email;
                    store.data.authenticatedUser.name = response.data.username;

                    that.$router.push({ path: '/profile/', query: {id: response.data.id} })
                }
            ).catch(
                function(error: AxiosError) {
                    alert(error.response.data.message);
                }
            )         
        }
    }
}
</script>

<template>
    <div class="card-body" style="width: 50%; margin: auto;">
        <h1>Log in</h1>
        <form>
            <div class="form-group">
                <label for="input_email">Email:</label>
                <input required class="form-control" id="input_email" type="email">
            </div>
            <br>

            <div class="form-group">
                <label for="input_password">Password:</label>
                <input required class="form-control" id="input_password" type="password">
            </div>
            <br>
            <button @click="AttemptLogin" type="button">Log in</button>
        </form>
    </div>
</template>