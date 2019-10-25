<template>
  <div id="app">
    <div id="backgroundImage1">
      <div id="backgroundImage2">
        <router-view></router-view>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script>
import register from "./components/register";
import login from "./components/login";
import content from "./components/content";
import Footer from "./components/footer";

export default {
  name: 'app',
  components: {
      register,
      content,
      login,
      Footer
  }
}
</script>

<style lang="css">
  html,body{
    height: 100%;
    text-align: center;
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
