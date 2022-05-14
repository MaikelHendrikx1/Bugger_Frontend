<script setup lang="ts">
import NavBar from "./components/navbar.vue";
</script>

<script lang="ts">
export default{
  childInterface: {
    UpdateNav: () => {}
  },

  methods: {
    getChildInterface(childInterface) {
      this.$options.childInterface = childInterface;
    },
    updateNav() {
      this.$options.childInterface.UpdateNav();
    }
  }
}
</script>

<template>
  <div>
  <header>
    <NavBar @interface="getChildInterface"/>
  </header>

  <main>
    <router-view @updateNav="updateNav"/>
  </main>

  </div>
</template>

<style>
@import './assets/base.css';

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}
</style>
