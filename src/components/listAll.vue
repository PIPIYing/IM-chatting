<template>
  <div id="listAll">  <!--v-for指令实行好友列表的循环-->  <!--好友列表-->
      <el-row  v-for="item in agreUserinfoList" :key="agreUserinfoList.id">
        <div  class="listFriends">
          <div  class="listAvatar"  @click="dialogVisibleCheck = true">
            <el-avatar :size="30" :src="item.photo" fit="scale-down"></el-avatar>
         </div>

          <span class="listName">{{  item.username  }}</span>
        </div>
      </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import Cookie from 'js-cookie'

    export default {
        name: "listAll",
        props: ['username'],
        data(){
            return {
                photo:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                agreUserinfoList: [],
                dialogVisibleCheck: false
            }
        },
        created(){
            this.$emit('show')
            this.getFriendlistAll()
        },
        methods: {
            getFriendlistAll(){
                /*this.msg = this.agreUserinfoList*/
                var type = 'all'
                var username = this.username

                    axios.post('/friend/getFrilist',
                        qs.stringify({
                            username,
                            type
                        })
                    ).then(response => {
                  /*      console.log(response)*/
                        this.agreUserinfoList = response.data.agreUserinfoList
                       /* console.log(this.agreUserinfoList)/!*定义一个变量或者对象数组把姓名和头像留下来*!/*/
                    }).catch(error => {
                        console.log(error)
                    })

            },
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
}
.listName{
  float: left;
  padding: 12px 0 8px 15px;
  font-size: 12px;
}

</style>
