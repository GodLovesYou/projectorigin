<template>
  <div class="milestone_plan_time">
    <div class="tit">里程碑计划完成时间</div>
    <el-form
      :inline="true"
      label-width="140px"
      size="mini"
      :model="milestoneForm"
      class="milestone_form"
      :rules="rules"
      ref="editMileForm"
    >
      <el-form-item label="计划采购申报时间" prop="purchaseTimeStr">
        <el-date-picker
          v-model="milestoneForm.purchaseTimeStr"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="validPurchaseTimeStr"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="计划主合同签订时间" label-width="240px" prop="signTimeStr">
        <el-date-picker
          v-model="milestoneForm.signTimeStr"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="validSignTimeStr"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="计划到货时间" prop="arrivalTimeStr" v-show="!milestoneForm.notArrival">
        <el-date-picker
          v-model="milestoneForm.arrivalTimeStr"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="validArrivalTimeStr"
          :disabled="milestoneForm.notArrival"
        ></el-date-picker>
        <el-checkbox v-model="milestoneForm.notArrival" class="not_arrival" @change="change">不涉及</el-checkbox>
      </el-form-item>
      <el-form-item
        label="计划到货时间"
        v-show="milestoneForm.notArrival"
        ref="arrivalTimeStr"
        prop="arrivalTimeStr"
      >
        <el-date-picker
          v-model="milestoneForm.arrivalTimeStr"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          :disabled="milestoneForm.notArrival"
        ></el-date-picker>
        <el-checkbox v-model="milestoneForm.notArrival" class="not_arrival" @change="change">不涉及</el-checkbox>
      </el-form-item>
      <el-form-item label="计划上线/完成时间" prop="finishedTimeStr" label-width="240px">
        <el-date-picker
          v-model="milestoneForm.finishedTimeStr"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="validFinishedTimeStr"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="计划竣工验收时间" prop="acceptanceTimeStr">
        <el-date-picker
          v-model="milestoneForm.acceptanceTimeStr"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="setDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="计划结算时间" label-width="240px" prop="settlementTimeStr">
        <el-date-picker
          v-model="milestoneForm.settlementTimeStr"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="validSettlementTimeStr"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="计划转资时间" prop="transferTimeStr">
        <el-date-picker
          v-model="milestoneForm.transferTimeStr"
          type="date"
          readonly
          :disabled="milestoneForm.moneyTypeName === '成本性'? true : false"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="validTransferTimeStr"
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import "./style.scss";
import { mapState } from "vuex";
export default {
  name: "milestonePlanTime",
  data() {
    let purchaseTimeStr = (rule, value, callback) => {
      if (this.projectState) {
        callback();
      }
      if (!this.validatorArr[0]) {
        callback(new Error("计划采购申报时间不能为空"));
      } else {
        callback();
      }
    };
    let signTimeStr = (rule, value, callback) => {
      if (this.projectState) {
        if (this.validatorArr[0] && this.validatorArr[1]) {
          if (
            this.$moment(this.validatorArr[1]).isAfter(this.validatorArr[0])
          ) {
            callback();
          } else {
            callback(
              new Error("计划主合同签订时间不能早于等于计划采购申报时间")
            );
          }
        } else {
          callback();
        }
      }
      if (!this.validatorArr[1]) {
        callback(new Error("计划主合同签订时间不能为空"));
      } else if (this.validatorArr[0]) {
        if (this.$moment(this.validatorArr[1]).isAfter(this.validatorArr[0])) {
          callback();
        } else {
          callback(new Error("计划主合同签订时间不能早于等于计划采购申报时间"));
        }
      } else {
        callback();
      }
    };
    let arrivalTimeStr = (rule, value, callback) => {
      if (this.projectState) {
        if (
          this.validatorArr[2] &&
          this.validatorArr[1] &&
          !this.milestoneForm.notArrival
        ) {
          if (
            this.$moment(this.validatorArr[2]).isAfter(this.validatorArr[1])
          ) {
            callback();
          } else {
            callback(new Error("计划到货时间不能早于等于计划主合同签订时间"));
          }
        } else if (!this.validatorArr[2]) {
          callback();
        } else if (
          this.validatorArr[2] &&
          !this.validatorArr[1] &&
          this.validatorArr[0] &&
          !this.milestoneForm.notArrival
        ) {
          if (
            this.$moment(this.validatorArr[2]).isAfter(this.validatorArr[0])
          ) {
            callback();
          } else {
            callback(new Error("计划到货时间不能早于等于计划采购申报时间"));
          }
        } else {
          callback();
        }
      }
      if (this.milestoneForm.notArrival) {
        callback();
      }
      if (!this.validatorArr[2]) {
        callback(new Error("计划到货时间不能为空"));
      } else if (this.validatorArr[1]) {
        if (this.$moment(this.validatorArr[2]).isAfter(this.validatorArr[1])) {
          callback();
        } else {
          callback(new Error("计划到货时间不能早于等于计划主合同签订时间"));
        }
      } else {
        callback();
      }
    };
    let finishedTimeStr = (rule, value, callback) => {
      if (this.projectState) {
        if (!this.validatorArr[3]) {
          callback();
        }
        if (this.milestoneForm.notArrival) {
          if (this.validatorArr[1]) {
            if (
              this.$moment(this.validatorArr[3]).isAfter(this.validatorArr[1])
            ) {
              callback();
            } else {
              callback(
                new Error("计划上线/完成时间不能早于等于计划主合同签订时间")
              );
            }
          } else if (this.validatorArr[0]) {
            if (
              this.$moment(this.validatorArr[3]).isAfter(this.validatorArr[0])
            ) {
              callback();
            } else {
              callback(
                new Error("计划上线/完成时间不能早于等于计划采购申报时间")
              );
            }
          } else {
            callback();
          }
        } else {
          if (this.validatorArr[2]) {
            if (
              this.$moment(this.validatorArr[3]).isAfter(this.validatorArr[2])
            ) {
              callback();
            } else {
              callback(new Error("计划上线/完成时间不能早于等于计划到货时间"));
            }
          } else if (this.validatorArr[1]) {
            if (
              this.$moment(this.validatorArr[3]).isAfter(this.validatorArr[1])
            ) {
              callback();
            } else {
              callback(
                new Error("计划上线/完成时间不能早于等于等于计划主合同签订时间")
              );
            }
          } else if (this.validatorArr[0]) {
            if (
              this.$moment(this.validatorArr[3]).isAfter(this.validatorArr[0])
            ) {
              callback();
            } else {
              callback(
                new Error("计划上线/完成时间不能早于等于计划采购申报时间")
              );
            }
          } else {
            callback();
          }
        }
      }
      if (!this.validatorArr[3]) {
        callback(new Error("计划上线/完成时间不能为空"));
      } else if (this.validatorArr[2] && !this.milestoneForm.notArrival) {
        if (this.$moment(this.validatorArr[3]).isAfter(this.validatorArr[2])) {
          callback();
        } else {
          callback(new Error("计划上线/完成时间不能早于等于计划到货时间"));
        }
      } else if (this.milestoneForm.notArrival) {
        if (this.$moment(this.validatorArr[3]).isAfter(this.validatorArr[1])) {
          callback();
        } else {
          callback(
            new Error("计划上线/完成时间不能早于等于计划主合同签订时间")
          );
        }
      } else {
        callback();
      }
    };
    let acceptanceTimeStr = (rule, value, callback) => {
      if (this.projectState) {
        if (!this.validatorArr[4]) {
          callback();
        }
        if (this.validatorArr[3]) {
          if (
            this.$moment(this.validatorArr[4]).isAfter(this.validatorArr[3])
          ) {
            callback();
          } else {
            callback(
              new Error("计划竣工验收时间不能早于等于计划上线/完成时间")
            );
          }
        } else if (this.validatorArr[2] && !this.milestoneForm.notArrival) {
          if (
            this.$moment(this.validatorArr[4]).isAfter(this.validatorArr[2])
          ) {
            callback();
          } else {
            callback(new Error("计划竣工验收时间不能早于等于等于计划到货时间"));
          }
        } else if (this.validatorArr[1]) {
          if (
            this.$moment(this.validatorArr[4]).isAfter(this.validatorArr[1])
          ) {
            callback();
          } else {
            callback(
              new Error("计划竣工验收时间不能早于等于计划主合同签订时间")
            );
          }
        } else if (this.validatorArr[0]) {
          if (
            this.$moment(this.validatorArr[4]).isAfter(this.validatorArr[0])
          ) {
            callback();
          } else {
            callback(new Error("计划竣工验收时间不能早于等于计划采购申报时间"));
          }
        } else {
          callback();
        }
      }
      if (!this.validatorArr[4]) {
        callback(new Error("计划竣工验收时间不能为空"));
      } else if (this.validatorArr[3]) {
        if (this.$moment(this.validatorArr[4]).isAfter(this.validatorArr[3])) {
          callback();
        } else {
          callback(new Error("计划竣工验收时间不能早于等于计划上线/完成时间"));
        }
      } else {
        callback();
      }
    };
    let settlementTimeStr = (rule, value, callback) => {
      if (this.projectState) {
        if (!this.validatorArr[5]) {
          callback();
        }
        if (this.validatorArr[4]) {
          if (
            this.$moment(this.validatorArr[5]).isAfter(this.validatorArr[4])
          ) {
            callback();
          } else {
            callback(new Error("计划结算时间不能早于等于计划竣工验收时间"));
          }
        } else if (this.validatorArr[3]) {
          if (
            this.$moment(this.validatorArr[5]).isAfter(this.validatorArr[3])
          ) {
            callback();
          } else {
            callback(new Error("计划结算时间不能早于等于计划上线/完成时间"));
          }
        } else if (this.validatorArr[2] && !this.milestoneForm.notArrival) {
          console.log("hahahah ");
          if (
            this.$moment(this.validatorArr[5]).isAfter(this.validatorArr[2])
          ) {
            callback();
          } else {
            callback(new Error("计划结算时间不能早于等于计划到货时间"));
          }
        } else if (this.validatorArr[1]) {
          if (
            this.$moment(this.validatorArr[5]).isAfter(this.validatorArr[1])
          ) {
            callback();
          } else {
            callback(new Error("计划结算时间不能早于等于计划主合同签订时间"));
          }
        } else if (this.validatorArr[0]) {
          if (
            this.$moment(this.validatorArr[5]).isAfter(this.validatorArr[0])
          ) {
            callback();
          } else {
            callback(new Error("计划结算时间不能早于等于计划采购申报时间"));
          }
        } else {
          callback();
        }
      }
      if (!this.validatorArr[5]) {
        callback(new Error("计划结算时间不能为空"));
      } else if (this.validatorArr[4]) {
        if (this.$moment(this.validatorArr[5]).isAfter(this.validatorArr[4])) {
          callback();
        } else {
          callback(new Error("计划结算时间不能早于等于计划竣工验收时间"));
        }
      } else {
        callback();
      }
    };
    let transferTimeStr = (rule, value, callback) => {
      if (this.projectState) {
        if (!this.validatorArr[6]) {
          callback();
        }
        if (this.validatorArr[5]) {
          if (
            this.$moment(this.validatorArr[6]).isAfter(this.validatorArr[5])
          ) {
            callback();
          } else {
            callback(new Error("计划转资时间不能早于等于计划结算时间"));
          }
        } else if (this.validatorArr[4]) {
          if (
            this.$moment(this.validatorArr[6]).isAfter(this.validatorArr[4])
          ) {
            callback();
          } else {
            callback(new Error("计划转资时间不能早于等于计划竣工验收时间"));
          }
        } else if (this.validatorArr[3]) {
          if (
            this.$moment(this.validatorArr[6]).isAfter(this.validatorArr[3])
          ) {
            callback();
          } else {
            callback(new Error("计划转资时间不能早于等于计划上线/完成时间"));
          }
        } else if (this.validatorArr[2] && !this.milestoneForm.notArrival) {
          if (
            this.$moment(this.validatorArr[6]).isAfter(this.validatorArr[2])
          ) {
            callback();
          } else {
            callback(new Error("计划转资时间不能早于等于计划到货时间"));
          }
        } else if (this.validatorArr[1]) {
          if (
            this.$moment(this.validatorArr[6]).isAfter(this.validatorArr[1])
          ) {
            callback();
          } else {
            callback(new Error("计划转资时间不能早于等于计划主合同签订时间"));
          }
        } else if (this.validatorArr[0]) {
          if (
            this.$moment(this.validatorArr[6]).isAfter(this.validatorArr[0])
          ) {
            callback();
          } else {
            callback(new Error("计划转资时间不能早于等于计划采购申报时间"));
          }
        } else {
          callback();
        }
      }
      if (this.milestoneForm.moneyTypeName === "成本性") {
        callback();
      }
      if (!this.validatorArr[6]) {
        callback(new Error("计划转资时间不能为空"));
      } else if (this.validatorArr[5]) {
        if (this.$moment(this.validatorArr[6]).isAfter(this.validatorArr[5])) {
          callback();
        } else {
          callback(new Error("计划转资时间不能早于等于计划结算时间"));
        }
      } else {
        callback();
      }
    };
    return {
      rules: {
        purchaseTimeStr: [
          {
            validator: purchaseTimeStr,
            trigger: "blur"
          }
        ],
        signTimeStr: [
          {
            validator: signTimeStr,
            trigger: "blur"
          }
        ],
        arrivalTimeStr: [
          {
            validator: arrivalTimeStr,
            trigger: "blur"
          }
        ],
        finishedTimeStr: [
          {
            validator: finishedTimeStr,
            trigger: "blur"
          }
        ],
        acceptanceTimeStr: [
          {
            validator: acceptanceTimeStr,
            trigger: "blur"
          }
        ],
        settlementTimeStr: [
          {
            validator: settlementTimeStr,
            trigger: "blur"
          }
        ],
        transferTimeStr: [
          {
            validator: transferTimeStr,
            trigger: "blur"
          }
        ]
      },
      validatorArr: []
    };
  },
  props: {
    milestoneForm: {
      type: Object,
      required: true
    },
    isShow: {
      type: Boolean
    }
  },
  methods: {
    change(v) {
      if (v) {
        this.$refs.arrivalTimeStr.clearValidate();
      }
    },
    setDate(v) {
      if (this.milestoneForm.moneyTypeName === "资本性") {
        this.milestoneForm.transferTimeStr = this.$moment(v)
          .add(3, "months")
          .format("YYYY-MM-DD");
        this.validatorArr[6] = this.milestoneForm.transferTimeStr;
      }
    },
    validPurchaseTimeStr(v) {
      this.validatorArr[0] = v;
      this.$refs.editMileForm.validateField(["purchaseTimeStr"]);
    },
    validSignTimeStr(v) {
      // console.log(v)
      this.validatorArr[1] = v;
      this.$refs.editMileForm.validateField(["signTimeStr"]);
    },
    validArrivalTimeStr(v) {
      this.validatorArr[2] = v;
      this.$refs.editMileForm.validateField(["arrivalTimeStr"]);
    },
    validFinishedTimeStr(v) {
      this.validatorArr[3] = v;
      this.$refs.editMileForm.validateField(["finishedTimeStr"]);
    },
    validSettlementTimeStr(v) {
      this.validatorArr[5] = v;
      this.$refs.editMileForm.validateField(["settlementTimeStr"]);
    },
    validTransferTimeStr(v) {
      this.validatorArr[6] = v;
      this.$refs.editMileForm.validateField(["transferTimeStr"]);
    }
  },
  watch: {
    milestoneForm: {
      deep: true,
      // immediate: true,
      handler(newValue, old) {
        this.validatorArr[0] = newValue.purchaseTimeStr;
        this.validatorArr[1] = newValue.signTimeStr;
        this.validatorArr[2] = newValue.arrivalTimeStr;
        this.validatorArr[3] = newValue.finishedTimeStr;
        this.validatorArr[4] = newValue.acceptanceTimeStr;
        this.validatorArr[5] = newValue.settlementTimeStr;
        this.validatorArr[6] = newValue.transferTimeStr;
      }
    },
    projectState(v) {
      this.$refs.editMileForm.validate();
    }
  },
  computed: {
    ...mapState(["projectState"])
  }
};
</script>
<style lang="scss" scoped>
.milestone_plan_time {
  // width: 900px;
  .tit {
    border-bottom: 1px solid #ccc;
    padding-bottom: 8px;
    margin-bottom: 20px;
    text-align: left;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 180px;
  }
  .not_arrival {
    margin-top: 5px;
  }
}
</style>


