<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{highlight:totalCount>0}">
                        <i class="icon-shopping_cart" :class="{highlight:totalCount>0}"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{highlight:totalCount>0}">¥{{totalPrice}}</div>
                <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">
                  {{payDesc}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 0,
            count: 0
          }
        ];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrice(){
      let total = 0;
      this.selectFoods.forEach((food) => {
          total += food.price * food.count;
      });
      console.log(total);
      return total;
    },
    totalCount(){
      let count = 0;
      this.selectFoods.forEach((food) => {
          count += food.count;
      });
      return count;
    },
    payDesc(){ // 处理详情文字显示
     if (this.totalPrice === 0){
       return `¥${this.minPrice}元起送`;
     } else if (this.totalPrice < this.minPrice){
       let diff = this.minPrice - this.totalPrice;
       return `还差¥${diff}元起送`;
     } else {
       return '去结算';
     }
    },
    payClass() { // 处理返回类名
      if (this.totalPrice < this.minPrice){
        return 'not-enough';
      } else {
        return 'enough';
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.shopcart
  position fixed
  left 0px
  bottom 0px
  z-index 50
  width 100%
  height 48px
  background-color blue
  .content
    display flex
    background-color #141d27
    // 作用子元素有inline-blok的时候在缩进代码时会占据宽度去除间距
    font-size 0px
    color rgba(255,255,255,0.4)
    .content-left
      flex 1
      .logo-wrapper
        display inline-block
        position relative
        top -10px
        margin 0 12px
        padding 6px
        height 56px
        width 56px
        box-sizing border-box
        vertical-align top
        border-radius 50%
        background rgb(20,29,39)
        .logo
          height 100%
          width 100%
          border-radius 50%
          background #2b343c
          text-align: center;
          &.highlight
            background-color #00a0dc
          .icon-shopping_cart
            font-size 24px
            line-height 44px
            color #80858a
            &.highlight
              color #fff
        .num
          position absolute
          top 0px
          right 0px
          font-size 9px
          color red
          width 24px
          height 16px
          line-height 20px
          font-weight 700
          text-align center
          color #fff
          background rgb(240,20,20)
          border-radius 16px
          box-shadow 0 4px 8px 0px rgba(0,0,0,0.4)
      .price
        display inline-block
        font-size 16px
        vertical-align top
        margin-top 12px
        line-height 24px
        box-sizing border-box
        padding-right 12px
        font-weight 700
        border-right 1px solid rgba(255, 255, 255, 0.1)
        &.highlight
          color #fff
      .desc
        display inline-block
        font-size 16px
        vertical-align top
        margin 12px 0 0 12px
        line-height 24px
        font-size 10px
    .content-right
      width 105px
      flex 0 0 105px
      .pay
        font-size 12px
        height 48px
        font-weight 700
        background-color #2b333b
        line-height 48px
        text-align center
        &.not-enough
          background-color #2b333b
        &.enough
          background-color #00b43c
          color #fff
</style>
