<template>
  <el-form ref="form" style="margin-top: 20px;" :model="publishForm" :rules="rules">
    <el-form-item prop="content">
      <el-row>
        <el-col :span="9" style="text-align: right"><span style="font-size: 20px">拖延内容:</span></el-col>
        <el-col :span="12">
          <el-input
            v-model="content"
            :autosize="{ minRows: 4, maxRows: 8}"
            label="拖延内容:"
            type="textarea"
            placeholder="请输入内容"
            style="width: 50%;height: 100%"
          />
        </el-col>
      </el-row>

    </el-form-item>
    <el-form-item prop="dateRange">
      <el-row>
        <el-col :span="9" style="text-align: right"><span style="font-size: 20px">目标完成时间段:</span></el-col>
        <el-col :span="12">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-col>
      </el-row></el-form-item>
    <el-row>
      <el-col :span="24" style="text-align: center">
        <el-button type="primary" style="width: 30%" @click="confirmPublish">发布</el-button>
      </el-col>
    </el-row></el-form>
</template>

<script>
import { addRecord } from '@/api/record'

export default {
  name: 'Publish',
  data() {
    return {
      publishForm: {
        content: '',
        beginTime: '',
        endTime: ''
      },
      dateRange: '',
      rules: {
        content: [{ required: true, message: '必填项', trigger: 'blur' }],
        dateRange: [{ required: true, message: '必填项', trigger: 'blur' }]
      }
    }
  },
  methods: {
    confirmPublish() {
      this.$refs['publishForm'].validate(async(valid) => {
        if (valid) {
          const res = await addRecord()
          if (res.code === 200) {
            this.role = Object.assign({}, res.data)
            const index = this.rolesList.findIndex(v => v.id === this.role.id)
            this.rolesList.splice(index, 1, this.role)
            this.dialogVisible = false
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
