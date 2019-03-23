<template>
  <h1 class="title input" contenteditable="true" placeholder="제목을 입력하세요" @input="updateTitle"></h1>  
</template>

<script>
import { mapMutations } from 'vuex'


export default {
  mounted() {
    this.$el.focus();
  },
  components: {    
  },
  methods: {
    updateTitle (e) {
      this.$store.commit('editor/updateTitle', e.target.innerText)
    },
    updateSubtitle (e) {
      this.$store.commit('editor/updateSubtitle', e.target.innerText)
    },
    updateTags (e) {
      this.$store.commit('editor/updateTags', e.target.innerText)
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script> 

<style lang="scss">
  @import '~assets/utils';
  .title {
    font-size: 34pt;
    font-weight: normal;
  }
  .tags {
    font-size: 15pt;
    font-weight: normal;
  }
  .input {
    cursor: text;
    outline: none;
  }
  *:empty:before{
    content: attr(placeholder);
    font-style: italic;
    color: $oc-gray-5;
    display: block;
  }
</style>