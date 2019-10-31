<template>
  <div id="listAll">  <!--v-for指令实行好友列表的循环-->
      <el-row  v-for="item in list" :key="list.id">
        <div  class="listFriends">
          <div  class="listAvatar">
            <el-avatar :size="30" :src="photo" fit="scale-down"></el-avatar>
         </div>
          <span class="listName">{{  item.name  }} --- {{ item.id }}</span>
        </div>
      </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

    export default {
        name: "listAll",
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
            this.getFriendlistAll()
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
            getFriendlistAll(){
                var username = localStorage.getItem("username")
                this.username = username
               /* var type = 'all'
                /!*var username = this.username*!/
                var username = localStorage.getItem("username")
                axios.post('/getFriendlist',
                qs.stringify({
                    username,
                    type
                })
                ).then(response =>{
                    console.log(response)
                    /!*定义一个变量或者对象数组把姓名和头像留下来*!/
                }).catch(error =>{
                    console.log(error)
                })*/
            }  //根据username和type获取未加入分组的好友列表
        }
    }
</script>

<style scoped>
.listFriends {
  height: 40px;
  background: rgba(255,255,255,0.4);
  border-bottom: #8c939d 2px solid;
}
.listAvatar{
  float: left;
  padding: 5px 0 5px 15px;
}
.listName{
  float: left;
  padding: 8px 0 8px 15px;
}

</style>
