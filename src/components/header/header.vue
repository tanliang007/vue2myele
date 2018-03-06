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
    <transition name="fade">
      <div v-show="detailshow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size='48' :score='seller.score'></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="supports-item" :key=index v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDeatail">
        <div class="icon-close" ></div>
      </div>
    </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import star from 'components/star/star';
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
        this.detailshow = true;
      },
      hideDeatail(){
        this.detailshow = false;
      }
    },
    components: {
      star
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
      backdrop-filter blur(2px)
      &.fade-enter-active,&.fade-leave-active // 过度的时候添加过渡属性
        transition all 3s
      &.fade-enter,&.fade-leave-to // 离开的时候
        opacity: 0
      .detail-wrapper
        width: 100%
        min-height 100%
        .detail-main
          margin-top 64px
          // 底部close的高度
          padding-bottom 64px
          .name
            line-height 16px
            text-align center
            font-size 16px
            font-weight 700
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
        .title
          display flex
          width 80%
          margin 28px auto 24px auto
          .text
            padding 0px 10px
            font-size 15px
            font-weight 700
          .line
            flex 1// 会使用到postcss帮我们做兼容处理
            margin-bottom 6px
            border-1px(rgba(255,255,255,0.2))
        .supports
          margin 0 auto
          width 80%
          .supports-item
             margin-bottom: 12px
             &:last-child
               margin-bottom: 0
            .icon
              display inline-block
              width 16px
              height 16px
              margin-right 4px
              vertical-align top
              background-size 16px 16px
              background-repeat no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.guarantee
                bg-image('guarantee_2')
              &.invoice
                bg-image('invoice_2')
              &.special
                bg-image('special_2')
            .text
              font-size 12px
              font-weight 200
              color rgb(255,255,255)
              line-height 16px
        .bulletin
          width 80%
          margin 0 auto
          .content
            font-size 12px
            line-height 15px
            padding 0 12px
    .icon-close
      position relative
      width 32px
      height 32px
      margin -50px auto 0 auto
      clear both
      font-size 32px
</style>
