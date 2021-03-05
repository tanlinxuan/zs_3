/**
 * Api 路由集合
 * @author 谭邻宣
 * @date 2020/7/6 14:12
 **/
const UC = `/uc/v0.1`,
    FIN = `/fin/v0.1`;
const dark = `?$count=true`
const httpServer = {

    //查询企业详情
    getCompanyDetail: id => `${FIN}/search/company/simple/${id}`,

    //登录相关
    login: {
        getTokens: `${UC}/tokens`, //登录前获取token
        getUserInfo: userId => `${UC}/users/${userId}/detail`, //请求用户信息
        getUserPer: `${UC}/privileges/user/my`, //请求用户信息
        getAllUserList: `${UC}/users/org/my` //查询所有用户信息
    },
    //用户管理
    userManage: {
        getDepartments: `${UC}/departments/tree`, //获取部门树
        addDepartments: `${UC}/departments`, //新增部门
        editDepartments: dept_id => `${UC}/departments/${dept_id}`, //编辑部门 、 删除部门
        getUserList: `${UC}/users` + dark, //获取用户列表
        lockUser: user_id => `${UC}/users/lock/${user_id}`, //禁用用户
        enableUser: user_id => `${UC}/users/enable/${user_id}`, //启用用户
        getUserDetail: user_id => `${UC}/users/${user_id}/detail`, //查询单条用户详情
        editUser: user_id => `${UC}/users/${user_id}`, //编辑用户
        addUser: `${UC}/users`, //编辑用户
    },
    // 企业搜索
    companySearch: {
        getCompanyDetailUrl: id => `${FIN}/search/company/report/${id}` // 企业详情
    },
    //系统设置
    systemManage: {
        //7+4 监管类型
        getRegulationList: `${FIN}/regulation${dark}`, //获取监管类型列表  7+4  --- 分页
        getAllRegulationList: `${FIN}/regulation/list`, //全量获取监管类型列表  --- 不分页
        addRegulation: `${FIN}/regulation`, //新增监管类型
        editRegulation: id => `${FIN}/regulation/${id}`, //编辑监管类型  put:编辑   del:弃用
        replayRegulation: id => `${FIN}/regulation/replay/${id}`, //重启监管类型
        //变更类型
        getUpdateTypeList: `${FIN}/change/type${dark}`, //获取变更类型列表
        editUpdateType: id => `${FIN}/change/type/${id}`, //修改变更类型 put:修改  del: 弃用
        addUpdateType: `${FIN}/change/type`, //新增变更类型
        replayUpdateType: id => `${FIN}/change/type/reply/${id}`, //重启变更类型
        // 风险级别
        getRiskLevelList: `${FIN}/risk${dark}`, //获取风险级别列表
        addRiskLevel: `${FIN}/risk`, //获取风险级别列表
        getRiskLevelSelectList: `${FIN}/risk/list`, //获取风险级别列表,未分页
        riskTools: id => `${FIN}/risk/${id}`, //  get 获取单条风险级别信息 ； put 修改  ； delete 禁用
        replyRisk: id => `${FIN}/risk/reply/${id}`, //重启风险级别
        // 街区管理
        getStreetList: `${FIN}/street${dark}`, //获取街区列表信息 --- 分页
        getAllStreetList: `${FIN}/street/list`, //全量获取街区列表信息
        addStreet: `${FIN}/street`, //新增街道信息
        streetTools: id => `${FIN}/street/${id}`, //put 编辑 ，delete 禁用
        replyStreet: id => `${FIN}/street/reply/${id}`, //重启街道
        // 监管企业
        getCompanyList: `${FIN}/monitor/record${dark}`, //获取监管企业列表
        reStartCompany: `${FIN}/monitor/record/restart`, //重启监控选中的企业
        stoPCompany: `${FIN}/monitor/record/stop`, //暂停监控选中的企业
        addMonitorCompany: `${FIN}/monitor/record`, //新增监管企业
        removeMonitorCompany: `${FIN}/monitor/record/remove`, //移除监管企业
        editMonitorCompany: id => `${FIN}/monitor/record/${id}`, //修改监管企业
        getCompanyName: name => `${FIN}/search/company/name?name=${encodeURI(name)}`, //模糊查询企业


    },
    // 风险预警
    riskCompany: {
        getRiskCompanyList: `${FIN}/risks/warning${dark}`, //获取风险企业排行列表
        getFollowCompanyList: `${FIN}/risks/warning/worth/attention${dark}`, // 获取值得关注企业列表
        handleCompany: id => `${FIN}/risks/warning/${id}`, //新增处理风险排行数据
        trackCompany: id => `${FIN}/risks/warning/attention/${id}`, // 追踪企业
        cancelTrackCompany: ent_id => `${FIN}/risks/warning/remove/${ent_id}`, // 取消追踪企业
        getClueList: `${FIN}/clue${dark}`, // 移交线索列表
        addClue: `${FIN}/clue`, // 新增移交线索
        updateClue: id => `${FIN}/clue/${id}` // 修改移交线索
    },
    //金融监管
    financial: {
        // 工商变更
        getIndustryList: `${FIN}/change/record${dark}`, //查询所有工商变更信息
        addChange: `${FIN}/change/record`, //新增变更信息
        delayReminder: id => `${FIN}/change/record/delay/${id}`,
        closeChange: id => `${FIN}/change/record/close/${id}`, //关闭提醒
        localChange: id => `${FIN}/change/record/list/${id}${dark}`, //获取本地企业变更记录
        companyChange: id => `${FIN}/search/company/change/${id}${dark}`, //企业信息工商总局变更
        monitorFile: id => `${FIN}/report/common/file/list/${id}`, //监管汇报文件列表
        managefund: id => `${FIN}/report/common/fund/list/${id}`, //监管汇报文件列表
        manageCompanyByPeriod: id => `${FIN}/report/fund/period/${id}`, //监管汇报文件列表
        manageCompanyByYear: id => `${FIN}/report/fund/year/${id}`, //监管汇报年度汇总文件列表
        loanIndustryByPeriod: id => `${FIN}/report/loan/period/${id}`, //小贷行业汇报文件列表
        loanIndustryByYear: id => `${FIN}/report/loan/year/${id}` //小贷行业-年度汇总报告
    },
    //文件服务器
    file: {
        policy: `${FIN}/oss/policy`
    }
}
export default httpServer