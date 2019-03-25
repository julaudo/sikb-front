import Vue from 'vue';
import Router, {RouteConfig} from 'vue-router';
import Login from '@/views/Login.vue';
import SimpleView from '@/views/layout/SimpleView.vue';
import {Features} from '@/model/model';

Vue.use(Router);

export const ROUTE_CLUB = 'club';

export const adminRoutes = [
  {
    path: 'persons',
    name: 'persons',
    component: () => import( './views/crud/Persons.vue'),
    meta: {
      features: [Features.ADMIN],
    },
  },
  {
    path: 'seasons',
    name: 'seasons',
    component: () => import( './views/crud/Seasons.vue'),
    meta: {
      features: [Features.ADMIN],
    },
  },
  {
    path: 'clubs',
    name: 'clubs',
    component: () => import( './views/crud/Clubs.vue'),
    meta: {
      features: [Features.ADMIN],
    },
  },
  {
    path: 'users',
    name: 'users',
    component: () => import( './views/crud/Users.vue'),
    meta: {
      features: [Features.ADMIN],
    },
  },
];

export const subRoutes: RouteConfig[] = [
  {
    path: '/home',
    name: 'home',
    meta: {
      icon: 'home',
    },
    component: () => import( './views/Home.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: SimpleView,
    children: adminRoutes,
    meta: {
      icon: 'verified_user',
      features: [Features.ADMIN],
    },
  },
  {
    path: '/club/:clubId',
    name: ROUTE_CLUB,
    component: SimpleView,
    meta: {
      icon: 'verified_user',
      features: [Features.CLUB_ADMIN],
    },
    children: [
      {
        path: 'general',
        name: 'general',
        component: () => import( './views/club/ClubVue.vue'),
        meta: {
          icon: 'verified_user',
          features: [Features.CLUB_ADMIN],
        },
      },
      {
        path: 'affiliations',
        name: 'affiliations',
        component: () => import( './views/club/ClubAffiliations.vue'),
        meta: {
          icon: 'verified_user',
          features: [Features.CLUB_ADMIN],
        },
        children: [
          {
            path: ':seasonId',
            name: 'affiliation',
            component: () => import( './views/club/AffiliationVue.vue'),
            meta: {
              icon: 'verified_user',
              features: [Features.CLUB_ADMIN],
            },
          },
        ],
      },
    ],
  },
];

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      component: () => import( './views/layout/Layout.vue'),
      redirect: '/login',
      children: subRoutes,
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
});

export default router;

