<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab" id="myDiv">
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

<script>
  import header from "components/header/header";
  export default {
    name: "App",
    components: {
      "v-header": header
    },
    created() {
      // class Animal { supert 关键字
      //   constructor(color) {
      //     this.color = color;
      //   }
      //   run() {
      //     return "run";
      //   }
      // }
      // class Bear extends Animal {
      //   constructor() {
      //     super();
      //   }
      //   a() {
      //     console.log(super.run());
      //   }
      // }
      // const a = new Bear();
      // a.a();
    }
  };
</script>

<style lang='stylus'>
#app {
  .tab {
    display: flex;
    width: 100%;
    line-height: 40px;
    height: 40px;

    .tab-item {
      flex: 1;
      text-align: center;

      & > a {
        display: block;
        font-size: 14px;
        color: rgb(75, 85, 93);
        line-height: 28px;

        &.router-link-active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
