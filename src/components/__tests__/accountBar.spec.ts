import { describe, it, expect, test } from "vitest";

import { mount } from "@vue/test-utils";

import AccountBar from "../../components/accountBar.vue";
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from "../../main";

import store from "../../store";
import { debug } from "console";

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// when the user is not logged in, there should be a login button and a register button and no logout button and no profile button
test("UserLoggedOutCorrectButtons", () => {
    //create the router
    const wrapper = mount(AccountBar, {
        router
    });

    //set user to be logged out
    store.data.authenticatedUser = { id: 0, loggedIn: false, name: '', email: '' };

    //wait for the store to update
    delay(10).then(() => {
        //expect the correct buttons to be visible
        expect(wrapper.find("#login-button").exists()).toBe(true);
        expect(wrapper.find("#register-button").exists()).toBe(true);
        expect(wrapper.find("#logout-button").exists()).toBe(false);
        expect(wrapper.find("#profile-button").exists()).toBe(false);
    });
});

// when the user is logged in, there should be a logout button and a profile button and no login button and no register button
test("UserLoggedInCorrectButtons", () => {
    //create the router
    const wrapper = mount(AccountBar, {
        router
    });

    //set user to be logged in
    store.data.authenticatedUser = { id: 1, loggedIn: true, name: 'Maikel Hendrikx', email: 'maikel.hendrikx@outlook.com' };

    //wait for the store to update
    delay(10).then(() => {
        //expect the correct buttons to be visible
        expect(wrapper.find("#login-button").exists()).toBe(false);
        expect(wrapper.find("#register-button").exists()).toBe(false);
        expect(wrapper.find("#logout-button").exists()).toBe(true);
        expect(wrapper.find("#profile-button").exists()).toBe(true);
    });
});



