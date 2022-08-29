<script setup lang="ts">
import { reactive, ref } from 'vue';

import { Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperType from 'swiper/types'; //引入类型文件
import 'swiper/css';

import { DIRECTION } from '../types';
import {
  mbRicheyLiao,
  mbXYChan,
  mbWadeTsai,
  mbLucas,
  mbSion,
  mbWell,
  mbBin,
  mbMaksim,
  mbFang,
  mbRefu,
  mbMark,
  mbM,
  mbLU,
  mbZachYang,
  mbLeo,
} from '../members';

const memberGroup = reactive([
  { list: [mbRicheyLiao, mbXYChan, mbWadeTsai, mbLucas, mbSion, mbWell, mbBin, mbMaksim] },
  { list: [mbFang, mbRefu, mbMark, mbM, mbLU, mbZachYang, mbLeo] },
]);

const memberGroupIndex = ref<number>(0);
const memberGroupSwiper = ref<SwiperType.Swiper | null>(null);

const changeMemberList = (direction: DIRECTION = DIRECTION.LEFT) => {
  const pSwiper = memberGroupSwiper.value;

  if (!pSwiper) return;

  const length = memberGroup.length;
  let activeIndex = memberGroupIndex.value;

  if (direction === DIRECTION.LEFT) {
    if (activeIndex >= length - 1) return;
    activeIndex++;
  } else {
    if (activeIndex <= 0) return;
    activeIndex--;
  }

  memberGroupIndex.value = activeIndex;
  pSwiper.slideTo(activeIndex, 1000, true);
};

const onMemberGroupSwiperInit = (swiper: SwiperType.Swiper) => {
  memberGroupSwiper.value = swiper;
};
</script>

<template>
  <section class="member-container">
    <div class="home-page-subtitle-container">
      <nav class="subtitle">Member</nav>
    </div>
    <div class="member-list-container">
      <div
        :class="{
          'member-list-prev-btn': true,
          disabled: memberGroupIndex === 0,
        }"
        @click="changeMemberList(DIRECTION.RIGHT)"
      ></div>
      <swiper
        :modules="[Controller]"
        :allow-touch-move="false"
        class="mySwiper"
        @init="onMemberGroupSwiperInit"
      >
        <swiper-slide v-for="(item, index) in memberGroup" :key="index">
          <div class="member-list-container-wrapper">
            <div v-for="member in item.list" :key="member.id" class="member-list-item">
              <div class="member-list-item-img-box"><img :src="member.icon" alt="" /></div>
              <div class="member-list-item-desc-box">
                <p class="member-list-item-title">{{ member.name }}</p>
                <div class="member-list-item-info">
                  <div class="member-list-item-desc">
                    <p>
                      {{ member.role }}
                    </p>
                    <p>
                      {{ member.workYears + ' Years+' }}
                    </p>
                  </div>
                  <div class="member-list-item-contact-list">
                    <a
                      v-for="method in member.contacts"
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
        </swiper-slide>
      </swiper>
      <div
        :class="{
          'member-list-next-btn': true,
          disabled: memberGroupIndex === memberGroup.length - 1,
        }"
        @click="changeMemberList(DIRECTION.LEFT)"
      ></div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'HomeMemberListComponent',
};
</script>

<style scoped lang="scss">
@import './memberList.scss';
</style>
