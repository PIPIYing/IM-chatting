<template>
  <div id="chattingRoom">
    <div id="nameBox" v-text="this.user"> </div>
    <div id="nameLine"></div>
    <div id="chattingBox">
      {{  this.user  }}
      这是聊天内容
    </div>
    <div id="chattingLine"></div>
    <div id="inputBox">
      <label for="inputMsg"></label>
      <textarea id="inputMsg" v-model="msg"></textarea>
      <el-button type="primary" plain id="btn" @click="sendMsg">发送</el-button>
    </div>

  </div>
</template>

<script>

    export default {
        name: "chattingRoom",
        props: ['user'],
        data() {
            return {
              username: '',
              msg: ''
            }
        },
        created() {
            this.WebSocket()
        },
        methods: {
            WebSocket(){

            //打开一个 WebSocket
            var ws = null;
            if ('WebSocket' in window) {
                ws = new WebSocket("ws://47.97.214.92:8080/CloudServer/websocket/socketServer");
                console.log("=============WebSocket");

            } else if ('MozWebSocket' in window) {
                ws = new MozWebSocket("ws://47.97.214.92:8080/CloudServer/websocket/socketServer");
                console.log("=============MozWebSocket");

            } else if('SockJS' in window){
                ws = new SockJS("http://47.97.214.92:8080/CloudServer/sockjs/socketServer");
                console.log("=============SockJS");
            }else {
                //浏览器不支持WebSocket
                alert("您的浏览器不支持WebSocket")
            }

            // 	连接成功触发onopen函数
            ws.onopen = function (event) {
                //websocket已连接上，使用send()方法发送数据
                //alert("连接成功！");
                console.log("连接成功");
               /* ws.send("发送数据")*/
               /* alert("数据发送中...")*/
            };

            // 	从服务端返回的消息
            ws.onmessage = function (event) { //evt根据请求不同返回不同消息
                var msg = event.data;
                console.log("WebSocket:收到一条消息：", data);
                alert("数据已接收...")

                //清空输入框
                /* $("#inputMsg").val("");
                if (data.toName != null) {
                    $("#singleMsg").append("\n").append(data); //单发窗口
                } else {
                    $("#groupMsg").append("\n").append(data); //2,群发时返回的消息
                }*/
            }

            // 	异常处理
            ws.onerror = function (event) {
                alert("连接异常，已断开！");
                console.log("连接异常，已断开");
                console.log("WebSocket:发生错误：", event);
                //document.getElementById("send").disabled = true; //断开连接禁用按钮
            };

            // 	关闭连接
            ws.onclose = function (event) {
                alert("连接已关闭");
                console.log("连接已关闭");
                console.log("WebSocket:已关闭：Client notified socket has closed：", event);
                //document.getElementById("send").disabled = true; //关闭连接禁用按钮
            };
           },
            sendMsg(){
                /*if (msg === "") {
                    return;
                } else {
                    var data = {};
                    data["fromName"] = this.username;
                    data["toName"] = friendname;    //单发时有值,群发为空
                    data["text"] = msg;
                    //发送消息
                    websocket.send(JSON.stringify(data));
                    //发送完消息，清空输入框
                    $("#inputMsg").val("");*/
            }
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
  height: 90px;
  width: 510px;
/*  background-color: #409EFF;*/
  position: relative;
  left: -17px;
  top: 275px;
}
#inputMsg{
  height: 125%;
  width: 99%;
/*  overflow: auto;*/
  border: none;
  background-color: #E9EEF3;
 /* position: relative;
  top: 23px;*/
}
#btn{
  position: absolute;
  right: 4px;
  top: 82px;
/*  position: relative;
  top: -40px;
  left: 450px;*/
}
</style>
