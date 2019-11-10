<template>
  <div id="chatting">  <!--v-for指令实行对话列表的循环-->
      <!--<el-row v-for="(item,index) in list" :key="index">
        <div  class="chattingList">
          <div  class="chatListAvatar">
            <el-avatar :size="30" :src="photo" fit="scale-down"></el-avatar>
          </div>
          <span class="chatListName">{{  item.name  }}</span>
        </div>
      </el-row>-->
      <el-row  v-for="(item,index) in agreUserinfoList" :key="index">
        <div  class="chattingList" @click="enterChat(index)">
          <div  class="chatListAvatar">
            <el-avatar :size="30" :src="item.photo" fit="scale-down"></el-avatar>
         </div>
          <span class="chatListName">{{  item.username  }}</span>
        </div>
      </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import Bus from './bus.js'

    export default {
        name: "chatting",
        props: ["user"],
        data(){
            return {
                photo:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                username: this.user,
               /* list: [
                    {name: 'IM Chatting小助手'}
                ],*/
                agreUserinfoList:[],
                friendName: ''
            }
        },
        created(){
           /* this.selectUserInfo()*/
            this.getFriendlistAll()
            /*this.initWebSocket()*/
        },
        methods: {
            getFriendlistAll(){
                /*this.msg = this.agreUserinfoList*/
                var type = '1'
                var username = this.user
                axios.post('/friend/getFrilist',
                    qs.stringify({
                        username,
                        type
                    })
                ).then(response => {
                    console.log(response)
                    this.agreUserinfoList = response.data.agreUserinfoList
                    /*console.log(this.agreUserinfoList)   /!*定义一个变量或者对象数组把姓名和头像留下来*!/*/
                }).catch(error => {
                    console.log(error)
                })
            }, //获取好友列表作为会话好友列表
            selectFriendInfo(index) {
                var username = this.user
                /*console.log(index)*/
                var friendname = this.agreUserinfoList[index].username  //通过index找到每个人的username
               /*  console.log(friendname)*/
                axios.get('/friend/selectFriendInfo', {
                    params: {
                        username,
                        friendname
                    }
                }).then(response => {
                    console.log(response.data.userInfo)
                    this.friendname = response.data.userInfo.username
                    Bus.$emit('friendName',this.friendname)  //friendName是兄弟组件之间的传值
/*                    this.nickname = response.data.userInfo.nickname
                    this.photo = response.data.userInfo.photo
                    this.sex = response.data.userInfo.sex
                    this.age = response.data.userInfo.age
                    this.phone = response.data.userInfo.phone
                    this.email = response.data.userInfo.email
                    this.des = response.data.userInfo.des
                    this.status = response.data.userInfo.status
                    this.logintime = response.data.userInfo.logintime*/
                }).catch(error => {
                    console.log(error)
                })
            },   //获取指定好友的信息

            enterChat(index){
                this.selectFriendInfo(index)
                var username = this.user
                axios.get('/chat/enterChat', {
                    params: {
                        username  //token 传过去之后 username就不用再传了
                    }
                }).then(response => {
                  console.log(response)
                 }).catch(error => {
                  console.log(error)
                 })
            }
           /* initWebSocket() {
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

                /!*  websocket.onopen = function(event) {
                      //alert("连接成功！");
                      console.log("连接成功");
                      //document.getElementById("send").disabled = false; //连接成功时启用群发按钮
                  };*!/
            },
            websocketonopen(){
                alert("连接成功！");
                console.log("连接成功");
            },
            websocketonmessage(e){
                var data = JSON.parse(e.data);
                console.log("WebSocket:收到一条消息：", data);
            },
            websocketonerror(e){
                alert("连接异常，已断开！");
                console.log("连接异常，已断开");
                console.log("WebSocket:发生错误：", e);
            },
            websocketclose(){
                alert("连接已关闭");
                console.log("连接已关闭");
            }*/
        }
    }
</script>

<style scoped>
.chattingList {
  height: 60px;
  background: rgba(255,255,255,0.4);
  border-bottom: #8c939d 2px solid;
}
.chatListAvatar{
  float: left;
  padding: 15px 0 5px 15px;
/*  margin-top: 10px;*/
}
.chatListName{
  float: left;
  padding: 20px 0 8px 15px;
/*  margin-top: 10px;*/
}

</style>
