<script setup lang="ts">
import { reactive, ref, onBeforeUnmount, onMounted } from 'vue';
import { Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperType from 'swiper/types'; //引入类型文件
import 'swiper/css';
import _uniqueId from 'lodash/uniqueId';
import _cloneDeep from 'lodash/cloneDeep';
import ColorThief from 'colorthief';

import newsImg1 from '@assets/images/home/news_preview1.jpg';
import newsImg2 from '@assets/images/home/news_preview2.jpg';
import voteBanner from '@assets/images/home/vote_banner.png';
import memberLogo1 from '@assets/images/home/case_logo_1.png';
import memberLogo2 from '@assets/images/home/case_logo_2.png';
import memberLogo3 from '@assets/images/home/case_logo_3.png';
import caseImg1 from '@assets/images/home/case_preview_1.png';
import caseImg2 from '@assets/images/home/case_preview_2.png';
import caseImg3 from '@assets/images/home/case_preview_3.png';
import udidLogo from '@assets/images/home/udid_logo.png';
import userIcon1 from '@assets/images/home/user_icon1.png';
import userIcon2 from '@assets/images/home/user_icon2.png';
import userIcon3 from '@assets/images/home/user_icon3.png';

enum CONTACT_METHODS {
  SMS = 'sms',
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  TELEGRAM = 'telegram',
  GITHUB = 'github',
  LINKEDIN = 'linkedin',
}

enum DIRECTION {
  LEFT,
  RIGHT,
}

interface Research {
  id: string;
  title: string;
  previewImg: string;
  link: string;
}

interface Project {
  id: string;
  name: string;
  logo: string;
  bgColor: string;
  link: string;
  description: string;
  memberList: Member[];
  activeIndex?: number;
}

interface User {
  id: string;
  name: string;
  workYears: number;
  icon: string;
  organize: string;
  role: string;
  contacts: { type: CONTACT_METHODS; link: string }[];
}

interface Member {
  id: string;
  title: string;
  userInfo: User;
  previewImg: string;
  introduction: string;
  contacts: { type: CONTACT_METHODS; link: string }[];
}

interface News {
  id: string;
  title: string;
  subTitle: string;
  previewImg: string;
  introduction: string;
}

const researchList: Research[] = reactive([
  { id: _uniqueId(), title: 'Web 3.0 DID Field Research Report', previewImg: caseImg1, link: '' },
  { id: _uniqueId(), title: 'UDID Network Inroduction Report', previewImg: caseImg2, link: '' },
  { id: _uniqueId(), title: 'Unified DID Technical\nWhite-Paper', previewImg: caseImg3, link: '' },
]);

const memberList: Member[] = reactive([
  {
    id: _uniqueId(),
    title: 'Proposer',
    introduction: `Member of dnsDAO
UDID Network Technical Architect
Worked for Fortune 500 Tech Giants
Open Source Communities Contributor`,
    previewImg: memberLogo1,
    userInfo: {
      id: _uniqueId(),
      name: 'Richey Liao',
      organize: 'dnsDAO',
      role: 'Technical Architect',
      workYears: 10,
      icon: userIcon1,
      contacts: [
        { type: CONTACT_METHODS.TWITTER, link: '' },
        { type: CONTACT_METHODS.LINKEDIN, link: '' },
      ],
    },
    userIcon: userIcon1,
    contacts: [
      { type: CONTACT_METHODS.TWITTER, link: '' },
      { type: CONTACT_METHODS.LINKEDIN, link: '' },
    ],
  },
  {
    id: _uniqueId(),
    title: 'Verifier',
    introduction: `dnsDAO Sponsor
UDID Network Early Contributor
Crypto Practitioner since 2013
Internet Domain & Crypto & Web3
Investor`,
    previewImg: memberLogo2,
    userInfo: {
      id: _uniqueId(),
      name: 'xy Chan',
      organize: 'dnsDAO',
      role: 'Early Contributor',
      workYears: 9,
      icon: userIcon2,
      contacts: [
        { type: CONTACT_METHODS.TWITTER, link: '' },
        { type: CONTACT_METHODS.LINKEDIN, link: '' },
      ],
    },
    contacts: [
      { type: CONTACT_METHODS.TWITTER, link: '' },
      { type: CONTACT_METHODS.LINKEDIN, link: '' },
    ],
  },
  {
    id: _uniqueId(),
    title: 'Partner',
    introduction: `Member of dnsDAO
UDID Community Leader
Ethereum Early proponent
Senior Web3 Domain Investor`,
    previewImg: memberLogo3,
    userInfo: {
      id: _uniqueId(),
      name: 'Lucas Nuzzi',
      organize: 'dnsDAO',
      role: 'UDID Leader',
      workYears: 8,
      icon: userIcon3,
      contacts: [
        { type: CONTACT_METHODS.TWITTER, link: '' },
        { type: CONTACT_METHODS.LINKEDIN, link: '' },
      ],
    },
    contacts: [
      { type: CONTACT_METHODS.TWITTER, link: '' },
      { type: CONTACT_METHODS.LINKEDIN, link: '' },
    ],
  },
  {
    id: _uniqueId(),
    title: 'Executor',
    introduction: `Member of dnsDAO
UDID Brand Manager
7 Years+ Marketing Experience
Crypto Practitioner since 2017`,
    previewImg: memberLogo1,
    userInfo: {
      id: _uniqueId(),
      name: 'Jolie Stekly',
      organize: 'dnsDAO',
      role: 'UDID Brand Manager',
      workYears: 7,
      icon: userIcon1,
      contacts: [
        { type: CONTACT_METHODS.TWITTER, link: '' },
        { type: CONTACT_METHODS.LINKEDIN, link: '' },
      ],
    },
    contacts: [
      { type: CONTACT_METHODS.TWITTER, link: '' },
      { type: CONTACT_METHODS.LINKEDIN, link: '' },
    ],
  },
  {
    id: _uniqueId(),
    title: 'Executor',
    introduction: `This is a selected copywriting style，don't tangle with the con-tents of the copy，please？！？！？！`,
    previewImg: memberLogo2,
    userInfo: {
      id: _uniqueId(),
      name: 'Name',
      organize: 'UDID',
      role: 'FullStack',
      workYears: 10,
      icon: userIcon2,
      contacts: [
        { type: CONTACT_METHODS.TWITTER, link: '' },
        { type: CONTACT_METHODS.LINKEDIN, link: '' },
      ],
    },
    contacts: [
      { type: CONTACT_METHODS.TWITTER, link: '' },
      { type: CONTACT_METHODS.LINKEDIN, link: '' },
    ],
  },
  {
    id: _uniqueId(),
    title: 'Executor',
    introduction: `This is a selected copywriting style，don't tangle with the con-tents of the copy，please？！？！？！`,
    previewImg: memberLogo2,
    userInfo: {
      id: _uniqueId(),
      name: 'Name',
      organize: 'UDID',
      role: 'FullStack',
      workYears: 10,
      icon: userIcon2,
      contacts: [
        { type: CONTACT_METHODS.TWITTER, link: '' },
        { type: CONTACT_METHODS.LINKEDIN, link: '' },
      ],
    },
    contacts: [
      { type: CONTACT_METHODS.TWITTER, link: '' },
      { type: CONTACT_METHODS.LINKEDIN, link: '' },
    ],
  },
]);

const newsList: News[] = reactive([
  {
    id: _uniqueId(),
    title: 'What is UDID Network？',
    subTitle: 'Introduction',
    previewImg: newsImg1,
    introduction:
      'Recently, a dnsDAO&UDID Network community member gave a speech at an NFT NYC Side Conference- NFT Global summit.',
  },
  {
    id: _uniqueId(),
    title: 'Web 3.0 DID Field Rearch',
    subTitle: 'Report',
    previewImg: newsImg2,
    introduction:
      'In Web3, we already have a decen-tralized wallet address, but it is just like a bank account, which can only meet the needs of finance.',
  },
]);

const projectList: Project[] = reactive([
  {
    id: _uniqueId(),
    name: 'UDID Network',
    logo: udidLogo,
    bgColor: '',
    link: '',
    activeIndex: 0,
    description:
      'UDID Network, also known as Unified Decentralized Identity Network, is the first product launched by dnsDAO. UDID Network is a cross-chain, lightweight, scalable and unified DID Network that can link various fields of Web3 and IoT. UDID Network commits to liberating domain name resources of humans, making DID to be used in the virtual and real-world without barriers.UDID Network, also known as Unified Decentralized Identity Network, is the first product launched by dnsDAO. UDID Network is a cross-chain, lightweight, scalable and unified DID Network that can link various fields of Web3 and IoT. UDID Network commits to liberating domain name resources of humans, making DID to be used in the virtual and real-world without barriers.',
    memberList: _cloneDeep(memberList),
  },
  {
    id: _uniqueId(),
    name: 'dMail',
    logo: udidLogo,
    bgColor: '',
    link: '',
    activeIndex: 0,
    description:
      'dMail is a decentralized email server, and it is built on UDID Network. Users can send and receive mails from anyone to anyone, from anywhere to anywhere. Only the user that has the unified DID can access the dMail account.',
    memberList: _cloneDeep(memberList),
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
    value: '',
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

const handleProcjectClick = (index: number) => {
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
    <section class="research-container">
      <div class="subtitle-container">
        <nav class="subtitle">Research</nav>
      </div>
      <div class="research-content-list">
        <div v-for="item in researchList" :key="item.id" class="research-content-item">
          <div class="research-content-item-img-box">
            <img :src="item.previewImg" alt="" />
          </div>
          <a class="research-content-item-link-box">
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
            @click="() => handleProcjectClick(index)"
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
                    <img
                      ref="seletedProjectImgRef"
                      :src="item.logo"
                      alt=""
                      class="project-description-logo-img"
                    />
                  </div>
                  <div class="project-description-info-box">
                    <p class="project-description-info-text">{{ item.description }}</p>
                    <nav class="project-description-info-more-btn">More</nav>
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
                        :key="member.userInfo.id"
                        class="project-member-list-item"
                      >
                        <img :src="member.userInfo.icon" alt="" />
                        <div class="project-member-list-item-name">
                          {{ member.userInfo.name }}
                        </div>
                        <div class="project-member-list-item-other-info">
                          <p>
                            {{ member.userInfo.organize }}
                          </p>
                          <p>
                            {{ member.userInfo.role }}
                          </p>
                          <p>{{ member.userInfo.workYears }} Years+</p>
                        </div>
                        <div class="project-member-list-item-contact-list">
                          <a
                            v-for="method in member.userInfo.contacts"
                            :key="method.type"
                            class="project-member-list-item-contact-item"
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
        <div
          v-for="item in memberList.filter((o, i) => i <= 3)"
          :key="item.id"
          class="member-list-item"
        >
          <div class="member-list-item-img-box"><img :src="item.previewImg" alt="" /></div>
          <div class="member-list-item-desc-box">
            <p class="member-list-item-title">{{ item.userInfo.name }}</p>
            <div class="member-list-item-info">
              <div class="member-list-item-desc">{{ item.introduction }}</div>
              <div class="member-list-item-contact-list">
                <a
                  v-for="method in item.contacts"
                  :key="method.type"
                  class="member-list-item-contact-item"
                >
                  <i :class="'member-list-item-contact-item-icon ' + method.type"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="qfii-container">
      <div class="subtitle-container">
        <nav class="subtitle">QFII</nav>
      </div>
      <div class="qfii-container-list">
        <div
          v-for="item in memberList.filter((o, i) => i <= 3)"
          :key="item.id"
          class="qfii-container-list-item"
        >
          <div class="qfii-container-list-item-img-box">
            <img :src="item.previewImg" alt="" />
          </div>
          <div class="qfii-container-list-item-popup">
            <nav class="qfii-container-list-item-popup-icon"></nav>
          </div>
        </div>
      </div>
      <div class="qfii-container-more-btn-box">
        <nav class="qfii-container-more-btn">More</nav>
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
          <div>
            <div class="about-content-container-goto-vote-btn">
              <span>Vote</span>
              <i></i>
            </div>
          </div>
        </div>
        <div class="about-container-preview-img">
          <img :src="voteBanner" alt="" />
        </div>
      </div>
    </section>
    <section class="social-container">
      <div class="subtitle-container">
        <nav class="subtitle">Media</nav>
      </div>
      <div class="social-content-container">
        <div class="news-list">
          <nav v-for="item in newsList" :key="item.id" class="news-item">
            <div class="news-sub-title">{{ item.subTitle }}</div>
            <div class="news-title">
              {{ item.title }}
            </div>
            <div class="news-preview-img">
              <img :src="item.previewImg" alt="" />
            </div>
            <div class="news-introduction">
              {{ item.introduction }}
            </div>
          </nav>
        </div>
      </div>
    </section>
    <footer class="footer-container">
      <div class="sub-info">
        <div class="dns-dao-banner">
          <i></i>
          <span>Gateway to Creation and Governance for Web 3.0 Product</span>
        </div>
        <nav class="contact-details">
          <link class="contact-item icon-msg" href="" />
          <link class="contact-item icon-twitter" href="" />
          <link class="contact-item icon-facebook" href="" />
          <link class="contact-item icon-telegram" href="" />
          <link class="contact-item icon-github" href="" />
        </nav>
      </div>
      <div class="copyright">Copyright 2022 dnsDAO</div>
    </footer>
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
