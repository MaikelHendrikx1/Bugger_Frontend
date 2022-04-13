<script lang="ts">

export default{
	props: {
		info: {
			type: Object
		}
	}
}
</script>

<template>
	<div>
		{{info}}	
	</div>
	<button @click="this.$emit('closeReport')">Return to menu</button>
</template>