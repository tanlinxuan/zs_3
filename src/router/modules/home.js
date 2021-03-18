/**
 *
 * @author 谭邻宣
 * @date 2021/3/5 16:16
 **/
const pageRouter=[
    {
        path: '/',
        name:'home',
        component: () => import('@pages/home'),
        meta: { title: '首页', affix: true },
    }
]
export default pageRouter