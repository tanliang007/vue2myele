<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
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
        <div class="content-right" @click.stop="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div :key="index" v-for="(ball,index) in balls">
          <transition name="drop" v-on:before-enter="beforeDrop" v-on:enter='dropping' v-on:after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner innerhook">{{ball.num}}</div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listshow">
          <div class="list-header ">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" :key="index" v-for="(food,index) in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>¥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" @click="hideList" v-show="listshow"></div>
  </div>

</template>
<script>
import BScroll from "better-scroll";
import cartcontrol from "components/cartcontrol/cartcontrol";
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
  data() {
    return {
      balls: [
        {
          show: false,
          num: 1
        },
        {
          show: false,
          num: 2
        },
        {
          show: false,
          num: 3
        },
        {
          show: false,
          num: 4
        },
        {
          show: false,
          num: 5
        }
      ],
      dropsBalls: [],
      fold: true
    };
  },
  updated() {},
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      // 处理详情文字显示
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差¥${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    payClass() {
      // 处理返回类名
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },
    listshow() {
      // 根据商品数量显示隐藏
      /* eslint-disable */
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      // console.log(show);
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          // 都是第一个
          ball.show = true;
          ball.el = el;
          this.dropsBalls.push(ball);
          // console.log(this.dropsBalls);
          return;
        }
      }
    },
    addFood(event) {
      // 在当前组件触发自己的动画
      this.drop(event.target);
    },
    beforeDrop(qiu) {
      // console.log("触发了");
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          // 肯定是当前做动画的
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 20);
          // qiu.style.display = '';
          qiu.style.transform = `translate3d(0,${y}px,0)`;
          let inner = qiu.getElementsByClassName("innerhook")[0];
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    dropping(qiu, done) {
      let rf = qiu.offsetHeight; // 强制重绘可以保证 dom 位置渲染正确后再执行之后的动画
      this.$nextTick(() => {
        qiu.style.transform = "translate3d(0,0,0)";
        let inner = qiu.getElementsByClassName("innerhook")[0];
        inner.style.transform = "translate3d(0,0,0)";
        qiu.addEventListener("transitionend", done);
      });
    },
    afterDrop(qiu) {
      // 将正在做动画的小球置为false引用类型引用  和drop事件置为true呼应 都是第一个
      let ball = this.dropsBalls.shift();
      if (ball) {
        ball.show = false; // 不重置drop事件最后就不会进了 ,就不会置为show 没变化了钩子函数就不会进了
        qiu.style.display = "none"; // 目前只知道点快了会出现失效钩子函数就得这玩
      }
      // console.log(this.balls);
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    hideList() {
      this.fold = true;
    },
    empty() {
      // 清空购物车
      console.log(this.selectFoods);
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      alert(`需要支付${this.totalPrice}元`);
    }
  },
  components: {
    cartcontrol
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
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
    color rgba(255, 255, 255, 0.4)
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
        background rgb(20, 29, 39)
        .logo
          height 100%
          width 100%
          border-radius 50%
          background #2b343c
          text-align center
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
          background rgb(240, 20, 20)
          border-radius 16px
          box-shadow 0 4px 8px 0px rgba(0, 0, 0, 0.4)
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
  .ball-container
    .ball
      position fixed
      bottom 20px
      left 32px
      transition all 0.3s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width 16px
        height 16px
        border-radius 50%
        background rgb(0, 160, 220)
        transition all 0.3s linear
  .shopcart-list
    position absolute
    top 0
    left 0
    width 100%
    background-color red
    z-index -1
    transform translate3d(0, -100%, 0)
    &.fold-enter-active, &.fold-leave-active
      transition all 0.5s
    &.fold-enter, &.fold-leave-to
      transform translate3d(0, -200%, 0)
    .list-header
      height 40px
      line-height 40px
      padding 0 18px
      background #f3f5f7
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .title
        float left
        font-size 14px
        color rgb(7, 17, 27)
      .empty
        float right
        font-size 12px
        color rgb(0, 160, 220)
    .list-content
      padding 0 18px
      max-height 217px
      overflow hidden
      background #fff
      .food
        position relative
        padding 12px 0
        box-sizing border-box
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height 24px
          font-size 14px
          color rgb(7, 17, 27)
        .price
          position absolute
          right 90px
          bottom 13px
          line-height 24px
          font-size 14px
          font-weight 700
          color rgb(240, 20, 20)
        .cartcontrol
          position absolute
          right 0px
          bottom 7px
.list-mask
  position fixed
  top 0
  left 0
  height 100%
  width 100%
  opacity 1
  background-color rgba(7,13,27,0.6)     
</style>
