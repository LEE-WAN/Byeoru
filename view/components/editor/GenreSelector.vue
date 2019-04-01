<template>
  <div class="genre-selector">
    <transition name="fade">
      <div class="modal" v-if="!hasGenre">
        <div class="content">
          <h1>이 글은 무슨글인가요?</h1>
          <hr>
          <div class='selection' v-on:click="updateGenre('소개글')">
            <div class='type'>소개글</div>
            <div class='discription'>새로운 무언가를 소개하는 글입니다.</div>
          </div>
          <br/>
        </div>
      </div>
    </transition>
    <div class="selected">
      <span v-on:click="updateGenre('')">== {{ this.$store.state.editor.genre }} ==</span>
    </div>
  </div>
</template>

<script>

export default {
  mounted() {    
  },
  computed: {
    hasGenre () { return this.$store.state.editor.genre!=='' }
  },
  methods: {
    updateGenre (Genre) {
      this.$store.commit('editor/updateGenre', Genre);
    }
  }
}
</script> 

<style lang="scss">
  @import '~assets/utils';
  .selected {
    font-size:32px;
    text-align: center;
    padding-top: 8rem;
    color: $oc-gray-7;
  }
  .genre-selector  {
    transition: all 0.1s linear;

    .modal  {
      //display: none;
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

        h1 {
          font-size: 52pt;
          padding: 1.7rem;
          font-weight: 100;
        }

        .selection {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 10px;
          .type  {
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
    .fade-enter-active, .fade-leave-active {
      transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>