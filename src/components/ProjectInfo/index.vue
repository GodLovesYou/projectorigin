<template>
  <div class="project_info">
    <div class="tit">项目信息</div>
    <div class="project_details">
      <div class="info_list" v-for="v in infoContent.infoContent" :key='v.label' :class="{full_width: v.label === '项目名称'? true:false}">
        <span class="label">{{ `${v.label}` }}</span>
        <span class="content" v-if="v.label !== '项目暂停'">{{ v.content }}</span>
        <el-checkbox v-model="infoContent.projectInfoChecked" v-else :disabled="type === '查看'" @change="setProjectState"></el-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: "projectInfo",
  data() {
    return {
    }
  },
  props:{
    infoContent:{
      type: Object,
      required: true
    },
    type:{
      type: String
    }
  },
  methods: {
    setProjectState(v){
      this.SET_MILE_PROJECT_STATE(v)
    },
    ...mapMutations(['SET_MILE_PROJECT_STATE'])
  }
};
</script>
<style lang="scss" scoped>
.project_info {
  .tit {
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
    padding-bottom: 8px;
    text-align: left;
  }
  .project_details{
    line-height: 28px;
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // padding-left: 80px;
    margin-bottom: 20px;
    // border-bottom: 1px solid #ccc;
    padding-left: 50px;
    .info_list{
      font-weight: 400;
      color: rgba(0, 0, 0, 0.847058823529412);
      width: 50%;
      // margin-bottom: 8px;
      text-align: left;
      display: flex;
      
      .label{
        width: 100px;
        display: inline-block;
        text-align: right;
        margin-right: 12px;
         color: #606266;
      }
      .content{
        color: #9ea0a3;
        word-break: break-all;
        flex: 1;
      }
    }
    .full_width{
      width: 100%;
    }
  }
}
</style>


