<template>
  <div class="rightTable">
    <el-row>
      <el-col :span="24">
        <p class="title">体检项目组合<span style="color:red;">(已选{{sum}}项)</span></p>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width:100%"
      border
      height="93%"
      @selection-change="handleSelectionChange"
      @select-all="handleSelectAll">
      <el-table-column
        align="left"
        type="selection">
      </el-table-column>
      <el-table-column
        align="left"
        prop="name"
        label="体检项目"
        width="240">
      </el-table-column>
      <el-table-column
        align="left"
        prop="sexName"
        label="性别">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
export default {
  name: "groupTable",
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      officeId: '',
      sum: 0
    }
  },
  methods: {
    // 选择体检项目
    handleSelectionChange (val) {
      console.log(val);
      this.multipleSelection = val;
      console.log(this.multipleSelection);
      this.sum = val.length;
      Bus.$emit("examItemList2", val);
    },
    // 全选
    handleSelectAll (selection) {
      console.log(selection);
      this.multipleSelection = selection;
      Bus.$emit("examItemList3", selection);
      this.sum = selection.length;
    },
    toggleSelection (rows) {
      let that = this;
      if (rows) {
        console.log('ok');
        rows.forEach(row => {
          console.log(row);
          this.$nextTick(() => {
            that.$refs.multipleTable.toggleRowSelection(row, true);
          })
        });
      } else {
        console.log('no');
        this.$refs.multipleTable.clearSelection();
      }
    }
  },
  created () {
    Bus.$on("multipleSelection", (e) => {
      this.multipleSelection = e;
    });
    Bus.$on("examItemList", (e) => {
      let multipleSelection = [];
      let arr = [];
      let sum = 0;
      for (let i = 0; i < e.length; i++) {
        if (e[i].sex === 1) {
          e[i].sexName = '男';
        } else if (e[i].sex === 2) {
          e[i].sexName = '女';
        } else if (e[i].sex === 0) {
          e[i].sexName = '所有';
        }
        if (e[i].flag === 1) {
          sum ++;
          multipleSelection.unshift(e[i]);
          arr.unshift(e[i]);
        } else if (e[i].flag === 0) {
          arr.push(e[i]);
        }
      }
      this.sum = sum;
      this.tableData = arr;
      this.toggleSelection(multipleSelection);
    });
    Bus.$on("tableNull", (e) => {
      this.tableData = e;
    });
    Bus.$on("resetTable", (e) => {
      this.tableData = e;
    });
    Bus.$on("officeId", (e) => {
      this.officeId = e;
    });
    Bus.$on("examItemResultDtos", (e) => {
      for (let i = 0; i < e.length; i++) {
        if (e[i].sex === 1) {
          e[i].sexName = '男';
        } else if (e[i].sex === 2) {
          e[i].sexName = '女';
        } else if (e[i].sex === 0) {
          e[i].sexName = '所有';
        }
      }
      this.tableData = e;
    });
    Bus.$on("sum", (e) => {
      this.sum = e;
    });
  }
}
</script>

<style scoped>
  .rightTable{
    width:34%;
    margin-left:1%;
    padding-right:1%;
    padding-left:1%;
    float:left;
    height:100%;
    background:#fff;
  }
  .title{
    text-align:left;
    text-indent:20px;
    font-size:12px;
    font-weight:bold;
  }
</style>
<!--<style>-->
  <!--@import '../../style/common.css';-->
<!--</style>-->
