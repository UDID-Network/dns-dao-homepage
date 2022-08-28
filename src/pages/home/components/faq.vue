<script setup lang="ts">
import { reactive } from 'vue';
import { FAQ } from '../types';

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
</script>

<template>
  <section class="faq-container">
    <div class="home-page-subtitle-container">
      <div class="left-item"></div>
      <div class="center-item"></div>
      <div class="right-item"></div>
    </div>
    <div class="faq-content-container">
      <div class="faq-list-container">
        <div v-for="(faq, index) in faqList" :key="faq.id" class="faq-list-item">
          <div class="faq-list-item-question">
            <span class="faq-list-item-i">{{ index + 1 }}</span>
            <span class="faq-list-item-q">Q: </span>
            <span class="faq-list-item-q-content">{{ faq.question }}</span>
          </div>
          <div class="faq-list-item-answer">
            <span class="faq-list-item-a">A: </span
            ><span class="faq-list-item-a-content">{{ faq.answer }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'FaqComponent',
};
</script>

<style scoped lang="scss">
@import './faq.scss';
</style>
