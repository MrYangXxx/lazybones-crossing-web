<template>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto;height: 888px" infinite-scroll-distance="20">
    <li v-for="(record, index) in recordList" :key="record.id" class="infinite-list-item" style="list-style-type:none;padding-bottom: 20px">
      <el-card style="width: 80%;overflow:auto">
        <div class="user-activity">
          <div class="post">
            <div class="user-block">
              <img class="img-circle" :src="FileApi + record.userAvatar">
              <span class="username text-muted">{{ record.userName }}</span>
              <span class="description">发布于:{{ record.publishTime | parseDateTime }}</span>
              <div style="text-align: right">
                <span v-if="!record.complete" style="margin: 10px;font-size: 16px">未完成</span>
                <span v-else style="margin: 10px;font-size: 16px">已完成</span>
              </div>
            </div>
            <p style="padding-left: 4%;padding-right: 6%;word-wrap: break-word;word-break: break-all;">
              {{ record.content }}
            </p>
            <ul class="list-inline">
              <li style="text-align: left">
                <span class="link-black text-sm">
                  预计完成时间：{{ record.beginTime | parseTime }} 到 {{ record.endTime | parseTime }}
                </span>
              </li>
              <li>
                <span class="link-black text-sm">
                  <img style="width: 30px;height: 30px;display: inline" class="" src="@/assets/flower.jpg" alt="flower" @click="clickFlower(record,index)">:
                  <span style="margin-left: 10px">{{ record.flower }}</span>
                </span>
              </li>
              <li>
                <span class="link-black text-sm">
                  <img style="width: 30px;height: 30px;display: inline" class="" src="@/assets/egg.jpg" alt="egg" @click="clickEgg(record,index)">:
                  <span style="margin-left: 10px">{{ record.egg }}</span>
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
import { parseTime } from '@/utils'
import store from '@/store'

export default {
  name: 'Index',
  filters: {
    parseTime(time) {
      return parseTime(time, '{y}-{m}-{d}')
    },
    parseDateTime(time) {
      return parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
    }
  },
  data() {
    return {
      count: 10,
      recordList: [],
      FileApi: process.env.VUE_APP_FILE_API,
      pagination: { page: 1, pageSize: 10, count: 0 }
    }
  },
  created() {
    this.getRecords()
  },
  methods: {
    load() {
      if (this.pagination.count < this.pagination.page * this.pagination.pageSize) {
        return
      }
      this.pagination.page += 1
      this.getRecords(this.pagination)
    },
    async getRecords(filter = {}) {
      const res = await listRecords(filter)
      this.recordList = this.recordList.concat(res.data.records)
      this.pagination = res.data.pagination
    },
    async clickFlower(record, index) {
      const res = await sendFlower({ 'recordId': record.id, 'userId': record.userId, 'ownerId': store.getters.userId })
      if (res.message === 'success') {
        this.recordList[index].flower += 1
      }
    },
    async clickEgg(record, index) {
      const res = await sendEgg({ 'recordId': record.id, 'userId': record.userId, 'ownerId': store.getters.userId })
      if (res.message === 'success') {
        this.recordList[index].egg += 1
      }
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
