<template>
  <div id="app">
    <router-view/>
    <div class="tab">
			<div class="tab-item">商品</div>
			<div class="tab-item">评论</div>
			<div class="tab-item">商家</div>
		</div>
  </div>
</template>
<script>
export default {
  name: 'App'
};
</script>
<style lang='stylus'>
#app
  .tab
    display: flex
    width: 100%
    line-height: 40px
    height: 40px
    .tab-item
      flex:1
      text-align:center
</style>
