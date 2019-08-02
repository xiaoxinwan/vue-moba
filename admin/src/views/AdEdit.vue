<template>
  <div>
    <h1>{{id ? '编辑': '新建'}}广告位</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-col :span="10">
          <el-input v-model="model.name" style="minWidth: 200px"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="广告">
        <el-button style="margin-bottom: 1rem;" @click="model.items.push({})">
          <i class="el-icon-plus"></i>
          添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap;">
          <el-col :md="12" v-for="(item, index) in model.items" :key="index">
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="广告图片" style="margin-top: 1rem;">
              <el-upload
                class="image-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="image" />
                <i v-else class="el-icon-plus image-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="small" @click="model.items.splice(index, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      model: {
        items: []
      }
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
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  }
};
</script>
<style  scope>
.image-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.image-uploader .el-upload:hover {
  border-color: #409eff;
}
.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 8rem;
  height: 8rem;
  line-height: 8rem;
  text-align: center;
}
.image {
  min-width: 8rem;
  height: 8rem;
  display: block;
}
</style>
