<script setup lang="ts">
import Report from './report.vue';
import axios from 'axios';
import {AxiosRequestConfig} from 'axios'
</script>

<script lang="ts">
import { URLSearchParams } from 'url';
import { useRoute } from 'vue-router';
import store from '../store';
import endpoints from '../services.json'

export default{
	data(){
		return {
			pageInfo: {},
			reports: [] as {id: number, title: string, description: string}[],	
			currentReport: null as {id: number, title: string, description: string},
		}
	},
	methods: {
		GetReports(filter: string = null){
			let that = this;
			
			let config: AxiosRequestConfig = {
				params: {
					pageId: this.pageInfo.id,
					filter: filter
				}
			}

			axios.get(
				endpoints.urls.bugreport + 'BugReports/all', config
			).then(function (response){
				that.reports = response.data.reverse();
			})
		}
	},
	beforeMount(){
		let that = this;
		axios.get(endpoints.urls.buggerpage + 'BuggerPages/get?pageId=' + this.$route.query.id).then(function (response){
			that.pageInfo = response.data;
			store.data.currentPage = that.pageInfo;
			that.GetReports('');
			that.$emit('updateNav');
		})
	}
}
</script>

<template>

	<div class="sideMenu">
		<input @input="GetReports($event.target.value)" class="bugFilterInput" placeholder="Type to filter...">
		<div class="bugList">
			<div @click="currentReport = item" class="bugListItem" v-for="item in reports" :key="item">
				<h5>{{item.title}}</h5>
			</div>
			<br>
		</div>
	</div>

	<div class="main">
		
		<div v-if="currentReport != null">
			<Report :info="currentReport" @closeReport="currentReport = null" />
		</div>		

		<div v-else class="InfoPage">
			<h2>{{pageInfo.description}}</h2>
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