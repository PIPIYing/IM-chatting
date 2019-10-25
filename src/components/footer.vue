<template>
    <div id="footer">
      <a href="#" target="_blank" class="footer">联系邮箱 |</a>
      <a href="#" target="_blank" class="footer">联系方式 |</a>
      <a href="#" target="_blank" class="footer">给点反馈</a>
    </div>
</template>

<script>

    export default {
        name: "footer"
    }
</script>

<style lang="css">
  #footer{ /*页底*/
    /*    background-color: #E95659;*/
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
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
