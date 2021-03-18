/**
 *
 * @author 谭邻宣
 * @date 2021/3/5 16:16
 **/
const pageRouter=[
    {
        path: '/',
        component: () => import('@pages/page1'),
        redirect: '/index',
        meta: { title: '产业全景'},
        isMenu:true,  //控制是否加入菜单栏
        children:[
            {
                path: 'index',
                name: 'index',
                component: () => import('@pages/page1/common'),
                isMenu:true,  //控制是否加入菜单栏
                meta: { title: '产业链全景', affix: true }
            },
            {
                path: 'detail',
                name:'detail',
                component: () => import('@pages/page1/detail'),
                isMenu:true,  //控制是否加入菜单栏
                meta: { title: '招商地图', affix: true },
            }
        ]
    }
]
export default pageRouter