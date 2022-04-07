<script lang="ts">
import json from '../assets/pages.json'

export default{
  data(){
    return{
      pages: {} as [{id: number, name: string}]
    }
  },
  methods: {
    UpdatePages(event){
      //get pages by filtering by name from api

      console.log(event.target.value);

      let pgs: {id: number, name: string}[] = [
        {id: 1, name: 'minecraft'},
        {id: 2, name: 'roblox'},
        {id: 3, name: 'bloons'},
        {id: 4, name: 'engineer'},
        {id: 5, name: 'mock'} 
      ];

      this.pages = pgs;
    }
  }
}
</script>

<template>
  <div class="header">
    <div class="logo">
      <h1><router-link class="navEntry" style="text-decoration: none" :to="{path: '/'}">Bugger</router-link></h1>
    </div>
    <div class="nav">
      <input @input="UpdatePages($event)" type="text" id="inp" data-bs-toggle="dropdown"/>
      <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="inp">
        <li v-for="page in pages" :key="page.name">
          <router-link :to="`/${page.name}/overview`" class="dropdown-item">{{page.name}}</router-link>
        </li>

        <li v-if="!pages.length">No pages found</li>
      </ul>

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

  .nav{
    width: 50%;
    margin-block: auto;
    margin-inline: 5%;
  }

  .navEntry{
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