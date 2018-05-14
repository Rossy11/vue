<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" class="tables"
              @selection-change="handleSelectionChange" @row-click="clickRow">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="昵称" width="120">
        <template slot-scope="scope">{{ scope.row.NickName }}</template>
      </el-table-column>
      <el-table-column prop="Province" label="省份" width="120"></el-table-column>
      <el-table-column prop="City" label="地址" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :page-size="3"
                   layout="prev, pager, next, jumper" :total="dataLength" class="pages">
    </el-pagination>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
  import bus from '../router/eventBus';

  export default {
    name: "HelloWorld",
    data() {
      return {
        dataLength: 0,
        tableData: [], //表格显示数据
        multipleSelection: [], //选择的数据
        allData: [], //总数据
        thisName: "" //传的值
      }
    },
    created: function () {
      this.$axios.get("xxxxxx").then(res => {
        this.dataLength = res.data.length;
        this.tableData = res.data.slice(0, 3);
        this.allData = res.data;
        console.log(res.data);
      });
    },
    methods: {
      clickRow(val){ //点击行
        this.thisName = val.HeadImgUrl;
        this.$store.commit("newImg", val.HeadImgUrl); //vuex传值
        this.$router.push({name: 'detail'}); //跳转
        //this.$router.push({name: 'detail', query: {userInfo: thisName}})
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {  //当前页
        console.log(val);
        this.tableData = this.allData.slice((val - 1) * 3, 3 * val);
      }
    },
    beforeDestroy () {
      //bus.$emit('userDefinedEvent', this.thisName); //传值
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tables {
    margin-top: 30px;
  }

  .pages {
    margin-top: 20px;
    float: right;
  }

</style>
