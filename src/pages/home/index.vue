<script setup lang="ts">
import { reactive } from 'vue';
import _uniqueId from 'lodash/uniqueId';

import { Research, News } from './types';
import Header from './components/header.vue';
import ProjectList from './components/projectList.vue';
import MemberList from './components/memberList.vue';
import Faq from './components/faq.vue';
import Footer from './components/footer.vue';

import newsImg1 from '@assets/images/home/news_preview1.png';
import newsImg2 from '@assets/images/home/news_preview2.png';
import voteBanner from '@assets/images/home/vote_banner.png';
import caseImg1 from '@assets/images/home/case_preview_1.png';
import caseImg2 from '@assets/images/home/case_preview_2.png';
import caseImg3 from '@assets/images/home/case_preview_3.png';

import ResearchReport from '@assets/files/Web_3.0_DID_Field_Research_Report.pdf';
import WhitePaper from '@assets/files/Technical_White_Paper.pdf';

const researchList: Research[] = reactive([
  {
    id: _uniqueId(),
    title: 'Web 3.0 DID Field Research Report',
    previewImg: caseImg1,
    link: ResearchReport,
    clicked: false,
  },
  {
    id: _uniqueId(),
    title: 'UDID Network Introduction Report',
    previewImg: caseImg2,
    link: './pdf2',
    clicked: true,
  },
  {
    id: _uniqueId(),
    title: 'Unified DID Technical\nWhite-Paper',
    previewImg: caseImg3,
    link: WhitePaper,
    clicked: false,
  },
]);

const newsList: News[] = reactive([
  {
    id: _uniqueId(),
    title: 'What is UDID Network？',
    subTitle: 'Introduction',
    previewImg: newsImg1,
    introduction:
      'Recently, a dnsDAO & UDID Network community member gave a speech at an NFT NYC Side Conference-NFT Global summit.',
    link: 'https://medium.com/@dnsDAO/guide-series-episode-1-what-is-udid-network-7642e8cf5ee2',
  },
  {
    id: _uniqueId(),
    title: 'Web 3.0 DID Field Rearch',
    subTitle: 'Report',
    previewImg: newsImg2,
    introduction:
      'In Web3, we already have a decen-tralized wallet address, but it is just like a bank account, which can only meet the needs of finance.',
    link: ResearchReport,
  },
]);
</script>

<template>
  <main class="main-container">
    <Header />
    <section class="research-container">
      <div class="home-page-subtitle-container">
        <nav class="subtitle">Research</nav>
      </div>
      <div class="research-content-list">
        <div v-for="item in researchList" :key="item.id" class="research-content-item">
          <div class="research-content-item-img-box">
            <img :src="item.previewImg" alt="" />
          </div>
          <a class="research-content-item-link-box" :href="item.link" target="_blank">
            <span>{{ item.title }}</span>
            <i></i>
          </a>
        </div>
      </div>
    </section>
    <ProjectList />
    <MemberList />
    <section class="about-container">
      <div class="about-content-container">
        <div class="about-content-container-box">
          <div class="about-content-container-title">Governance</div>
          <div class="about-content-container-introduction">
            Anyone can submit proposals. And the proposals are debated by the community, then
            accepted or rejected.
          </div>
        </div>
        <div class="about-container-preview-img">
          <img :src="voteBanner" alt="" />
        </div>
      </div>
    </section>
    <section class="social-container">
      <div class="home-page-subtitle-container">
        <nav class="subtitle">Media</nav>
      </div>
      <div class="social-content-container">
        <div class="news-list">
          <nav v-for="item in newsList" :key="item.id" class="news-item">
            <div class="news-sub-title">{{ item.subTitle }}</div>
            <a :href="item.link" target="_blank">
              <div class="news-title">
                {{ item.title }}
              </div>
              <div class="news-preview-img">
                <img :src="item.previewImg" alt="" />
              </div>
              <div class="news-introduction">
                {{ item.introduction }}
              </div>
            </a>
          </nav>
        </div>
      </div>
    </section>
    <Faq />
    <Footer />
  </main>
</template>

<script lang="ts">
export default {
  name: 'HomeComponent',
};
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
