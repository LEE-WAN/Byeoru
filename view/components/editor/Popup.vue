<template>
  <div class="popup" v-bind:class="{ static: this.static, sticky: this.sticky }">
      <div class="dummy" v-bind:class="{hide: this.sticky}"></div>
      <div class="gray button">저장</div>
      <div class="blue button">공개하기</div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  computed: {
      static() { return !this.$store.state.fixed.needSidebar },
      sticky() { return this.$store.state.fixed.needSidebar }
  },
  methods: {
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
  .popup{
      position:sticky;
      display: flex;
      right: 0;
      padding-right: 10px;
  }
  .static {
    position: absolute;
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
  }
  .sticky {
      
      top: 10px;
      float:right;
  }
  .dummy {
      margin: 0 auto;
  }
</style>