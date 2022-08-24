import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { HOME_NAME, HOME_PATH } from './name';
import Home from '@pages/home/index.vue';

const routes: RouteRecordRaw[] = [{ path: HOME_PATH, component: Home, name: HOME_NAME }];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export * from './name';
