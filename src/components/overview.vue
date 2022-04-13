<script setup lang="ts">
import Report from './report.vue';
import axios from 'axios';
</script>

<script lang="ts">
import { URLSearchParams } from 'url';
import json from '../assets/pages.json';
import { useRoute } from 'vue-router';
import store from '../store';

export default{
	data(){
		return {
			pageInfo: {},
			reports: [] as {id: number, title: string, description: string}[],	
			currentReport: null as {id: number, title: string, description: string},
		}
	},
	methods: {
		GetReports(filter: string){
			let that = this;

			axios.get(
				'http://localhost:8080/BugReports/all'
			).then(function (response){
				that.reports = response.data.reverse();
			})
		}
	},
	mounted(){
		this.pageInfo = json.find(p => p.id.toString() == this.$route.query.id);

		this.GetReports('');

		store.data.currentPage = this.pageInfo;
	}
}
</script>

<template>

	<div class="sideMenu" @scroll="CheckScrollEnd($event.target)">
		<input class="bugFilterInput" placeholder="Type to filter...">
		<div class="bugList">
			<div @click="currentReport = item" class="bugListItem" v-for="item in reports" :key="item">
				<h5>{{item.title}}</h5>
			</div>
		</div>
	</div>

	<div class="main">
		
		<div v-if="currentReport != null">
			<Report :info="currentReport" @closeReport="currentReport = null" />
		</div>		

		<div v-else class="InfoPage">
			<h2>Welcome to the bugger page for {{pageInfo.name}}.</h2>
		</div>
	</div>
</template>


<style scoped>
	.InfoPage {
		padding: 2%;
	}

	.main {
		width: 80%;
		float: right;
	}

	.bugListItem {
		background: rgb(73, 68, 84);
		padding: 2%;
		margin-block: 8%;
	}

	.bugListItem:hover{
		cursor: pointer;
	}

	.sideMenu {
		padding: 10px;
		background-color: #212126;
		width: 20%;
		height: 90vh;
		position: fixed;
		overflow-y: auto;
	}

	.bugList {	
		height: 100%;
	}

	.bugFilterInput {
		width: 100%;
	}
</style>