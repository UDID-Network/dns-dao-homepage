<script setup lang="ts">
import { ref } from 'vue';
import { Member, DIRECTION } from '../types';
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

const memberGroup = [
  [mbRicheyLiao, mbXYChan, mbWadeTsai, mbLucas, mbSion, mbWell, mbBin, mbMaksim],
  [mbFang, mbRefu, mbMark, mbM, mbLU, mbZachYang, mbLeo],
];

const memberGroupIndex = ref<number>(0);
const memberList = ref<Member[]>(memberGroup[memberGroupIndex.value]);

const changeMemberList = (direction: DIRECTION = DIRECTION.LEFT) => {
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
  memberList.value = memberGroup[activeIndex];
};
</script>

<template>
  <section class="member-container">
    <div class="home-page-subtitle-container">
      <nav class="subtitle">Members</nav>
    </div>
    <div class="member-list-container">
      <div
        :class="{
          'member-list-prev-btn': true,
          disabled: memberGroupIndex === 0,
        }"
        @click="changeMemberList(DIRECTION.RIGHT)"
      ></div>
      <div class="member-list-container-wrapper">
        <div v-for="item in memberList" :key="item.id" class="member-list-item">
          <div class="member-list-item-img-box"><img :src="item.icon" alt="" /></div>
          <div class="member-list-item-desc-box">
            <p class="member-list-item-title">{{ item.name }}</p>
            <div class="member-list-item-info">
              <div class="member-list-item-desc">
                <p>
                  {{ item.role }}
                </p>
                <p>
                  {{ item.workYears + ' Years+' }}
                </p>
              </div>
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
