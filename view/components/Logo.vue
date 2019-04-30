<template>
  <div class="ByeoruLogo" v-bind:style="{height: `${this.height}px`, width: `${this.width}px` }" @mouseover="onHover" @mouseleave="onLeave">
      <div class="box" v-bind:class="{hide: hover}" v-bind:style="{width: `${this.size}px`, height: `${this.size}px`, borderRadius: `${this.size*0.2}px`}">
          <div class="word" v-bind:style="{fontSize: `${0.7*this.size}px`}">B</div>
      </div>
      <div class="box" v-bind:class="{hide: !hover}" v-bind:style="{width: `${this.size}px`, height: `${this.size}px`, borderRadius: `${this.size*0.2}px`}">
          <div class="word" v-bind:style="{fontSize: `${0.7*this.size}px`}">벼</div>
      </div>
      <div class="box" v-bind:class="{hide: !hover}" v-bind:style="{width: `${this.size}px`, height: `${this.size}px`, borderRadius: `${this.size*0.2}px`}">
          <div class="word" v-bind:style="{fontSize: `${0.7*this.size}px`}">루</div>
      </div>
  </div>
</template>

<script>
export default {
    props: [ 'width', 'height', 'size' ],
    data() {
        return {
            hover: false,
        }
    },
    mounted() {
    },
    methods:{
        onHover() {
            this.hover = true;
        },
        onLeave() {
            this.hover = false;
        }
    }
}
</script>

<style lang="scss">
@font-face { font-family: 'Binggrae-Bold'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Binggrae-Bold.woff') format('woff'); font-weight: normal; font-style: normal; }
// @font-face { font-family: 'SangSangFlowerRoad'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/SangSangFlowerRoad.woff') format('woff'); font-weight: normal; font-style: normal; }
.ByeoruLogo {
    cursor: pointer;
}
.box {
    position: relative;
    border-radius: 5px;
    background-color: RGBA(50, 50, 50, 0.2);
    float: left;
    margin: 5px;
    transition: 0.2s ease;
    overflow: hidden;

    .word {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        top: 0;
        font-weight: 100;
        font-family: 'Binggrae-Bold'
    }
}
.hide {
    position: absolute;
    width: 1px !important;
    height: 1px !important;
}
</style>

