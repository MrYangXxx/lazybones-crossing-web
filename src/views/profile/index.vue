<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>我的信息</span>
              <el-button style="float: right;" @click="handleUpdate">修改</el-button>
            </div>

            <div class="user-profile">
              <div class="box-center">
                <pan-thumb :image="FileApi+user.avatar" :height="'100px'" :width="'100px'" :hoverable="false" />
              </div>
              <div class="box-center">
                <div class="user-name text-center">{{ user.userName }}</div>
              </div>
            </div>

            <div class="user-bio">
              <div class="user-education user-bio-section">
                <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>统计</span></div>
                <div class="user-bio-section-body">
                  <div class="text-muted">
                    鲜花数 <img style="width: 30px;height: 30px;display: inline" class="" src="@/assets/flower.jpg" alt="flower">:
                    <span style="margin-left: 10px">{{ user.flower }}</span>
                  </div>
                  <br>
                  <div class="text-muted">
                    鸡蛋数 <img style="width: 30px;height: 30px;display: inline" class="" src="@/assets/egg.jpg" alt="egg">:
                    <span style="margin-left: 10px">{{ user.egg }}</span>
                  </div>
                </div>
              </div>

            </div>
          </el-card>
        </el-col>

        <el-col :span="18" :xs="24">
          <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto;height: 850px" infinite-scroll-distance="20">
            <li v-for="(record, index) in recordList" :key="record.id" class="infinite-list-item" style="list-style-type:none;padding-bottom: 20px">
              <el-card style="width: 80%;overflow:auto">
                <div class="user-activity">
                  <div class="post">
                    <div class="user-block">
                      <img class="img-circle" :src="FileApi + user.avatar">
                      <span class="username text-muted">{{ user.userName }}</span>
                      <span class="description">发布于:{{ record.publishTime | parseDateTime }}</span>
                      <div style="text-align: right">
                        <el-button v-if="!record.complete" style="margin: 5px;" @click="complete(record,index)">完成</el-button>
                        <span v-else style="margin: 10px;font-size: 16px">已完成</span>
                        <el-popconfirm
                          title="确定删除吗？"
                          @onConfirm="removeRecord(record.id)"
                        >
                          <el-button slot="reference">删除</el-button>
                        </el-popconfirm>
                      </div>
                    </div>
                    <p style="padding-left: 4%;word-wrap: break-word;word-break: break-all;">
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
                          <img style="width: 30px;height: 30px;display: inline" class="" src="@/assets/flower.jpg" alt="flower">:
                          <span style="margin-left: 10px">{{ record.flower }}</span>
                        </span>
                      </li>
                      <li>
                        <span class="link-black text-sm">
                          <img style="width: 30px;height: 30px;display: inline" class="" src="@/assets/egg.jpg" alt="egg">:
                          <span style="margin-left: 10px">{{ record.egg }}</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-card>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="user"
        label-position="center"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="user.userName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="电话" prop="userName">
          <el-input v-model="user.mobile" :disabled="user.mobile !=''" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.email" :disabled="user.email!=''" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" type="password" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="user.gender" class="filter-item" placeholder="请选择">
            <el-option v-for="item in genderTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthDay">
          <el-date-picker v-model="user.birthDay" type="date" placeholder="请选择" />
        </el-form-item>
        <el-form-item label="头像" prop="file">
          <el-upload
            class="avatar-uploader"
            action="/api/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="user.avatar" :src="FileApi+user.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="modifyUser">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { completeRecord, deleteRecord, myRecords } from '@/api/record'
import { updateUser } from '@/api/user'
import store from '@/store'
import PanThumb from '@/components/PanThumb'
import { parseTime } from '@/utils'

const genderTypeOptions = [
  { key: 0, display_name: '男' },
  { key: 1, display_name: '女' }
]

export default {
  name: 'Profile',
  components: { PanThumb },
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
      dialogFormVisible: false,
      genderTypeOptions,
      user: {},
      recordList: [],
      FileApi: process.env.VUE_APP_FILE_API,
      pagination: { page: 1, pageSize: 10, count: 0 }
    }
  },
  created() {
    this.getRecords()
    this.getUserInfo()
  },
  methods: {
    load() {
      if (this.pagination.count < this.pagination.page * this.pagination.pageSize) {
        return
      }
      this.pagination.page += 1
      this.getRecords(this.pagination)
    },
    async getUserInfo() {
      const res = await store.dispatch('user/getInfo')
      this.user = res.userInfo
    },
    handleUpdate(row) {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    async modifyUser() {
      const res = await updateUser(this.user.id, this.user)
      if (res.code === 200) {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      }
    },
    async getRecords(filter) {
      const res = await myRecords({ userId: store.getters.userId, ...filter })
      this.recordList = this.recordList.concat(res.data.records)
      this.pagination = res.data.pagination
    },
    async complete(record, index) {
      const res = await completeRecord({ id: record.id })
      if (res.message === 'success') {
        this.recordList[index].complete = true
      }
    },
    async removeRecord(id) {
      const res = await deleteRecord({ id })
      if (res.message === 'success') {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      }
      this.getRecords()
    },
    handleAvatarSuccess(res) {
      this.user.avatar = res.data.fileName
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-class{

  }
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }

  .user-profile {
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .user-bio {
    margin-top: 20px;
    color: #606266;

    span {
      padding-left: 4px;
    }

    .user-bio-section {
      font-size: 14px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
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

