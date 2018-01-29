<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab" id="myDiv">
      <div class="tab-item" >
        <router-link  :to="{path:'/goods'}"  class="tab-item">商品</router-link>
      </div>
			<div class="tab-item">
        <router-link  :to="{path:'/ratings'}"  class="tab-item">评论</router-link>
        </div>
			<div class="tab-item">
        <router-link  :to="{path:'/seller'}"  class="tab-item">商家</router-link>
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
  // 深拷贝
  // 1，对于字符串类型，浅复制是对值的复制，对于对象来说，浅复制是对对象地址的复制，并没有开辟新的栈，也就是复制的结果是两个对象指向同一个地址，修改其中一个对象的属性，则另一个对象的属性也会改变，而深复制则是开辟新的栈，
  // 两个对象对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性。深复制实现代码如下：
  var china = {
    nation: '中国',
    birthplaces: ['北京', '上海', '广州'],
    skincolr: 'yellow',
    friends: ['sk', 'ls']
    };
    //  深复制要想达到深复制就需要用递归
    function deepCopy(o, c) {
      c = c || {};
	    for (var i in o) {
      // console.log(typeof o[i]);
	    if (typeof o[i] === 'object') {
        // 要考虑深复制问题了
        if (o[i].constructor === Array) {
          // 这是数组
          c[i] = [];
        } else {
        // 这是对象
          c[i] = {};
        }
          deepCopy(o[i], c[i]);
      } else {
        c[i] = o[i];
      }
      // console.log(c);
	  	};
      return c;
	  }
	  var result = {name: 'result'};
    result = deepCopy(china, result);
    console.log(china);
    result.skincolr = 'blue';
    console.log(result);
    console.log(china);
    // 浅拷贝
    var json1 = {"a": "李鹏", "arr1": [1, 2, 3]};
    function copy (obj1) {
        var obj2 = {nation: '中国'};
        for (var i in obj1) {
        obj2[i] = obj1[i];
        }
        return obj2;
  };
    var json2 = copy(json1);
    json1.arr1.push(4);
    console.log(json1);// 1234
    console.log(json2);// 1234
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
