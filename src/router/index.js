import Vue from 'vue';
import Router from 'vue-router';
import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';
import upload from '@/components/upload';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/ratings'
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/upload',
      components: {
        default: ratings,
        upload: upload
      }
    },
    {
      path: '/seller',
      component: seller
    }
  ]
});
