<template>
  <el-card class="box-card" style="margin-top:40px;">
    <div slot="header" class="clearfix">
      <span style="margin-left:10px;">排行榜</span>
      <el-radio-group v-model="sortRadio" style="float: right" @change="radioChange">
        <el-radio label="flower">鲜花</el-radio>
        <el-radio label="egg">鸡蛋</el-radio>
      </el-radio-group>
    </div>
    <div>
      <div v-for="user in userList" class="user-activity">
        <div class="post">
          <div class="user-block">
            <img class="img-circle" :src="FileApi + user.avatar">
            <span class="username text-muted">
              <div style="display: inline-block;padding-top: 10px;">
                {{ user.userName }}
              </div>
              <div style="text-align: right">
                <img style="width: 30px;height: 30px;display: inline" class="" src="@/assets/flower.jpg" alt="flower">:
                <span style="margin-left: 10px">{{ user.flower }}</span>
                <img style="width: 30px;height: 30px;display: inline" class="" src="@/assets/egg.jpg" alt="egg">:
                <span style="margin-left: 10px">{{ user.egg }}</span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { leaderboard } from '@/api/user'

export default {
  name: 'Leaderboard',
  data() {
    return {
      sortRadio: 'flower',
      userList: [],
      FileApi: process.env.VUE_APP_FILE_API
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers(sort) {
      const res = await leaderboard({ sort })
      this.userList = res.data.users
    },
    radioChange(value) {
      this.getUsers(value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-card {
    width: 600px;
    max-width: 100%;
    margin: 20px auto;
  }
  .item-btn{
    margin-bottom: 15px;
    margin-left: 0px;
  }
  .block {
    padding: 25px;
  }
  .user-activity {
  .user-block {

  .username,
  .description {
    margin-left: 20px;
    padding: 2px 0;
  }

  .username{
    font-size: 16px;
    color: #000;
  }

  :after {
    clear: both;
  }

  .img-circle {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    float: left;
  }

  span {
    font-weight: 500;
    font-size: 12px;
  }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    color: #666;

  .image {
    width: 100%;
    height: 100%;

  }

  .user-images {
    padding-top: 20px;
  }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;
    text-align: right;

  li {
    display: inline-block;
    padding-right: 5px;
    padding-left: 5px;
    font-size: 13px;
  }

  .link-black {

  &:hover,
  &:focus {
     color: #999;
   }
  }
  }

  }

  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }

</style>
