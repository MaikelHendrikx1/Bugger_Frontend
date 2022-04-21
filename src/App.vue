<script setup lang="ts">
import NavBar from "./components/navbar.vue";
</script>

<script lang="ts">
export default{
  methods: {
    updateNav() {
      //call UpdateNav() in <NavBar/>
      this.$refs.NavBar.UpdateNav();
    }
  }
}
</script>

<template>
  <div>
  <header>
    <NavBar ref="NavBar"/>
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
