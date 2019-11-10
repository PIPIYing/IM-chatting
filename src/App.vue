<template>
  <div id="app">
    <div id="backgroundImage1">
      <div id="backgroundImage2">
        <router-view v-if="isRouterAlive"></router-view>
        <footnote></footnote>
      </div>
    </div>
  </div>
</template>

<script>
import register from "./components/register";
import login from "./components/login";
import container from "./components/container";
import footnote from "./components/footnote";
import repair from "./components/repair";

export default {
  name: 'app',
  components: {
      register,
      container,
      login,
      footnote,
      repair
  },
    provide(){
      return {
          reload: this.reload
      }
    },
    data(){
      return {
          isRouterAlive: true
      }
    },
    methods: {
      reload(){
          this.isRouterAlive = false
          this.$nextTick(function(){
              this.isRouterAlive = true
          })
      }
    }
}
</script>

<style lang="css">
  html,body{
    height: 100%;
    text-align: center;
    overflow: hidden;
    /*    color: white;*/
  }
  #backgroundImage1{
    background: url("../static/images/background_picture.jpg") no-repeat;
    position: fixed;  /*相对浏览器实现固定定位*/
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;  /*自适应屏幕*/
    -moz-background-size: cover;
    -o-background-size: cover;
    -webkit-background-size: cover;
  }

  #backgroundImage2{
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.1);  /*透明框设计*/
  }

</style>
