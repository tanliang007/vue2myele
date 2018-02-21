<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <div class="tab border-1px" id="myDiv">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}" class="tab-item">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/ratings'}" class="tab-item">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/seller'}" class="tab-item">商家</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "components/header/header";
  // 定义返回成功状态码
  const ERR_OK = 0;
  export default {
    name: "App",
    data(){
      return {
        seller: {}
      };
    },
    created(){
      this.$http.get('/api/seller')
      .then(response => {
        if (response.data.errno === ERR_OK){
          // 可以拷贝非嵌套
          this.seller = Object.assign({}, this.seller, response.data.data);
          console.log(this.seller);
        }
      }, err => {
        console.log(err);
      })
      .catch(error => {
        console.log(error);
      });
    },
    components: {
      "v-header": header
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  // mixin需要单独的引入
  @import "common/stylus/mixin.styl"
  .tab
    display: flex
    width: 100%
    line-height: 40px
    height: 40px
    border-1px(rgba(7,17,27,0.5))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(75, 85, 93)
        line-height: 40px
        &.router-link-active
          color: rgb(240, 20, 20)
</style>
