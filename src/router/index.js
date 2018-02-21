import Vue from 'vue';
import Router from 'vue-router';
import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';
Vue.use(Router);
var router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/ratings'
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/seller',
      component: seller
    }
  ]
});
export default router;
// 刷新会自动走一遍路由
router.push('goods');
