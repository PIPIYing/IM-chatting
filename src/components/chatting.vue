<template>
  <div id="chatting">  <!--v-for指令实行对话列表的循环-->
      <el-row  v-for="item in list" :key="list.id">
        <div  class="chattingList">
          <div  class="chatListAvatar">
            <el-avatar :size="30" :src="photo" fit="scale-down"></el-avatar>
         </div>
          <span class="chatListName">{{  item.name  }} --- {{ item.id }}</span>
        </div>
      </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

    export default {
        name: "chatting",
        data(){
            return {
                photo:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                username: '',
                list: [
                    {id: 1, name: 'A'},
                    {id: 2, name: 'B'},
                    {id: 3, name: 'C'}
                ]
            }
        },
        created(){
           /* this.selectUserInfo()*/
        },
        methods: {
        /*    selectUserInfo(){
                /!*var user = JSON.parse(localStorage.getItem("users"))  //读取保存在localStorage里的users对象
                var username = user.username  //取出username的值*!/
                var username = localStorage.getItem("username")  //取出username的值
                axios.get('/user/selectUserInfo', {
                    params:{
                        username
                    }
                })
                    .then(response => {
                        console.log(response)
                        this.username = response.data.userInfo.username
                        this.nickname = response.data.userInfo.nickname
                        this.photo = response.data.userInfo.photo
                        this.sex = response.data.userInfo.sex
                        this.age = response.data.userInfo.age
                        this.phone = response.data.userInfo.phone
                        this.email = response.data.userInfo.email
                        this.des = response.data.userInfo.des
                        this.status = response.data.userInfo.status
                        this.logintime = response.data.userInfo.logintime

                    })
                    .catch( error=> {
                        console.log(error)
                    })
            },*/

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
  padding: 5px 0 5px 15px;
}
.chatListName{
  float: left;
  padding: 8px 0 8px 15px;
}

</style>
