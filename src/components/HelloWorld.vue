<template>
  <div>
    <el-button class="outbtn" type="primary" @click="exportExcel">导出Excel</el-button>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" class="tables"
              @selection-change="handleSelectionChange" @row-click="clickRow" id="out-table">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="昵称" width="120">
        <template slot-scope="scope">{{ scope.row.NickName }}</template>
      </el-table-column>
      <el-table-column prop="Sex" label="性别" width="120" :formatter="format"></el-table-column>
      <el-table-column prop="Province" label="省份" width="120"></el-table-column>
      <el-table-column prop="City" label="地址" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :page-size="10"
                   layout="prev, pager, next, jumper" :total="dataLength" class="pages">
    </el-pagination>
    <div style="clear: both;height: 100px;"></div>
    <div class="times">{{ times }}</div>
    <input type="number" v-model="count">
    <input type="number" v-model="watchNam">
    <div>{{ t | formatDateTimes }}</div>
  </div>
</template>

<script>
  import bus from '../router/eventBus';
  import FileSaver from 'file-saver';
  import XLSX from 'xlsx';

  export default {
    name: "HelloWorld",
    data() {
      return {
        dataLength: 0,
        tableData: [], //表格显示数据
        multipleSelection: [], //选择的数据
        thisName: "", //传的值
        count: 1,
        watchNam: 1,
        t: 1528164463
      }
    },
    created: function () {
      this.setDatas(1);
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
        this.setDatas(val);
      },
      setDatas(e){
        this.$axios.get("xxx?page=" + e).then(res => {
          this.dataLength = res.data.count;
          this.tableData = res.data.results;
          console.log(res.data);
        });
      },
      format (row) {
        let value = row.Sex;
        if (value == 1) {
          return '男';
        } else if (value == 2) {
          return '女';
        }
      },
      exportExcel () {
        let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
        let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'});
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), 'vue.xls')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
    },
    beforeDestroy () {
      //bus.$emit('userDefinedEvent', this.thisName); //传值
    },
    computed: {
      times(){
        return this.count * 5
      }
    },
    filters: {
      formatDateTimes: function (timeStamp) {
        var date = new Date();
        date.setTime(timeStamp * 1000); //时间戳为微秒*1,毫秒*1000
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
      }
    },
    watch: {
      watchNam: function (e) {
        this.count = e;
      }
    }
  }
</script>

<style scoped>
  .tables {
    margin-top: 30px;
  }

  .pages {
    margin-top: 20px;
    float: right;
  }

  .outbtn {
    margin-top: 30px;
  }

  .times {
    width: 200px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }

</style>
