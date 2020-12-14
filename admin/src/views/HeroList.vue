<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="item">
      <el-table-column prop="_id" label="ID" width="220"> </el-table-column>
      <el-table-column prop="name" label="英雄名称"> </el-table-column>
      <el-table-column prop="title" label="称号"> </el-table-column>
      <el-table-column prop="avatar" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:3rem" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$router.push(`/heroes/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button size="mini" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: [],
    };
  },
  methods: {
    async fetch() {
      let res = await this.$http.get("rest/heroes");
      this.item = res.data;
    },
    async remove(row) {
      this.$confirm(`是否要删除分类${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await this.$http.delete(`rest/heroes/${row._id}`);
        console.log(res, "resres");
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>
