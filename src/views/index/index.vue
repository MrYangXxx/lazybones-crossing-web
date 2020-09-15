<template>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto;" infinite-scroll-distance="0">
    <li v-for="record in recordList" class="infinite-list-item" style="list-style-type:none;padding-bottom: 20px">
      <el-card style="height: 150px;width: 80%">
        <div class="user-activity">
          <div class="post">
            <div class="user-block">
              <img class="img-circle" :src="FileApi + record.userAvatar">
              <span class="username text-muted">{{record.userName}}</span>
              <span class="description">发布于:{{record.publishTime}}</span>
            </div>
            <p>
              {{record.content}}
            </p>
            <ul class="list-inline">
              <li>
                <span class="link-black text-sm">
                  <img style="width: 30px;height: 30px;display: inline" class="" src="@/assets/flower.jpg" alt="flower" @click="clickFlower(record.id,record.userId)">:
                  <span style="margin-left: 10px">{{record.flower}}</span>
                </span>
              </li>
              <li>
                <span class="link-black text-sm">
                  <img style="width: 30px;height: 30px;display: inline" class="" src="@/assets/egg.jpg" alt="egg" @click="clickEgg(record.id,record.userId)">:
                  <span style="margin-left: 10px">{{record.egg}}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </el-card>
    </li>
  </ul>
</template>

<script>
  import { listRecords, sendEgg, sendFlower } from '@/api/record'

export default {
  name: 'Index',
  data() {
    return {
      count: 10,
      recordList: [],
      FileApi: process.env.VUE_APP_FILE_API
    }
  },
  created() {
    this.getRecords()
  },
  methods: {
    load() {
      if (this.count < 30) {
        this.count += 2
      }
    },
    async getRecords() {
      const res = await listRecords({})
      this.recordList = res.data.records
    },
    async clickFlower(id,userId){
      const res = await sendFlower({id,userId})
      console.log(res)
    },
    async clickEgg(id,userId){
      const res = await sendEgg({id,userId})
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
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
