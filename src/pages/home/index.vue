<script setup lang="ts">
import { reactive, ref, onBeforeUnmount, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperType from 'swiper/types'; //引入类型文件
import 'swiper/css';
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
// import IntroductionReport from '@assets/files/UDID_Network_Introduction_Report.pdf';
import WhitePaper from '@assets/files/Technical_White_Paper.pdf';
import { Research, Member, News, Project, FAQ, DIRECTION } from './types';
import {
  mbRicheyLiao,
  mbWadeTsai,
  mbXYChan,
  mbLucas,
  mbBin,
  mbSion,
  mbWell,
  mbFang,
  mbLeo,
  mbLU,
  mbM,
  mbMaksim,
  mbMark,
  mbRefu,
  mbZachYang,
} from './members';

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

const projectList: Project[] = reactive([
  {
    id: _uniqueId(),
    name: 'UDID Network',
    logo: udidLogo,
    bgColor: '',
    link: 'https://udid.network/',
    activeIndex: 0,
    description:
      'UDID Network, also known as Unified Decentralized Identity Network, is the first product launched by dnsDAO. UDID Network is a cross-chain, lightweight, scalable and unified DID Network that can link various fields of Web3 and IoT. UDID Network commits to liberating domain name resources of humans, making DID to be used in the virtual and real-world without barriers.',
    memberList: [mbRicheyLiao, mbWadeTsai, mbXYChan, mbLucas],
  },
  {
    id: _uniqueId(),
    name: 'dMail',
    logo: udidLogo,
    bgColor: '',
    activeIndex: 0,
    description:
      'dMail is a decentralized email server, and it is built on UDID Network. Users can send and receive mails from anyone to anyone, from anywhere to anywhere. Only the user that has the unified DID can access the dMail account.',
    memberList: [mbRicheyLiao, mbSion, mbWell, mbBin],
  },
]);

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
    label: 'Developers',
    value: 'member-container',
  },
  {
    label: 'Vote',
    value: 'about-container',
  },
  {
    label: 'News',
    value: 'social-container',
  },
  {
    label: 'FAQ',
    value: 'faq-container',
  },
]);

const faqList: FAQ[] = reactive([
  {
    id: 'faq1',
    question: 'What is the relationship between dnsDAO and DNS(Internet Protocol)?',
    answer:
      'DNS, known as Domain Name System, was invented in 1983. Nowadays, it can no longer meet the complex and changing needs of global Internet users. dnsDAO is a decentralized autonomous organization. Veteran Domain Name players and technical experts are among the early members of dnsDAO. dnsDAO has nothing to do with DNS. dnsDAO’s ‘dns’ represents the founding culture of the organization.',
  },
  {
    id: 'faq2',
    question: 'Does dnsDAO offer Token?',
    answer: `As of now, dnsDAO has not offered Token. And dnsDAO is still in the early and experimental stage; In addition, dnsDAO's first product, UDID Network, has no plans to offer Token for now either.`,
  },
  {
    id: 'faq3',
    question: 'What’s the relationship between dnsDAO and UDID Network?',
    answer:
      'UDID Network is the first product devised and launched by the early members of dnsDAO. At present, some early members of the community propose that d nsDAO become the only governance organization of UDID Network. This proposal is still to be discussed and determined by the community.',
  },
  {
    id: 'faq4',
    question: 'How to participate in dnsDAO?',
    answer:
      'As mentioned above, any individual can freely join dnsDAO by contribution. This is an open global cooperation organization. You are welcome to contact us through official social media or community.',
  },
]);

const colorThiefRef = ref<ColorThief | null>(null);
const projectSwiper = ref<SwiperType.Swiper | null>(null);
const selectedProjectIndex = ref<number>(0);
const memberListRefs = ref<HTMLDivElement[]>([]);
const projectNavBgRef = ref<HTMLDivElement | null>(null);
const projectNavRefs = ref<HTMLElement[]>([]);

const scrollTo = (className: string) => {
  if (!className) return;

  document.querySelector('.' + className)?.scrollIntoView({ behavior: 'smooth' });
};

const handleProjectClick = (index: number) => {
  const pSwiper = projectSwiper.value;
  const currentNav = projectNavRefs.value[index];
  const navBg = projectNavBgRef.value;
  const prevSelectedProjectIndex = selectedProjectIndex.value;
  const prevMemberListContainer = memberListRefs.value[prevSelectedProjectIndex];

  if (!currentNav || !navBg || !pSwiper || !prevMemberListContainer) return;

  const { clientHeight, offsetTop } = currentNav;

  projectList[prevSelectedProjectIndex].activeIndex = 0;
  prevMemberListContainer.style.transform = 'translateX(0px)';

  setTimeout(() => {
    selectedProjectIndex.value = index;
    navBg.style.transform = `translateY(${offsetTop}px)`;
    navBg.style.height = `${clientHeight}px`;
    pSwiper.slideTo(index, 1000, true);
  }, 0);
};

const handleProjectImgLoaded = (event: Event) => {
  const img = event.currentTarget as HTMLImageElement;
  const container = img.closest<HTMLDivElement>('.project-description-info');
  const beginColor = colorThiefRef.value?.getColor(img);

  if (container && beginColor)
    container.style.background = `linear-gradient(92.94deg, rgba(${beginColor.join(
      ', ',
    )}, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)`;
};

const onProjectSwiperInit = (swiper: SwiperType.Swiper) => {
  projectSwiper.value = swiper;
  projectSwiper.value.$el.find('.project-description-logo-img').on('load', handleProjectImgLoaded);
};

const toggleMember = (direction: DIRECTION = DIRECTION.LEFT) => {
  const length = projectList[selectedProjectIndex.value].memberList.length;
  let activeIndex = projectList[selectedProjectIndex.value].activeIndex || 0;

  if (direction === DIRECTION.LEFT) {
    if (activeIndex >= length - 4) return;
    activeIndex++;
  } else {
    if (activeIndex <= 0) return;
    activeIndex--;
  }

  const currentMemberListContainer = memberListRefs.value[selectedProjectIndex.value];

  if (!currentMemberListContainer) return;

  projectList[selectedProjectIndex.value].activeIndex = activeIndex;
  currentMemberListContainer.style.transform = `translateX(${-208 * activeIndex}px)`;
};

const pdfClickHandle = (p: string) => {
  console.log('>>>>>>>>', p);
  router.push({ path: p });
};

onMounted(() => {
  colorThiefRef.value = new ColorThief();
});

onBeforeUnmount(() => {
  projectSwiper.value?.$el
    .find('.project-description-logo-img')
    .off('load', handleProjectImgLoaded);
});
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
    <section class="project-container">
      <div class="subtitle-container">
        <nav class="subtitle">Projects</nav>
      </div>
      <div class="project-content-container">
        <div class="project-list-nav">
          <div ref="projectNavBgRef" class="project-list-nav-item-bg"></div>
          <nav
            v-for="(item, index) in projectList"
            :key="item.id"
            ref="projectNavRefs"
            :class="{ 'project-list-nav-item': true, active: selectedProjectIndex === index }"
            @click="() => handleProjectClick(index)"
          >
            {{ item.name }}
          </nav>
        </div>
        <div class="project-description-container">
          <swiper
            :modules="[Controller]"
            :direction="'vertical'"
            :allow-touch-move="false"
            class="mySwiper"
            @init="onProjectSwiperInit"
          >
            <swiper-slide v-for="item in projectList" :key="item.id">
              <div class="project-description-container-wrapper">
                <div class="project-description-info">
                  <div class="project-description-logo-box">
                    <img :src="item.logo" alt="" class="project-description-logo-img" />
                  </div>
                  <div class="project-description-info-box">
                    <p class="project-description-info-text">{{ item.description }}</p>
                    <a
                      v-if="item.link"
                      class="project-description-info-more-btn"
                      :href="item.link"
                      target="_blank"
                      >More</a
                    >
                  </div>
                </div>
                <div class="project-member-list-container">
                  <div
                    :class="{
                      'project-member-list-prev-btn': true,
                      disabled: item.activeIndex === 0,
                    }"
                    @click="toggleMember(DIRECTION.RIGHT)"
                  ></div>
                  <div class="project-member-list-box">
                    <div ref="memberListRefs" class="project-member-list-box-wrapper">
                      <nav
                        v-for="member in item.memberList"
                        :key="member.id"
                        class="project-member-list-item"
                      >
                        <img :src="member.icon" alt="" />
                        <div class="project-member-list-item-name">
                          {{ member.name }}
                        </div>
                        <div class="project-member-list-item-other-info">
                          <p>
                            {{ member.role }}
                          </p>
                          <p>{{ member.workYears }} Years+</p>
                        </div>
                        <div class="project-member-list-item-contact-list">
                          <a
                            v-for="method in member.contacts"
                            :key="method.type"
                            class="project-member-list-item-contact-item"
                            :href="method.link"
                            target="_blank"
                          >
                            <i
                              :class="'project-member-list-item-contact-item-icon ' + method.type"
                            ></i>
                          </a>
                        </div>
                      </nav>
                    </div>
                  </div>
                  <div
                    :class="{
                      'project-member-list-next-btn': true,
                      disabled: item.activeIndex === item.memberList.length - 4,
                    }"
                    @click="toggleMember(DIRECTION.LEFT)"
                  ></div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </section>
    <section class="member-container">
      <div class="subtitle-container">
        <nav class="subtitle">Members</nav>
      </div>
      <div class="member-list-container">
        <div v-for="item in memberList" :key="item.id" class="member-list-item">
          <div class="member-list-item-img-box"><img :src="item.icon" alt="" /></div>
          <div class="member-list-item-desc-box">
            <p class="member-list-item-title">{{ item.name }}</p>
            <div class="member-list-item-info">
              <div class="member-list-item-desc">{{ item.introduction }}</div>
              <div class="member-list-item-contact-list">
                <a
                  v-for="method in item.contacts"
                  :key="method.type"
                  class="member-list-item-contact-item"
                  :href="method.link"
                  target="_blank"
                >
                  <i :class="'member-list-item-contact-item-icon ' + method.type"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="about-container">
      <div class="about-content-container">
        <div class="about-content-container-box">
          <div class="about-content-container-title">Governance</div>
          <div class="about-content-container-introduction">
            Anyone can submit Proposals. And the proposals are debated by the community, then
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
