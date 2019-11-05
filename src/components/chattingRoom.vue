<template>
  <div id="chattingRoom">
    <div id="nameBox" v-text="username"> </div>
    <div id="nameLine"></div>
    <div id="chattingBox">
      {{  username  }}
    </div>
    <div id="chattingLine"></div>

    <div id="inputBox">
      <label for="inputMsg"></label>
      <textarea id="inputMsg"></textarea>
      <el-button type="primary" plain id="btn">发送</el-button>
    </div>

  </div>
</template>

<script>

    export default {
        name: "chattingRoom",
        data() {
            return {
              username: localStorage.getItem("username")
            }
        },
        created() {

        },
        methods: {

        }
    }
</script>

<style scoped>
  /*高度470px*/
#chattingRoom{
  text-align: left;
}
#nameBox{
  height: 30px;
/*  background-color: #fdec84;*/
  font-size: 20px;
}
#nameLine,
#chattingLine{
  border-bottom: #111111 2px solid;
  width: 516px;
  opacity: 0.1;
  position: relative;
  left: -20px;
}
#chattingLine{
  position: relative;
  top: 270px;
}
#inputBox{
  height: 110px;
  width: 510px;
/*  background-color: #409EFF;*/
  position: relative;
  left: -17px;
  top: 275px;
}
#inputMsg{
  height: 100%;
  width: 99%;
/*  overflow: auto;*/
  border: none;
  background-color: #E9EEF3;
 /* position: relative;
  top: 23px;*/
}
#btn{
  position: relative;
  top: -40px;
  left: 450px;
}
</style>
