<template>
  <div style="margin-top: 30px">
    <el-form
      ref="dataForm"
      :model="info"
      label-position="center"
      label-width="100px"
      style="width: 400px; margin-left:50px;"
    >
      <el-form-item label="信息" prop="name">
        <el-input v-model="info.fileName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="文件" prop="file">
        <el-upload
          class="upload-demo"
          action="/api/upload"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { deleteFile } from '@/api/upload'
import { getToken } from '@/utils/auth'

export default {
  name: 'Upload',
  data() {
    return {
      fileList: [],
      info: {
        fileName: ''
      },
      headers: {
        Authorization: getToken()
      }
    }
  },
  methods: {
    async handleRemove(file, fileList) {
      console.log(file, fileList)
      const res = await deleteFile({ fileName: file.name })
      if (res.code === 200) {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      }
    },
    handleAvatarSuccess(res) {
      this.info.fileName = res.data.fileName
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>
