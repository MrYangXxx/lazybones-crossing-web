<template>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto;" infinite-scroll-distance="0">
    <li v-for="record in recordList" class="infinite-list-item" style="list-style-type:none;padding-bottom: 20px">
      <el-card style="height: 150px;width: 80%">
        <div>
          {{ record.content }}
        </div>
      </el-card>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import { listRecords } from '@/api/record'

export default {
  name: 'Index',
  data() {
    return {
      count: 10,
      recordList: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
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
</style>
