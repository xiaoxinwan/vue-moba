<template>
  <div>
    <h1>{{id ? '编辑': '新建'}}物品</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="物品名称">
        <el-col :span="10">
          <el-input v-model="model.name" style="minWidth: 200px"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="物品图标">
        <el-upload
          class="item-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleItemSuccess"
        >
          <img v-if="model.icon" :src="model.icon" class="item" />
          <i v-else class="el-icon-plus item-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  props: {
    id: {}
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    handleItemSuccess(res) {
      this.$set(this.model, "icon", res.url);
      console.log(res);
    }
  }
};
</script>

<style>
.item-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.item-uploader .el-upload:hover {
  border-color: #409eff;
}
.item-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.item {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
