import Vue from 'vue';
import Router, {RouteConfig} from 'vue-router';
import SimpleView from '@/views/layout/SimpleView.vue';
import {Functionality} from '@/generated';

Vue.use(Router);

export const ROUTE_CLUB = 'club';

export const adminRoutes = [
  {
    path: 'persons',
    name: 'persons',
    component: () => import( './views/crud/Persons.vue'),
    meta: {
      features: [Functionality.PERSONREAD],
    },
  },
  {
    path: 'seasons',
    name: 'seasons',
    component: () => import( './views/crud/Seasons.vue'),
    meta: {
      features: [Functionality.SEASONREAD],
    },
  },
  {
    path: 'clubs',
    name: 'clubs',
    component: () => import( './views/crud/Clubs.vue'),
    meta: {
      features: [Functionality.CLUBREAD],
    },
  },
  {
    path: 'users',
    name: 'users',
    component: () => import( './views/crud/Users.vue'),
    meta: {
      features: [Functionality.USERREAD],
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
    },
  },
  {
    path: '/club/:clubId',
    name: ROUTE_CLUB,
    component: SimpleView,
    meta: {
      icon: 'verified_user',
    },
    children: [
      {
        path: 'general',
        name: 'general',
        component: () => import( './views/club/ClubVue.vue'),
        meta: {
          icon: 'verified_user',
        },
      },
      {
        path: 'affiliations',
        name: 'affiliations',
        component: () => import( './views/club/ClubAffiliations.vue'),
        meta: {
          icon: 'verified_user',
        },
        children: [
          {
            path: ':seasonId',
            name: 'affiliation',
            component: () => import( './views/club/AffiliationVue.vue'),
            meta: {
              icon: 'verified_user',
            },
          },
        ],
      },
    ],
  },
];

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import( './views/Login.vue'),
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
];


export const createRouter = () => {
  return new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
  });
};

const router = createRouter();

export default router;

