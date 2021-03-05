/**
 *
 * @author 谭邻宣
 * @date 2021/3/5 16:16
 **/
const pageRouter=[
    {
        title:'风险企业', //页面名称
        isMenu:true,  // 是否渲染进导航栏
        component: () => import('@pages/page2'), // 引用 component
        name:'index', // 与对应的component name名称保持一致 ，否则无法开启 页面缓存
        path:'/index'  //路径
    }
]
export default pageRouter