<template>
  <div class="category-selector">
    <transition name="fade">
      <div class="modal" v-if="!hasCategory">
        <div class="content">
          <div class="title">
            <h1>이 글은 무슨글인가요?</h1>
          </div>
          <simplebar class="list">
            <div class='card' v-on:click="updateCategory(item.name)" v-for="item in items" :key="item.name">
              <div class='module'>
                <div class='thumbnail'>
                  <img v-bind:src="item.thumbnail"/>
                </div>
                <div class='description'>
                  <div class='name'>{{ item.name }}</div>
                  <div class='text'>{{ item.description }}</div>
                </div>
              </div>
            </div>
          </simplebar>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';

export default {
  mounted() {
  },
  components: {
    simplebar
  },
  computed: {
    hasCategory () {
      let status = this.$store.state.editor.category!=='';
      this.$store.commit('fixed/updateModalStatus', !status);
      return status;
    },
    items() { return this.$store.state.fixed.categoryList },
  },
  methods: {
    updateCategory (Category) {
      this.$store.commit('editor/updateCategory', Category);
    },
    refreshModal () {
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
  .category-selector  {
    transition: all 0.1s linear;

    .modal  {
      //display: none;
      position: fixed;
      z-index: 2;
      left: 0;
      top: 0;
      width:  100%;
      height: 100%;
      overflow: hidden;
      background-color: rgba(0,0,0,0.4);      
      .content {        
        background-color: white;
        width: 90%;
        max-width: 900px;
        border-radius: 0.5rem;
        margin: 8vh auto;
        overflow: hidden;       
        height: 84vh;
        h1 {
          font-size: 34pt;
          padding: 1.7rem;
          font-weight: 100;
          margin: 0;
        }
        .title {
          height: 15%;
          min-height: 100px;
        }

        .list {
          height: 85%;
          width: 100%;
          .card {
            width: calc(50% - 60px);
            min-width: 300px;
            height: 300px;
            float: left;
            padding: 30px;
            .module {
              height: 100%;
              .thumbnail {
                overflow: hidden;
                height: 40%;
                border: black;
              }
              .description {
                position: relative;
                height: 60%;
                .name {
                  padding: 10px 15px;
                  background-color: red;
                  color: white;
                  font-weight: 900;
                  font-size: 20px;
                  position: absolute;
                  top: -34px;
                  left: 0px;
                }
                .text {
                  padding: 40px 25px;
                  font-size: 15pt;
                  font-weight: 500;
                }
              }
              @include material-shadow();
              transition: 0.1s linear;
              &:hover{
                @include material-shadow(3);
              }
            }
          }
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