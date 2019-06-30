import Vue from 'vue';
import Router, {Route, RouteConfig} from 'vue-router';
import SimpleView from '@/views/layout/SimpleView.vue';
import {Functionality} from '@/generated';
import store from '@/store/store';
import NProgress from 'nprogress';

Vue.use(Router);

export const ROUTE_CLUB = 'club';
export let requestCount = 0;

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

export const tasksRoutes = [
  {
    path: 'affiliations',
    name: 'affiliationsValidation',
    component: () => import( './views/tasks/AffiliationsToValidate.vue'),
    meta: {
      features: [Functionality.AFFILIATIONVALIDATE],
    },
    children: [{
      path: ':id',
      name: 'affiliationValidation',
      component: () => import( './views/club/AffiliationVue.vue'),
      meta: {
        features: [Functionality.AFFILIATIONVALIDATE],
      },
    }],
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
    path: '/tasks',
    name: 'tasks',
    component: SimpleView,
    children: tasksRoutes,
    meta: {
      icon: 'fa-tasks',
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


export const incrementCount = () => {
  if (requestCount === 0) {
    NProgress.start();
  }
  requestCount++;
};

export const decrementCount = () => {
  setTimeout(() => {
    requestCount--;
    if (requestCount === 0) {
      NProgress.done();
    }
  });
};

export const createRouter = () => {
  const r = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
  });

  r.beforeEach((to: Route, from: Route, next) => {
    incrementCount();
    // TODO check /club access
    if (to.meta
        && to.meta.features
        && to.meta.features.filter((f: string) => store.getters.features.indexOf(f) !== -1).length === 0) {
      next(false);
      decrementCount();
    } else {
      next();
    }
  });

  r.afterEach((to, from) => {
    decrementCount();
  });

  return r;
};

const router = createRouter();

export default router;

