<script lang="ts">
import axios from 'axios'
import endpoints from '../services.json';

export default{
	props: {
		info: {
			type: Object
		}
	},
	data() {
		return {
			infoUser: {}
		}
	},
	beforeMount() {
		let that = this;
		axios.get(endpoints.urls.account + 'Account/get', {params: {id: that.info.userId}}).then(
            function (response){
                that.infoUser = response.data;
			}
		).catch (
			function () {
				that.infoUser = {id: 0}
			}
		)
	}
}
</script>

<template>
<div style="margin: 3%">
	<div>
		<h1>{{info.title}}</h1>
		<hr>
		<p>{{info.description}}</p>	
	</div>
	<div style="position: fixed; bottom: 10px">
		<h3>
			<div v-if="infoUser.id != 0"> {{infoUser.username}} | {{infoUser.email}} </div>
			<div v-else> Created through the public API </div>
			<button style="position: fixed; right: 10px; bottom: 10px" @click="this.$emit('closeReport')">Return to menu</button>
		</h3> 
		
	</div>
</div>
</template>