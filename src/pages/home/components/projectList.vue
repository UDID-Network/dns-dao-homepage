<script setup lang="ts">
import { reactive, ref, onBeforeUnmount, onMounted } from 'vue';
import ColorThief from 'colorthief';
import _uniqueId from 'lodash/uniqueId';

import { Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperType from 'swiper/types'; //引入类型文件
import 'swiper/css';

import { Project, DIRECTION } from '../types';
import { mbRicheyLiao, mbWadeTsai, mbXYChan, mbLucas, mbSion, mbWell, mbBin } from '../members';
import udidLogo from '@assets/images/home/udid_logo.png';

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

const colorThiefRef = ref<ColorThief | null>(null);
const projectSwiper = ref<SwiperType.Swiper | null>(null);
const selectedProjectIndex = ref<number>(0);
const memberListRefs = ref<HTMLDivElement[]>([]);
const projectNavBgRef = ref<HTMLDivElement | null>(null);
const projectNavRefs = ref<HTMLElement[]>([]);

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
  <section class="project-container">
    <div class="home-page-subtitle-container">
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
                        <p>{{ member.workYears + ' Years+' }}</p>
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
</template>

<script lang="ts">
export default {
  name: 'HomeProjectListComponent',
};
</script>

<style scoped lang="scss">
@import './projectList.scss';
</style>
