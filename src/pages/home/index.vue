<script setup lang="ts">
import { reactive } from 'vue';
import _uniqueId from 'lodash/uniqueId';
import _cloneDeep from 'lodash/cloneDeep';

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
  link: string;
  description: string;
  memberList: Member[];
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
  previewImg: string;
  introduction: string;
}

const researchList: Research[] = reactive([
  { id: _uniqueId(), title: 'Industry Research Report', previewImg: caseImg1, link: '' },
  { id: _uniqueId(), title: 'UDID Governance Constitution Module', previewImg: caseImg2, link: '' },
  { id: _uniqueId(), title: 'UDID Technical White Paper', previewImg: caseImg3, link: '' },
]);

const memberList: Member[] = reactive([
  {
    id: _uniqueId(),
    title: 'Proposer',
    introduction: `This is a selected copywriting style，don't tangle with the con-tents of the copy，please？！？！？！`,
    previewImg: memberLogo1,
    userInfo: {
      id: _uniqueId(),
      name: 'Name',
      organize: 'UDID',
      role: 'FullStack',
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
    title: 'Partner',
    introduction: `This is a selected copywriting style，don't tangle with the con-tents of the copy，please？！？！？！`,
    previewImg: memberLogo3,
    userInfo: {
      id: _uniqueId(),
      name: 'Name',
      organize: 'UDID',
      role: 'FullStack',
      workYears: 10,
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
    introduction: `This is a selected copywriting style，don't tangle with the con-tents of the copy，please？！？！？！`,
    previewImg: memberLogo1,
    userInfo: {
      id: _uniqueId(),
      name: 'Name',
      organize: 'UDID',
      role: 'FullStack',
      workYears: 10,
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
]);

const newsList: News[] = reactive([
  {
    id: _uniqueId(),
    title: 'News',
    previewImg: newsImg1,
    introduction:
      'The most powerful tool is decentralized. Its success does not rely on any person. This is the ethos built into the DNA of #UDID Network.',
  },
  {
    id: _uniqueId(),
    title: 'News',
    previewImg: newsImg2,
    introduction:
      'The most powerful tool is decentralized. Its success does not rely on any person. This is the ethos built into the DNA of #UDID Network.',
  },
]);

const projectList: Project[] = reactive([
  {
    id: _uniqueId(),
    name: 'UDID',
    logo: udidLogo,
    link: '',
    description:
      'UDID is entirly decen-tralized and permiss-ionless.UDID is entirly decen-tralized and permiss-ionless.UDID is entirly decen-tralized and permiss-ionless.UDID is entirly decen-tralized and permiss-ionless.UDID is entirly decen-ionless.UDID is entirly decen-tralized and permiss-ionless.UDID is entirly decen-tralized and permiss-ionless.UDID is entirly decen-',
    memberList: _cloneDeep(memberList),
  },
  {
    id: _uniqueId(),
    name: 'Oth dApp 1',
    logo: udidLogo,
    link: '',
    description: 'Oth dApp 1',
    memberList: _cloneDeep(memberList),
  },
  {
    id: _uniqueId(),
    name: 'Oth dApp 2',
    logo: udidLogo,
    link: '',
    description: 'Oth dApp 2',
    memberList: _cloneDeep(memberList),
  },
]);

const selectedProject = reactive(projectList[0]);
</script>

<template>
  <main class="main-container">
    <header class="banner-container">
      <div class="banner-container-bg"></div>
      <div class="banner-nav-container">
        <div>
          <i class="banner-nav-logo"></i>
          <nav class="banner-nav-list">
            <a href="">Research</a>
            <a href="">Product</a>
            <a href="">Developers</a>
            <a href="">Vote</a>
            <a href="">News</a>
            <a href="">FAQ</a>
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
        <nav class="subtitle">Project</nav>
      </div>
      <div class="project-content-container">
        <div class="project-list-nav">
          <nav v-for="item in projectList" :key="item.id" class="project-list-nav-item">
            {{ item.name }}
          </nav>
        </div>
        <div class="project-description-container">
          <div class="project-description-info">
            <div class="project-description-logo-box">
              <img :src="selectedProject.logo" alt="" />
            </div>
            <div class="project-description-info-box">
              <p class="project-description-info-text">{{ selectedProject.description }}</p>
              <nav class="project-description-info-more-btn">More</nav>
            </div>
          </div>
          <div class="project-member-list-container">
            <div class="project-member-list-box">
              <nav
                v-for="member in selectedProject.memberList"
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
                  <p>{{ member.userInfo.workYears }} years</p>
                </div>
                <div class="project-member-list-item-contact-list">
                  <a
                    v-for="method in member.userInfo.contacts"
                    :key="method.type"
                    class="project-member-list-item-contact-item"
                  >
                    <i :class="'project-member-list-item-contact-item-icon ' + method.type"></i>
                  </a>
                </div>
              </nav>
            </div>
            <div class="project-member-list-more-btn"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="member-container">
      <div class="subtitle-container">
        <nav class="subtitle">Member</nav>
      </div>
      <div class="member-list-container">
        <div v-for="item in memberList" :key="item.id" class="member-list-item">
          <div class="member-list-item-img-box"><img :src="item.previewImg" alt="" /></div>
          <div class="member-list-item-desc-box">
            <p class="member-list-item-title">{{ item.title }}</p>
            <!-- <div class="member-list-item-info">
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
            </div> -->
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
          <!-- <div class="qfii-container-list-item-popup">
            <nav class="qfii-container-list-item-popup-icon"></nav>
          </div> -->
        </div>
      </div>
      <div class="qfii-container-more-btn-box">
        <nav class="qfii-container-more-btn">More</nav>
      </div>
    </section>
    <section class="about-container">
      <div class="about-content-container">
        <div class="about-content-container-box">
          <div class="about-content-container-title">About Vote</div>
          <div class="about-content-container-introduction">
            As a decentralized autonomous organization, Dao maintains its internal
          </div>
          <div>
            <div class="about-content-container-goto-vote-btn">
              <span>To Vote</span>
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
        <nav class="subtitle">Social</nav>
      </div>
      <div class="social-content-container">
        <div class="news-list">
          <nav v-for="item in newsList" :key="item.id" class="news-item">
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
          <span>Unified DID for Web 3.0</span>
        </div>
        <nav class="contact-details">
          <link class="contact-item icon-msg" href="" />
          <link class="contact-item icon-twitter" href="" />
          <link class="contact-item icon-facebook" href="" />
          <link class="contact-item icon-telegram" href="" />
          <link class="contact-item icon-github" href="" />
        </nav>
      </div>
      <div class="copyright">Copyright 2022 UDID.Network</div>
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
