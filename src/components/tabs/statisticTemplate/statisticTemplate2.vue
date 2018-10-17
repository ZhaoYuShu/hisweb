<template>
  <div class="rightForm">
    <el-transfer
      filterable
      filter-placeholder="请输入城市拼音"
      v-model="value2"
      :data="data2"
      @change="handleChange"
      :titles="['未选项目', '已选项目']"
    >
    </el-transfer>
    <el-row class="row">
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <el-button @click="save" type="primary" class="save" size="small">保存</el-button>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "statisticTemplate2",
  data () {
    return {
      data2: [],
      value2: [],
      examGroupItems: []
      // filterMethod (query, item) {
      //   return item.pinyin.indexOf(query) > -1;
      // }
    };
  },
  methods: {
    handleChange (value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
      console.log(this.data2);
      this.value2 = value;
    },
    getAllGroup () {
      let that = this;
      http.allGroup().then(function (response) {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          for (let i = 0; i < response.data.data.length; i++) {
            let obj = {};
            obj.label = response.data.data[i].name;
            obj.key = response.data.data[i].code;
            obj.alphabeticBrevityCode = response.data.data[i].alphabeticBrevityCode;
            obj.price = response.data.data[i].realPrice;
            that.data2.push(obj);
          }
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    save () {
      console.log(this.value2, this.data2);
      if (this.value2.length) {
        for (let i = 0; i < this.value2.length; i++) {
          for (let j = 0; j < this.data2.length; j++) {
            console.log(i, j);
            console.log(this.value2[i], this.data2[j].key);
            if (this.value2[i] === this.data2[j].key) {
              let objs = {};
              objs.code = this.data2[j].key;
              objs.name = this.data2[j].label;
              objs.price = this.data2[j].price;
              this.examGroupItems.push(objs);
              break;
            }
          }
        }
      }
      console.log(this.examGroupItems);
      Bus.$emit('examGroupItems', this.examGroupItems);
    }
  },
  created () {
    this.getAllGroup();
    console.log(this.data2);
    let that = this;
    Bus.$on('packageItems', (e) => {
      console.log(e);
      that.value2 = [];
      for (let i = 0; i < e.length; i++) {
        that.value2.push(e[i].code);
      }
    });
    Bus.$on('examItems', (e) => {
      that.value2 = [];
    })
  }
}
</script>

<style>
  .rightForm{
    width:100%;
    height:100%;
    background:#fff;
    padding-right:1%;
    padding-top:20px;
    overflow:auto;
  }
  .el-transfer-panel{
    width:30%;
    height:450px;
  }
  .el-transfer-panel__body{
    height:100%;
  }
  .el-transfer-panel__list.is-filterable{
    height:100%;
  }
  .row{
    margin-top:10px;
    position:absolute;
    right:30px;
    top:0;
  }
  .save{
    float:right;
  }
  .el-input{
    width:90%;
  }
</style>
