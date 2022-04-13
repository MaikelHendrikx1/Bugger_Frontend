<script lang="ts">
import { URLSearchParams } from 'url';
import json from '../assets/pages.json';
import { Router, useRoute } from 'vue-router';
import store from '../store';

import axios from 'axios';

export default {
  data(){
		return {
			pageInfo: {}
		}
	},
	beforeMount(){
		this.pageInfo = json.find(p => p.id.toString() == this.$route.query.id);
		store.data.currentPage = this.pageInfo;
	},
  methods: {
    InputAutoGrow(elem: HTMLTextAreaElement){
       elem.style.height = (elem.scrollHeight + 'px');
    },
    Submit(){
      let data = {
        title: (document.getElementById('form_input_title') as HTMLInputElement).value,
        description: (document.getElementById('form_input_description') as HTMLTextAreaElement).value
      }

      axios.post('http://localhost:8080/BugReports/add', data)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        alert(error.response);
      })
      .finally(() => {
        this.$router.push({ path: '/overview/', query: {id: this.pageInfo.id} })
      });
    }
  }
}
</script>


<template>
<div class="card">
  <div class="card-header">
    <h2>Creating a bug report for {{pageInfo.name}}.
      <span class="align-right">
        <router-link :to="`/overview/?id=${pageInfo.id}`">Cancel</router-link>
      </span>
    </h2>  
  </div>
  <form @submit.prevent="Submit()" method="post" class="card-body">
    <div class="mb-3">
      <label for="form_input_title" class="form-label">Title:</label>
      <input required type="text" class="form-control" id="form_input_title" placeholder="Add a short description of your problem.">
    </div>
    <div class="mb-3">
      <label for="form_input_description" class="form-label">Description:</label>
      <textarea required @input="InputAutoGrow($event.target)" style="height: 0; resize: none; overflow: hidden" class="form-control" id="form_input_description" placeholder="Explain your problem in detail, including steps to reproduce."/>
    </div>
    <button type="submit" class="btn btn-dark">Submit</button>
  </form>
  </div>
</template>

<style scoped>
form{
  padding-inline: 5vw;
  padding-block: 5vh;
}

.card{
  background-color: #3c4047;
  border: 10px solid #513535;
  margin-inline: 5vw;
  margin-block: 10vh;
}

.align-right{
  float: right;
}
</style>