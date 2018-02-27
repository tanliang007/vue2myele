<template>
  <div class="header">
		<div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64"  :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support"><!-- 防止报错 -->
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
       <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <div v-show="detailshow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="icon-close"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
      detailshow: false
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      showDetail(){
        console.log(1);
        this.detailshow = true;
      }
    }
  };
</script>
<style lang="stylus" scoped rel='stylesheet/stylus'>
  @import "../../common/stylus/mixin"
  .header
    position: relative;
    color #fff
    overflow hidden
    background rgba(7, 17, 27, 0.4)
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      font-size 0
      // 可以去除代码中缩进空格造成的空格
      .avatar
        display inline-block
        font-size 14px
        img
          border-radius 5px
      .content
        display inline-block
        margin-left 16px
        font-size 14px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            font-size 16px
            margin-left 6px
            line-height 18px
            font-weight bold
        .description
          margin-bottom 12px
          font-size 12px
          line-height 12px
        .support
          .icon
            display inline-block
            width 12px
            height 12px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height: 12px
            font-size: 10px
            vertical-align top
      .support-count
        position absolute
        right 12px
        bottom 14px
        padding 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        text-align: center
        background: rgba(0, 0, 0, 0.2)
        .count
          font-size 10px
          vertical-align top
        .icon-keyboard_arrow_right
          font-size 10px
          margin-left 2px
          line-height 24px
    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      .bulletin-title
        display inline-block
        vertical-align: top;
        margin-top: 8px;
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        vertical-align: top;
        margin: 0 4px;
        font-size: 10px;
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .background
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter blur(10px)
    .detail
      position fixed
      left 0
      top 0
      width 100%
      height 100%
      z-index 100
      overflow auto
      background-color rgba(7,17,27,0.8)
      .detail-wrapper
        width: 100%
        min-height 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
    .icon-close
      position relative
      width 32px
      height 32px
      margin -64px auto 0 auto
      clear both
      font-size 32px
</style>
