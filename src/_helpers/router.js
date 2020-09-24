import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'
import CafeAdminEnterItemPage from '../cafe/CafeAdminEnterItem'
import CafeAdminViewAllItemPage from '../cafe/CafeAdminViewAllItem'
import CafeCustomerEnterOrderPage from '../cafe/CafeCustomerEnterOrder'
import CafeCustomerEnterDetailPage from '../cafe/CafeCustomerEnterDetail'
import CafeCustomerConfirmOrderPage from '../cafe/CafeCustomerConfirmOrder'
import CafeKitchenViewOrderPage from '../cafe/CafeKitchenViewOrder'
import CafeKitchenViewOrderPageCreated from '../cafe/CafeKitchenViewOrderCreated'
import CafeKitchenViewOrderPageCompleted from '../cafe/CafeKitchenViewOrderCompleted'
import CafeKitchenViewOrderPageCancelled from '../cafe/CafeKitchenViewOrderCancelled'
import CustomerViewOrderPage from '../cafe/CustomerViewOrder'
const Author  = {
  template: '<div>Author: {{ $route.params.tableid}}</div>'
}

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: HomePage, props: true },
    { path: '/login', name: 'LoginPage', component: LoginPage, props: true },
    { path: '/register', name: 'RegisterPage', component: RegisterPage, props: true },
    { path: '/admin', name: 'CafeAdminEnterItemPage', component: CafeAdminEnterItemPage, props: true },
    { path: '/admin/items', name: 'CafeAdminViewAllItemPage', component: CafeAdminViewAllItemPage, props: true},
    { path: '/kitchen/orders', name: 'CafeKitchenViewOrderPage', component: CafeKitchenViewOrderPage, props: true},
    { path: '/customer/orders', name: 'CustomerViewOrderPage', component: CustomerViewOrderPage, props: true},
    { path: '/kitchen/orders/created', name: 'CafeKitchenViewOrderPageCreated', component: CafeKitchenViewOrderPageCreated, props: true},
    { path: '/kitchen/orders/completed', name: 'CafeKitchenViewOrderPageCompleted', component: CafeKitchenViewOrderPageCompleted, props: true},
    { path: '/kitchen/orders/cancelled', name: 'CafeKitchenViewOrderPageCancelled', component: CafeKitchenViewOrderPageCancelled, props: true},
    {
      path: '/customerorder/:tableid',
      name: 'CafeCustomerEnterOrderPage',
      component: CafeCustomerEnterOrderPage,
      props: true,
    },
    {
      path: '/customerdetail/:tableid',
      name: 'CafeCustomerEnterDetailPage',
      component: CafeCustomerEnterDetailPage,
      props: true,
    },
    {
      path: '/customerconfirm/:tableid',
      name: 'CafeCustomerConfirmOrderPage',
      component: CafeCustomerConfirmOrderPage,
      props: true,
    },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [
    '/login',
    '/register',
    '/admin',
    '/admin/items',
    '/customerorder/1',
    '/kitchen/orders',
  ];
  /*
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  */

  next();
})