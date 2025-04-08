import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue'),
      name: 'home'
    },
    {
      path: '/animals',
      component: () => import('../views/animals/AnimalList.vue'),
      name: 'animal-list'
    },
    {
      path: '/animals/:id',
      component: () => import('../views/animals/AnimalDetail.vue'),
      name: 'animal-detail'
    },
    {
      path: '/adopt',
      component: () => import('../views/adopt/AdoptionForm.vue'),
      name: 'adoption-form'
    },
    {
      path: '/donate',
      component: () => import('../views/donate/Donate.vue'),
      name: 'donate'
    },
    {
      path: '/donations',
      component: () => import('../views/donate/DonationList.vue'),
      name: 'donation-list'
    },
    {
      path: '/community',
      component: () => import('../views/community/Community.vue'),
      name: 'community'
    },
    {
      path: '/user',
      component: () => import('../views/user/UserCenter.vue'),
      name: 'user-center'
    },
    {
      path: '/login',
      component: () => import('../views/auth/Login.vue'),
      name: 'login'
    },
    {
      path: '/register',
      component: () => import('../views/auth/Register.vue'),
      name: 'register'
    }
  ]
});

export default router;