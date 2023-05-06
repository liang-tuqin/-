<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommentTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    //点击跳转功能
    changeMenu(item) {
      this.$router.push(item.path);
    },
    ...mapMutations(["closeTag"]),
    handleClose(item, index) {
      this.closeTag(item);
      const length = this.tags.length;
      //删除之后的跳转逻辑
      if (item.name !== this.$route.name) {
        return;
      }
      //表示的是删除的最后一页
      console.log(index + "index");
      console.log(length + "length");
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 0 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>>
</style>