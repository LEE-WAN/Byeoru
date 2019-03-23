<template>
  <div class="tags">
      <span class='tag' v-for="tag in tags" :key='tag' v-on:click="removeTag(tag)">{{ tag }}</span>
      <div v-if='tags.length==0' class='input' contenteditable="true" placeholder="태그를 입력하세요"  @input="addTags"></div>
      <div v-else class='input' contenteditable="true" v-bind:placeholder="tags.length + '개의 태그가 입력되어 있습니다.'"  @input="addTags" v-on:keydown.delete="removeLastTag"></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  mounted() {
  },
  computed: {
    tags () { return this.$store.state.editor.tags }
  },
  methods: {
    addTags (e) {
      let text = e.target.innerText.toString();
      if(e.target.innerText.match( /[^ㄱ-ㅎㅏ-ㅣ가-힣A-Za-z\-\_]/g) !== null){
        this.$store.commit('editor/addTags', e.target.innerText)
        e.target.innerText = '';
      }
    },
    removeLastTag (e) {
      if(e.target.innerText === '') {
        // e.target.append(this.tags[this.tags.length - 1]);
        this.$store.commit('editor/removeLastTag');      
      }
    },
    removeTag(tag) {
      this.$store.commit('editor/removeTag', tag);
    }
  }
}
</script> 

<style lang="scss">
  @import '~assets/utils';
  .tags {
    .tag {
      float: left;
      background-color: $oc-blue-4;
      margin: 0.25em 0.1em;
      color: white;
      transition: all 0.1s linear;
      border-radius: 0.4rem;
      padding: 0.15rem;
      font-size: 1rem;
      cursor: pointer;
    }
    .tag:after {
      content: ' ×';
      color: white;
    }
    .input {
      float: left;
      margin: 0.25em 0.1em;
    }
  }
</style>