<script setup lang="ts">
import { DocPage } from '@pages/home/types';
import { reactive } from 'vue-demi';
import _uniqueId from 'lodash/uniqueId';

import page1 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_00.jpg';
import page2 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_01.jpg';
import page3 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_02.jpg';
import page4 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_03.jpg';
import page5 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_04.jpg';
import page6 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_05.jpg';
import page7 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_06.jpg';
import page8 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_07.jpg';
import page9 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_08.jpg';
import page10 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_09.jpg';
import page11 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_10.jpg';
import page12 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_11.jpg';
import page13 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_12.jpg';
import page14 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_13.jpg';
import page15 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_14.jpg';
import page16 from '@assets/pdf/UDID_Network_English_Introduction_1.0.1_15.jpg';

const items: DocPage[] = reactive([
  {
    id: _uniqueId(),
    url: page1,
  },
  {
    id: _uniqueId(),
    url: page2,
  },
  {
    id: _uniqueId(),
    url: page3,
  },
  {
    id: _uniqueId(),
    url: page4,
  },
  {
    id: _uniqueId(),
    url: page5,
  },
  {
    id: _uniqueId(),
    url: page6,
  },
  {
    id: _uniqueId(),
    url: page7,
  },
  {
    id: _uniqueId(),
    url: page8,
  },
  {
    id: _uniqueId(),
    url: page9,
  },
  {
    id: _uniqueId(),
    url: page10,
  },
  {
    id: _uniqueId(),
    url: page11,
  },
  {
    id: _uniqueId(),
    url: page12,
  },
  {
    id: _uniqueId(),
    url: page13,
  },
  {
    id: _uniqueId(),
    url: page14,
  },
  {
    id: _uniqueId(),
    url: page15,
  },
  {
    id: _uniqueId(),
    url: page16,
  },
]);
</script>
<template>
  <div class="pdf-wrapper">
    <template v-for="sec in items" :key="sec.id">
      <div style="width: 100%; height: 100vh">
        <img :src="sec.url" :alt="sec.id" style="width: 100%; height: 100%" />
      </div>
    </template>
  </div>
</template>
