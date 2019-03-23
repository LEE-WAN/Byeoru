<template>
  <div class="genre-selector">
    <div v-if="this.$store.state.editor.genre===''" class="modal">
      <div class="content">
        <h1>이 글은 무슨글인가요?</h1>
        <hr>
        <div class='selection'>
          <div class='name'>소개글</div>
          <div class='discription'>새로운 무언가를 소개하는 글입니다.</div>
        </div>
        <div class='selection'>
          <div class='name'>설명글</div>
          <div class='discription'>새로운 무언가를 소개하는 글입니다.</div>
        </div>
      </div>
    </div>

    <div>
      <p class="selected">소개글</p>
    </div>
  </div>
</template>

<script>

export default {
  mounted() {
  },
  computed: {
  },
  methods: {
  }
}
</script> 

<style lang="scss">
  @import '~assets/utils';
  .genre-selector  {
    transition: all 0.1s linear;

    .modal  {
      position: fixed;
      z-index: 2;
      left: 0;
      top: 0;
      width:  100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.4);
      .content {
        background-color: white;
        width: 90%;
        max-width: 900px;
        border-radius: 0.5rem;
        margin: 10% auto;
        animation: animatetop 0.4s;

        h1 {
          font-size: 52pt;
          padding: 1.7rem;
          font-weight: 100;
        }

        .selection {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 10px;
          .name  {
            grid-column: 1 / 2;
            padding: 1rem;
            text-align: center;
            font-size: 32pt;   
            font-weight: 100;         
          }
          .discription {
            grid-column: 2 / 4;
            margin: .5rem;
          }
        }
        .selection:nth-child(odd) {
          background-color:$oc-gray-1;
        }
        .selection:nth-child(even) {
          background-color:white;
        }
      }
    }

    .selected  {
      font-size: 20pt;
    }
  }
</style>