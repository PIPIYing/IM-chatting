<template>
  <div id="chattingRoom">
    <div id="nameBox" v-text="this.friendName"></div>
    <div id="nameLine"></div>
    <div id="chattingBox">
 <!--     这是聊天内容-->
<!--      {{  msg  }}-->
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
  import Bus from './bus.js'

    export default {
        name: "chattingRoom",
        props: ['user'],
        data() {
            return {
                username: '',
                msg: '',
                friendName: '',
                ws: null
            }
        },
        created() {
            this.initWebSocket()
        },
        beforeMount() {
            /*let self = this*/
            Bus.$on('friendName', res => {
                this.friendName = res
                console.log(this.friendName)
                /*console.log('data: ${res}')*/
            })

            Bus.$on('assistant', res => {
                this.assistant = res
                console.log(this.assistant)
            })
        },
        destroyed(){
            this.websocketclose()
        },
        methods: {
            initWebSocket() {
                //打开一个 WebSocket
                if ('WebSocket' in window) {
                    this.ws = new WebSocket("ws://47.97.214.92:8080/CloudServer/websocket/socketServer");
                    console.log("=============WebSocket");
                } else if ('MozWebSocket' in window) {
                    this.ws = new MozWebSocket("ws://47.97.214.92:8080/CloudServer/websocket/socketServer");
                    console.log("=============MozWebSocket");
                } else if ('SockJS' in window) {
                    this.ws = new SockJS("http://47.97.214.92:8080/CloudServer/sockjs/socketServer");
                    console.log("=============SockJS");
                } else {
                    //浏览器不支持WebSocket
                    alert("您的浏览器不支持WebSocket")
                }

                this.ws.onopen = this.websocketonopen
                this.ws.onmessage = this.websocketonmessage
                this.ws.onerror = this.websocketonerror
                this.ws.onclose = this.websocketclose

              /*  websocket.onopen = function(event) {
                    //alert("连接成功！");
                    console.log("连接成功");
                    //document.getElementById("send").disabled = false; //连接成功时启用群发按钮
                };*/
            },
            websocketonopen(){
                //alert("连接成功！");
                console.log("连接成功");
            },
            websocketonmessage(e){
                var data = JSON.parse(e.data);
                console.log("WebSocket:收到一条消息：", data);
            },
            websocketonerror(e){
                //alert("连接异常，已断开！");
                console.log("连接异常，已断开");
                console.log("WebSocket:发生错误：", e);
            },
            websocketclose(){
               // alert("连接已关闭");
                console.log("连接已关闭");
            },

               /* // 	连接成功触发onopen函数
                ws.onopen = function (event) {
                    //websocket已连接上，使用send()方法发送数据
                    alert("连接成功！");
                    console.log("连接成功");
                    ws.send(JSON.stringify(event.data));
                    /!* ws.send("发送数据")*!/
                     alert("数据发送中...")
                };

                // 	从服务端返回的消息
                ws.onmessage = function (event) { //evt根据请求不同返回不同消息
                    var data = event.data;
                    console.log("WebSocket:收到一条消息：", data);
                    alert("数据已接收...")
                };

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
                },*/

            sendMsg(){
               if (this.ws === undefined || this.ws === null) {
                    //alert('WebSocket connection not established, please connect.');
                   // alert('您的连接已经丢失，请退出聊天重新进入');
                   return ;
                 }

                if (this.msg === "") {
                    return ;
                } else {
                    var data = {};
                    data["fromName"] = this.user;
                    data["toName"] = this.friendName;    //单发时有值,群发为空
                    data["text"] = this.msg;

                    console.log(JSON.stringify(data))
                    //发送消息
                    this.ws.send(JSON.stringify(data));
                    //发送完消息，清空输入框
                    this.msg = ''
                }
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
  height: 20px;
/*  background-color: #fdec84;*/
  font-size: 16px;
  position: relative;
  top: -10px;
}
#nameLine,
#chattingLine{
  border-bottom: #111111 2px solid;
  width: 516px;
  opacity: 0.1;
  position: relative;
  left: -20px;
}
#chattingBox{
  height: 305px;
  width: 510px;
  position: relative;
  left: -17px;
/*  background-color: red;*/
}
#inputBox{
  height: 90px;
  width: 510px;
/*  background-color: #409EFF;*/
  position: relative;
  left: -17px;
}
#inputMsg{
  height: 122%;
  width: 99%;
/*  overflow: auto;*/
  border: none;
  background-color: #E9EEF3;
  position: relative;
  top: 3px;
}
#btn{
  position: absolute;
  right: 4px;
  top: 82px;
}
</style>
