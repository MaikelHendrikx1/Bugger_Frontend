<script lang="ts">
import axios, { AxiosError } from 'axios';
import endpoints from '../services.json';
import {AxiosRequestConfig} from 'axios';
import store from '../store';

export default{
    data() {
        return {
            usernameMessage: "",
            emailMessage: "",
            passwordMessage: "",
            passwordRepeatMessage: ""
        }
    },

    methods: {
        AttemptLogin(){
            let inputUsername = document.getElementById("input_username") as HTMLInputElement;
            let inputEmail = document.getElementById("input_email") as HTMLInputElement;
            let inputPassword = document.getElementById("input_password") as HTMLInputElement;
            let inputPasswordRepeat = document.getElementById("input_password_repeat") as HTMLInputElement;

            let anyProblems = false;
            if (inputUsername.value.length < 3){
                this.usernameMessage = "Username has to be atleast 3 characters long.";
                anyProblems = true;
            }

            if (inputEmail.value == '' || !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputEmail.value)){
                this.emailMessage = "Email address is invalid.";
                anyProblems = true;
            }

            if (inputPassword.value.length < 12 || !/(^(?=.*[a-z])(?=.*[A-Z]))(^(?=.*\d))((?=.*[^A-Za-z0-9]))/.test(inputPassword.value)){
                this.passwordMessage = "Password does not meet security standards. Ensure that: \r\n - Password is longer than 12 characters. \r\n - Password contains both lowercase and uppercase letters. \r\n - Password contains atleast one number. \r\n - Password contains atleast one special character, e.g., ! @ * þ $. \r\n"
                anyProblems = true;
            }

            if (inputPassword.value != inputPasswordRepeat.value){
                this.passwordRepeatMessage = "Passwords do not match."
                anyProblems = true;
            }

            if (!anyProblems){
                let config: AxiosRequestConfig = {
                    params: {
                        email: inputEmail.value,
                        username: inputUsername.value,
                        password: inputPassword.value
                    }
                }

                axios.get(endpoints.urls.account + "Account/register?", config).then(
                    function(response) { 
                        alert(response.data.message);

                        //TODO: send verification email
                    }
                ).catch(
                    function(error: AxiosError) {
                        alert(error.response.data.message);
                        console.log(error.response);
                    }
                )
            }
        }
    }
}
</script>

<template>
    <div class="card-body" style="width: 50%; margin: auto;">
        <h1>Register</h1>
        <form>
            <div class="form-group">
                <label for="input_username">Username:</label>
                <div v-if="usernameMessage.length != ''" class="alert alert-danger">{{usernameMessage}}</div>
                <input @input="usernameMessage = ''" required class="form-control" id="input_username" type="text">
            </div>
            <br>

            <div class="form-group">
                <label for="input_email">Email:</label>
                <div v-if="emailMessage.length != ''" class="alert alert-danger">{{emailMessage}}</div>
                <input @input="emailMessage = ''" required class="form-control" id="input_email" type="email">
            </div>
            <br>

            <div class="form-group">
                <label for="input_password">Password:</label>
                <pre v-if="passwordMessage != ''" class="alert alert-danger">{{passwordMessage}}</pre>
                <input @input="passwordMessage = ''" required class="form-control" id="input_password" type="password">
            </div>
            <br>

            <div class="form-group">
                <label for="input_password_repeat">Repeat password:</label>
                <div v-if="passwordRepeatMessage != ''" class="alert alert-danger">{{passwordRepeatMessage}}</div>
                <input @input="passwordRepeatMessage = ''" required class="form-control" id="input_password_repeat" type="password">
            </div>
            <br>
            <button @click="AttemptLogin" type="button">Log in</button>
        </form>
    </div>
</template>