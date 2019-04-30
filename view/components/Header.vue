<template>
  <div class="header">
    <div class="center" style="display:flex;">
      <Logo width="160" height="80" size="70"/>
      <div class="category center" v-on:click="$store.commit('editor/updateCategory', '');">{{ this.$store.state.editor.category }}</div>
      <div style="width:160px;">
      </div>
      <div class="wrapper">
        <div class="message">10분전에 마지막으로 저장됨</div>
        <div class="menu">
          <div class="gray button">저장</div>
          <div class="blue button">게시하기</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isVisible from '~/lib/isVisible.js'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
  },
  methods: {
    handleScroll (event) {
      if(this.$store.state.fixed.needSidebar !== !isVisible(this.$el)) this.$store.commit('fixed/updateNeedSidebar', !isVisible(this.$el));
    }
  },
  data() {
    return {
    }
  }
}
</script> 

<style lang="scss">
  @import '~assets/utils';
  @import '~assets/button';
  @font-face { font-family: 'GyeonggiBatang'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/GyeonggiBatang.woff') format('woff'); font-weight: normal; font-style: normal; }
  @import url('//cdn.jsdelivr.net/font-iropke-batang/1.2/font-iropke-batang.css');
  .header {
    position: relative;
    background: $oc-gray-1;
    height: 80px;
    transition: 0.1s ease;
    font-family: 'Iropke Batang';
    
    .menu {
      position: relative;
      display: flex;
      top: 20px;
      text-align: center;
    }
    .button {
      margin: 0px 10px 0px 10px;
      font-size: 15px;
      width: 100%;
    }
    .wrapper {
      position: absolute;
      width: 200px;
      margin: 0 auto;
      right: 0;
    }
    .message {
      position: relative;
      text-align: center;
      top: 10px;
    }
    .category {
      font-weight: 300;
      font-size: 40px;
      padding: 20px;
      font-family: 'GyeonggiBatang';
    }
  }
  .center {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }
</style>