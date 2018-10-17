<template>
  <div class="transBox">
    <el-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入项目拼音"
      v-model="value"
      :data="data"
      :titles="['未选项目', '已选项目']"
      @change="handleChange">
    </el-transfer>
    <el-row class="row">
      <el-col :span="24">
        <el-button type="primary" size="small" @click="save" class="save">保存</el-button>
      </el-col>
    </el-row>
    <div class="summary" >已选<span class="red">{{summary}}</span>项，共计<span class="red">{{realPrice}}</span>元</div>
  </div>
</template>

<script>
import http from '@/api/index.js'
import Bus from '@/utils/bus.js'
export default {
  name: "companyGroup2",
  data () {
    return {
      data: [],
      value: [],
      examGroupItems: [],
      filterMethod (query, item) {
        return item.alphabeticBrevityCode.indexOf(query) > -1;
      },
      summary: 0,
      realPrice: 0
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
            obj.allowDiscount = response.data.data[i].allowDiscount;
            obj.discount = response.data.data[i].discount;
            obj.realPrice = response.data.data[i].realPrice;
            obj.alphabeticBrevityCode = response.data.data[i].alphabeticBrevityCode;
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
      this.summary = value.length;
      let sum = 0;
      for (let i = 0; i < this.value.length; i++) {
        for (let j = 0; j < this.data.length; j++) {
          console.log(i, j);
          console.log(this.value[i], this.data[j].key);
          if (this.value[i] === this.data[j].key) {
            sum += this.data[j].realPrice;
            break;
          }
        }
      }
      this.realPrice = sum;
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
              objs.realPrice = this.data[j].realPrice;
              objs.allowDiscount = this.data[j].allowDiscount;
              objs.discount = this.data[j].discount;
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
    Bus.$on('packageItems2', (e) => {
      console.log(e);
      this.value = [];
      for (let i = 0; i < e.length; i++) {
        this.value.push(e[i].code);
      }
      this.summary = e.length;
      let sum = 0;
      for (let i = 0; i < e.length; i++) {
        sum += e[i].realPrice;
      }
      this.realPrice = sum;
    });
    Bus.$on('examItems2', (e) => {
      this.value = e;
    });
    Bus.$on('packageGroup2', (e) => {
      this.examGroupItems = e;
    });
  }
}
</script>

<style scoped>
  .transBox{
    width:100%;
    height:100%;
    position:relative;
  }
  >>>.el-transfer-panel{
    width:300px;
    height:400px;
  }
  >>>.el-transfer-panel__body{
    height:100%;
    overflow:hidden;
  }
  >>>.el-transfer-panel__list.is-filterable{
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
  .summary{
    position:absolute;
    left:0;
    bottom:100px;
    width:300px!important;
    font-size:16px;
  }
  .summary .red{
    color:red;
    font-weight:bold;
  }
  #pane-second{
    overflow:auto;
  }
</style>
<style scoped>
  >>> .el-input{
    width:90%;
  }
</style>
