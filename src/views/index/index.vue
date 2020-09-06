<template>
  <div class="dashboard-text" style="top: 40%;position: absolute;left: 50%;-webkit-transform: translateX(-50%);">欢迎来到：我趣网后台管理系统</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
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
