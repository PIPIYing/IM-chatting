<template>
  <div id="listAgree">  <!--v-for指令实行好友列表的循环-->  <!--待同意好友列表-->
      <el-row  v-for="(item,index) in agreUserinfoList" :key="index">
        <div  class="listFriends">
          <div  class="listAvatar" @click="selectFriendInfo(index)">
            <el-avatar :size="30" :src="item.photo" fit="scale-down"></el-avatar>
         </div>

          <el-dialog
            title="个人资料"
            :visible.sync="dialogVisibleCheck"
            :modal-append-to-body='false'
            :lock-scroll="false"
            top="13vh">
            <div id="userBoxLeft">
              <div v-model="nickname" class="userBox">昵称：{{ nickname  }}</div>
              <div v-model="username" class="userBox">用户名：{{ username  }}</div>
              <div v-model="sex" class="userBox">性别：{{ sex  }}</div>
              <div v-model="phone" class="userBox">手机号码：{{  phone  }}</div>
              <div v-model="age" class="userBox">年龄：{{  age  }}</div>
              <div v-model="address" class="userBox">地区：{{ address  }}</div>
            </div>
            <div id="userBoxRight">
              <el-avatar :size="100" :src="photo" fit="scale-down"></el-avatar>
              <div v-model="email" class="userBox">邮箱：{{  email  }}</div>
              <div v-model="des" class="userBox">个性签名：{{  des  }}</div>
            </div>

            <div slot="footer" class="dialogCheck-footer">
             <el-button @click="dialogVisibleCheck = false">关 闭</el-button>
             <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
           </div>
          </el-dialog>

          <span class="listName">{{  item.username  }}</span>
        </div>
      </el-row>
<!--    {{ user }}-->
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import Cookie from 'js-cookie'

    export default {
        name: "listAgree",
        props: ['user'],
        data(){
            return {
                agreUserinfoList: [],
                dialogVisibleCheck: false,
                friendname: '',
                nickname: "",
                username: "",
                photo: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                sex: true,
                age: '',
                phone: "",
                email: "",
                des: "",
                status: "",
                address: ''
            }
        },
        created(){
            this.$emit('show')
            this.getFriendlistAgree()
        },
        methods: {
            getFriendlistAgree(){
                /*this.msg = this.agreUserinfoList*/
                var type = null
                var username = this.user
                    axios.post('/friend/getFrilist',
                        qs.stringify({
                            username,
                            type
                        })
                    ).then(response => {
                      /*  console.log(response)*/
                        this.agreUserinfoList = response.data.agreUserinfoList
                        console.log(this.agreUserinfoList)   /*定义一个变量或者对象数组把姓名和头像留下来*/
                    }).catch(error => {
                        console.log(error)
                    })
            }, //获取好友列表
            selectFriendInfo(index){
                this.dialogVisibleCheck = true
                var username = this.user
                /*console.log(index)*/
                var friendname = this.agreUserinfoList[index].username  //通过index找到每个人的username
               /* console.log(friendname)*/
                axios.get('/friend/selectFriendInfo',{
                    params: {
                    username,
                    friendname
                  }
                }).then(response =>{
                    console.log(response.data.userInfo)
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
                }).catch(error =>{
                    console.log(error)
                })

            }
        }
    }
</script>

<style scoped>
.listFriends {
  height: 42px;
  background: rgba(255,255,255,0.4);
  /*border-bottom: #8c939d 2px solid;*/
}
.listAvatar{
  float: left;
  padding: 5px 0 5px 15px;
  cursor: pointer;
}
.listName{
  float: left;
  padding: 12px 0 8px 15px;
  font-size: 12px;
}
#userBoxLeft{
  float: left;
  text-align: left;
}
#userBoxRight{
  float: right;
  padding-right: 120px;
  text-align: left;
}
#userBoxRight .el-avatar{
  position: relative;
  left: 100px;
  margin-bottom: 10px;
}
.dialogCheck-footer{
  margin-top: 250px;
  margin-right: 20px;
}
.userBox{
  height: 30px;
  width: 200px;
  margin: 10px;
  padding: 5px;
/*  background-color: #409EFF;*/
}
</style>
