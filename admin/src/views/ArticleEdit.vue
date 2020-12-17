<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form>
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="model.body"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="save"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {},
  },
  components: { VueEditor },
  data() {
    return {
      model: {},
      categories: [],
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      console.log('1111')
      let res = await this.$http.post("upload", formData);
      console.log('2222')
      let url = res.data.url; // Get url from response
      console.log(url,'3333')
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader();
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/articles", this.model);
      }
      console.log(res);
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      let res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      let res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
};
</script>
