<template>
  <section class='editor_title'>
    <h1 class="title input" contenteditable="true" placeholder="제목을 입력하세요"></h1>
    <br>
    <h3 class="tags input" contenteditable="true" placeholder="태그를 입력하세요"></h3>
  </section>
</template>
  
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