<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <CommentAside />
      </el-aside>
      <el-container>
        <el-header>
          <CommentHeader />
        </el-header>
        <CommentTag></CommentTag>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommentAside from "../components/CommentAside.vue";
import CommentHeader from "../components/CommentHeader.vue";
import CommentTag from "../components/CommentTag.vue";
export default {
  data() {
    return {};
  },
  components: {
    CommentAside,
    CommentHeader,
    CommentTag,
  },
};
</script>

<style>
.el-header {
  padding: 0;
}
.el-main {
  padding: 10px 20px;
}
</style>