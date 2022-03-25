<script setup lang="ts">

</script>

<template>
  <div class="header">
    <div class="logo">
      <h1><router-link style="text-decoration: none" :to="{path: '/'}">Bugger</router-link></h1>
    </div>
    <div class="nav">
      <router-link :to="{path: '/'}">Home</router-link> |
      <router-link :to="{path: '/overview'}">Overview</router-link>
    </div>
  </div>
</template>

<style scoped>
  .header{
    width: 100%;
    background-color: indianred;
    min-height: 1rem;
    padding-inline: 20px;
    display: flex;
  }

  h1{
    padding: 5px;
  }

  div{
    margin: 0;
  }

  .logo{
    width: 25%;
  }

  .nav{
    width: 50%;
    margin: auto;
  }

  a{
    color: lightgray;
    padding-inline: 6px;
  }

  .login{
    width: 25%;
    margin: auto;
  }

  body{
    color: lightgray;
  }
</style>