<template>
  <el-form
    ref="form"
    label-width="70px"
    :inline="true"
    class="login-container"
    :model="form"
    :rules="rules"
  >
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="form.userName" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="userPossword">
      <el-input
        type="password"
        v-model="form.userPossword"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        @click="submit"
        style="margin-left: 105px; margin-top: 10px"
        type="primary"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
  data() {
    return {
      form: {
        userName: "",
        userPossword: "",
      },
      rules: {
        userName: [
          { required: "true", trigger: "blur", message: "请输入用户名" },
        ],
        userPossword: [
          { required: "true", trigger: "blur", message: "请输入密码" },
        ],
      },
    };
  },
  methods: {
    submit() {
      //校验成功
      this.$refs.form.validate((val) => {
        if (val) {
          getMenu(this.form).then(({ data }) => {
            console.log(data);
            if (data.code === 20000) {
              //设置token
              Cookie.set("token", data.data.token);
              this.$store.commit("getMenu", data.data.menu);
              this.$store.commit('addMenu',this.$router)
              //跳转home页面
              this.$router.push("/home");
            } else {
              this.$message({
                showClose: true,
                message: data.data.message,
                type: "error",
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .login_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-input {
    width: 198px;
  }
}
</style>