<template>
  <footer class="footer-container">
    <div class="sub-info">
      <div class="dns-dao-banner">
        <i></i>
        <span>Gateway to Creation and Governance for Web 3.0 Product</span>
      </div>
      <nav class="contact-details">
        <a
          class="contact-item icon-youtube"
          href="https://www.youtube.com/watch?v=49b1ZrBKDZo"
          target="_blank"
        />
        <a class="contact-item icon-twitter" href="https://twitter.com/dnsDAO" target="_blank" />
        <a class="contact-item icon-medium" href="https://medium.com/@dnsDAO" target="_blank" />
        <a
          class="contact-item icon-telegram"
          href="https://t.me/+fOvnclkFC8ViMTll"
          target="_blank"
        />
        <a class="contact-item icon-discord" href="https://discord.gg/3A4vg4T4yg" target="_blank" />
      </nav>
    </div>
    <div class="copyright">Copyright 2022 dnsDAO</div>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'FooterComponent',
};
</script>

<style scoped lang="scss">
@import './footer.scss';
</style>
