<template>
  <div class="milestone_plan_time_content">
    <div class="tit">里程碑计划完成时间</div>
    <div class="project_details">
      <div class="info_list" v-for="v in milestonePlanContent.milestonePlanContent">
        <span class="label">{{ `${v.label}` }}</span>
        <span class="content">{{ v.content }}</span>
        <el-checkbox
          v-if="v.label === '计划到货时间'"
          disabled
          v-model="milestonePlanContent.notArrival"
        >不涉及</el-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "milestonePlanContent",
  props: {
    milestonePlanContent: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
.milestone_plan_time_content {
  .tit {
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
    padding-bottom: 8px;
    text-align: left;
  }
  .project_details {
    line-height: 28px;
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // padding-left: 80px;
    margin-bottom: 20px;
    // border-bottom: 1px solid #ccc;
    .info_list {
      font-weight: 400;
      color: rgba(0, 0, 0, 0.847058823529412);
      width: 50%;
      margin-bottom: 8px;
      text-align: left;
      .label {
        width: 140px;
        display: inline-block;
        text-align: right;
        margin-right: 12px;
        color: #606266;
      }
      .content {
        color: #9ea0a3;
      }
    }
  }
}
</style>


