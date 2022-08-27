import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { HOME_NAME, HOME_PATH } from './name';
import Home from '@pages/home/index.vue';
import UDIDNetworkPdf from '@pages/pdf/udid-network.vue';

const routes: RouteRecordRaw[] = [
  { path: HOME_PATH, component: Home, name: HOME_NAME },
  { path: '/pdf2', component: UDIDNetworkPdf, name: 'UDidNetwork' },
];

export const router = createRouter({
  history: import.meta.env.MODE === 'staging' ? createWebHashHistory() : createWebHistory(),
  routes,
});

export * from './name';
