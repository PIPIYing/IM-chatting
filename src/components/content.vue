<template>
  <div id="content">
  <div id="quote">
    Chatting with friends
  </div>
  <div id="container">
    <nav>
      <ul>
        <li><a href="#" target="">
          <div  id="self">
            <!--查询用户个人资料-->
          </div>
        </a></li>
        <li><a href="#" target=""><img src="../../static/images/chatting.png" alt="会话" class="icon"></a></li>
        <li><a href="#" target=""><img src="../../static/images/friends.png" alt="好友" class="icon"></a></li>
        <li><a href="#" target=""><img src="../../static/images/groupfriends.png" alt="群组" class="icon"></a></li>
        <li><a href="#" target=""><img src="../../static/images/setting.png" alt="设置" class="icon"></a></li>
      </ul>
    </nav>

    <div id="sidebar">

    </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: "content"
    }
</script>

<style scoped>
  @import "../style/content.css";
</style>
