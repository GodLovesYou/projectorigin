export default {
  projectMessage: { // 项目信息菜单
    btns: [
      'import',
      'export',
      'search',
      'insert',
      'edit',
      'delete',
      'view'
    ]
  },
  progressManage: { // 进度管理菜单
    routes: {
      milestoneManage: { // 里程碑编制菜单
        routes: {
          milestoneManageEdit: { // 编制页面
            
          },
          milestoneManageDetails: { // 查看页面

          },
          milestoneManageChange: {} // 变更页面
        },
        btns: ['export', 'edit', 'view', 'change']
      },
      projectProgressManage: { // 项目进度维护菜单
        routes: {
          projectProgressManageEdit: { // 编辑页面
          
          },
          projectProgressManageLook: { // 查看页面

          }
        },
        btns: ['edit', 'view', 'attachment']
      },
      milestonePlanApproval: { // 里程碑计划审核菜单
        routes: {
          milestonePlanApprovalEdit: { // 里程碑计划编制审核(菜单)
            btns: ['batchAgree', 'batchReject', 'agree', 'reject']
          },
          milestonePlanApprovalUpdate: { // 里程碑计划变更审核(菜单)
            routes: {
              milestonePlanApprovalUpdateList: {  // 里程碑计划变更审核(菜单)
                routes: {
                  milestonePlanApprovalUpdateVerify: {  //里程碑计划变更审核审核页面

                  },
                  milestonePlanApprovalUpdateCheck: { // 里程碑计划变更审核查看页面

                  }
                },
                btns: [
                  'approve', 'check'
                ]
              }
            }
          }
        }
      }
    },
    btns: []
  },
  msgSet: {
    btns: ['insert', 'edit', 'delete', 'setStatus']
  },
  statisticsAnalyze: {
    btns: ['export']
  }
}