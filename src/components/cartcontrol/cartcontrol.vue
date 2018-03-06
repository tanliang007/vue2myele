<template>
  <div class="cartcontrol">
    <div class=" cart-decrease" v-show="food.count>0"
      @click="decreaseCart"> <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>
<script>
import Vue from 'vue';
  export default{
    props: {
      food: {
        type: Object
      }
    },
    created(){
    },
    methods: {
      addCart(){
        if (!this.food.count) { // 给观测对象直接添加检测不到属性的变化需要使用
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count += 1;
        }
      },
      decreaseCart(){
        if (this.food.count){
          this.food.count -= 1;
        }
      }
    }
  };
</script>
<style lang="stylus" scoped>
  .cartcontrol
    position absolute
    bottom 10px
    right 0px
    font-size 0
    .cart-decrease
      padding 6px
      display inline-block
      opacity 1
      .inner
        display inline-block
        line-height 24px
        font-size 24px
        color rgb(0,160,220)
    .cart-count
      display inline-block
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      vertical-align top
      font-size 10px
      color rgb(147,153,159)
    .cart-add
      font-size 24px
      line-height 24px
      padding 6px
      display inline-block
      color rgb(0,160,220)
</style>
