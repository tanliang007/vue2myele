<template>
  <div>
		<div  :key='item' v-for="(item,index) in list" :class="index === list.length-1 ? '' :'a' ">
			<div>{{item}}</div>
		</div>
	</div>
</template>
<script>
export default {
	data () {
		return {
			list: ['哈', '洗', '黑']
		};
	}
};
</script>
<style lang="stylus" scoped>
</style>
