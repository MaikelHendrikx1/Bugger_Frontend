<script setup lang="ts">
import NavBar from "./components/navbar.vue";
</script>

<script lang="ts">
export default{

}
</script>

<template>
  <div>
  <header>
    <NavBar/>
  </header>

  <main>
    <router-view/>
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
