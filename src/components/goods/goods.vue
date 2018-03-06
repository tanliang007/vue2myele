<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li :key="index" v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
        @click="selectMenu(index,$event)" ref="menuList">
          <span class="text">
            <span  :class='classMap[item.type]' v-show="item.type>0" class="icon"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li :key="index" v-for="(item,index) in goods" class="food-list" ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul >
            <li :key="i" v-for="(food,i) in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" heigh='57' :src="food.image" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                </div>
                <cartcontrol :food='food'></cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>
<script type='text/ecmascript-6'>
import BSscroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart';
import cartcontrol from 'components/cartcontrol/cartcontrol';
const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data(){
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  computed: {
    currentIndex () {
      // 根据下标返回index
      for (let i = 0; i < this.listHeight.length; i++){
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
          // 同步左侧分类滚动
          this._followScroll(i);
          return i;
        }
      }
      return 0;
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/goods')
    .then(res => {
      if (res.data.errno === ERR_OK){
        console.log(res.data.data);
        this.goods = res.data.data;// dom还没有变化用vue的接口
        this.$nextTick(() => { // 在计算一些dom相关的需在这回调函数中确认dom已经渲染
          this._initScroll();
          this._calculateHeight();// 初始化高度
        });
      }
    }, err => { console.log(err); })
    .catch(error => { console.log(error); });
  },
  methods: {
    selectMenu(index, event){
      // event._constructed没有这个事件说明是原生点击事件，目前版本已经优化
      if (!event._constructed){
        return;
      }
      let foodList = this.$refs.foodList;
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    _initScroll(){
      this.menuScroll = new BSscroll(this.$refs.menuWrapper, {
        click: true
      });
      // probeType设置之后可以监听滚动位置
      this.foodsScroll = new BSscroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight(){
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++){
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _followScroll(index){
      let menuList = this.$refs.menuList;
      let el = menuList[index];
      this.menuScroll.scrollToElement(el, 300, 0, -100);
    }
  },
  components: {
    shopcart,
    cartcontrol
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';
.goods
  display flex
  position absolute
  top 176px
  // 是到屏幕的底部是为了达到超出内容部分隐藏
  bottom  45px
  width 100%
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px // 安卓兼容
    background-color #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      line-height 14px
      padding 0 12px
      &.current
        position relative
        margin-top -1px
        background #fff
        font-weight 700
        z-index 10
        .text
          &:after
            display none
      .icon
        display inline-block
        width 12px
        height 12px
        background-size 12px 12px
        background-repeat no-repeat
        margin-right 2px
        vertical-align top
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
      .text
        font-size 12px
        display table-cell //相当于td
        vertical-align middle// td的垂直对齐
        border-1px(rgba(7,17,27,0.1))
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      font-size 12px
      border-left 2px solid #d9dde1
      background-color #f3f5f7
    .food-item
      display flex
      margin  18px
      padding-bottom 18px
      border-1px(rgba(7,17,27,0.1))
      &:last-child
        margin-bottom  0px
        &::after
          display none
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin:2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7,17,27)
        .desc,.extra
          line-height 10px
          font-size 10px
          color rgb(147,153,159)
        .desc
          margin-bottom 8px
          line-height 12px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .new
            margin-right 8px
            font-size 14px
            color rgb(240,20,20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147,153,159)
</style>
