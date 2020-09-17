<template>
  <el-card class="box-card" style="margin-top:40px;">
    <el-form ref="publishFormRef" style="margin-top: 20px;text-align: center" :model="publishForm">
      <el-form-item label="拖延内容:" prop="content">
        <el-input
          v-model="publishForm.content"
          :autosize="{ minRows: 4, maxRows: 8}"
          label="拖延内容:"
          type="textarea"
          placeholder="请输入内容"
          style="width: 50%;height: 100%"
        />
      </el-form-item>
      <el-form-item label="预计完成时间:" prop="dateRange">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-row>
        <el-col :span="24" style="text-align: center">
          <el-button type="primary" style="width: 30%" @click="confirmPublish">发布</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import { addRecord } from '@/api/record'
import store from '@/store'

export default {
  name: 'Publish',
  data() {
    return {
      publishForm: {
        content: '',
        beginTime: '',
        endTime: ''
      },
      dateRange: ''
    }
  },
  methods: {
    async confirmPublish() {
      if (this.dateRange === '' || this.publishForm.content === '') {
        this.$message.error('内容和时间必填!')
        return
      }

      const userId = store.getters.userId
      this.publishForm.beginTime = this.dateRange[0]
      this.publishForm.endTime = this.dateRange[1]
      const res = await addRecord({ userId, ...this.publishForm })
      if (res.message === 'success') {
        this.$notify({
          title: 'Success',
          message: '发布成功',
          type: 'success',
          duration: 2000
        })
        // 清空表单
        this.publishForm = {
          content: '',
          beginTime: '',
          endTime: ''
        }
        this.dateRange = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-card {
    width: 700px;
    max-width: 100%;
    margin: 20px auto;
  }
</style>
