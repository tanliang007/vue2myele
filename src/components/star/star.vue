<template>
  <div class="star" :class="starType">
    <span :key="index" v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>
<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType(){ // 根据size拼接父元素不同的类名决定星星使用的图片的尺寸
        return 'star-' + this.size;
      },
      itemClasses(){
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0; // 说明有半星
        let integer = Math.floor(score);// 有多少全星
        for (let index = 0; index < integer; index++) {
          result.push(CLS_ON);
        }
        if (hasDecimal){
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/mixin"
  .star
    font-size 0
    .star-item
      display inline-block
    &.star-48
      .star-item
        width 20px
        height 20px
        background-size 20px 20px
        margin-right 22px
        background-repeat no-repeat
        &:last-child
          margin-right 0px
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        background-size 15px 15px
        margin-right 16px
        &:last-child
          margin-right 0px
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        background-size 10px 10px
        margin-right 3px
        &:last-child
          margin-right 0px
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
