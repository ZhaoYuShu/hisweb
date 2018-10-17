<template>
  <div class="transBox">
    <el-transfer
      filterable
      filter-placeholder="请输入诊台拼音"
      v-model="value"
      :data="data"
      :titles="['未选诊台', '已选诊台']"
      @change="handleChange">
    </el-transfer>
    <el-row class="row">
      <el-col :span="24">
        <el-button type="primary" size="small" @click="save" class="save">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "medicalArea1",
  data () {
    return {
      data: [],
      value: [],
      examGroupItems: []
    };
  },
  methods: {
    // 获取所有体检项目
    getAllExam () {
      let that = this;
      http.allGroup().then(response => {
        console.log(response);
        if (response.status === 200 && response.data.result === '00000000') {
          for (let i = 0; i < response.data.data.length; i++) {
            let obj = {};
            obj.label = response.data.data[i].name;
            obj.key = response.data.data[i].code;
            // obj.alphabeticBrevityCode = response.data.data[i].alphabeticBrevityCode;
            obj.price = response.data.data[i].price;
            that.data.push(obj);
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    handleChange (value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
      console.log(this.data);
      this.value = value;
    },
    // 保存
    save () {
      let array = [];
      console.log(this.value, this.data);
      if (this.value.length) {
        for (let i = 0; i < this.value.length; i++) {
          for (let j = 0; j < this.data.length; j++) {
            console.log(i, j);
            console.log(this.value[i], this.data[j].key);
            if (this.value[i] === this.data[j].key) {
              let objs = {};
              objs.code = this.data[j].key;
              objs.name = this.data[j].label;
              objs.price = this.data[j].price;
              array.push(objs);
              this.examGroupItems = [...new Set(array)];
              console.log(this.examGroupItems);
              break;
            }
          }
        }
      }
      console.log(this.examGroupItems);
      Bus.$emit('companyGroupItems', this.examGroupItems);
    }
  },
  mounted () {
    this.getAllExam();
  }
}
</script>

<style>
  .el-transfer-panel{
    width:300px;
    height:400px;
  }
  .el-transfer-panel__body{
    height:100%;
    overflow:hidden;
  }
  .el-transfer-panel__list.is-filterable{
    height:76%;
    padding-top:0;
    overflow:auto;
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
