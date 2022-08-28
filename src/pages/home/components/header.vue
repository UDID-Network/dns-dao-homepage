<script setup lang="ts">
import { reactive } from 'vue';

const navList = reactive([
  {
    label: 'Research',
    value: 'research-container',
  },
  {
    label: 'Product',
    value: 'project-container',
  },
  {
    label: 'Member',
    value: 'member-container',
  },
  {
    label: 'Governance',
    value: 'about-container',
  },
  {
    label: 'Media',
    value: 'social-container',
  },
  {
    label: 'FAQ',
    value: 'faq-container',
  },
]);

const scrollTo = (className: string) => {
  if (!className) return;

  document.querySelector('.' + className)?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
  <header class="banner-container">
    <div class="banner-container-bg"></div>
    <div class="banner-nav-container">
      <div>
        <i class="banner-nav-logo"></i>
        <nav class="banner-nav-list">
          <a v-for="nav in navList" :key="nav.label" @click="scrollTo(nav.value)">{{
            nav.label
          }}</a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: 'HomeHeaderComponent',
};
</script>

<style scoped lang="scss">
@import './header.scss';
</style>
