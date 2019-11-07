<template>
  <div id="chatting">  <!--v-for指令实行对话列表的循环-->
      <el-row  v-for="(item,index) in agreUserinfoList" :key="index">
        <div  class="chattingList" @click="selectFriendInfo(index)">
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
                friendname: ''
            }
        },
        created(){
           /* this.selectUserInfo()*/
            this.getFriendlistAll()
        },
        methods: {
            getFriendlistAll(){
                /*this.msg = this.agreUserinfoList*/
                var type = 'all'
                var username = this.user
                axios.post('/friend/getFrilist',
                    qs.stringify({
                        username,
                        type
                    })
                ).then(response => {
                    /*console.log(response)*/
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
                 console.log(friendname)
                axios.get('/friend/selectFriendInfo', {
                    params: {
                        username,
                        friendname
                    }
                }).then(response => {
                    console.log(response.data.userInfo)
                    this.friendname = response.data.userInfo.username
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
            }   //获取指定好友的信息
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
