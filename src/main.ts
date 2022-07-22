import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@routes';
import { VueQueryPlugin, QueryClient, VueQueryPluginOptions } from 'vue-query';
import { createPinia } from 'pinia';

import 'normalize.css';
import '@styles/global.scss';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
    },
  },
});

const app = createApp(App);

const vueQueryOptions: VueQueryPluginOptions = {
  queryClient: client,
};

app.use(router).use(createPinia()).use(VueQueryPlugin, vueQueryOptions);

app.mount('#app');
