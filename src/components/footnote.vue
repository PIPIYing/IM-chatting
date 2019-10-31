<template>
    <div id="footnote">
      <a href="#" target="_blank">联系邮箱 |</a>
      <a href="#" target="_blank">联系方式 |</a>
      <a href="#" target="_blank">给点反馈</a>
    </div>
</template>

<script>

    export default {
        name: "footnote"
    }
</script>

<style lang="css">
  #footnote{ /*页底*/
    /*    background-color: #E95659;*/
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 2px;
  }
   a{
    font-family: sans-serif;
    letter-spacing: 2px;
    text-decoration: none;
    font-size: 10px;
  }

  a:link,
  a:visited,
  a:hover,
  a:active {
    color: white;
  }

</style>
