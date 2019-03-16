<template>
  <section class='editor_title'>
    <h1 class="title input" contenteditable="true" placeholder="제목을 입력하세요" @input="updateTitle"></h1>
    <br>
    <h3 class="tags input" contenteditable="true" placeholder="태그를 입력하세요" @input="updateSubtitle"></h3>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  mounted() {
    this.$el.firstElementChild.focus();
  },
  methods: {
    updateTitle (e) {
      console.log(e);
      this.$store.commit('editor/updateTitle', e.target.innerText)
    },
    updateSubtitle (e) {
      console.log(e);
      this.$store.commit('editor/updateSubtitle', e.target.innerText)
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script> 

<style lang="scss">
  @import '~assets/utils';
  .editor_title {
    width: 700px;
    left: calc(50% - 350px);
    bottom: 80px;
    position: absolute;
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
  }
</style>