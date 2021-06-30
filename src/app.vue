<template>
    <a-config-provider :locale="locale">
        <div id="zs_app">
            <Login v-if="isLogin"/>
            <router-view v-else-if="isParent" :key="key"/>
            <PageLayout v-else />
        </div>
    </a-config-provider>
</template>
<script>
    import zhCN from 'ant-design-vue/es/locale/zh_CN';
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    moment.locale('en');
    import './common.less';
    import Login from '@pages/login'
    import PageLayout from '@components/layout'
    export default {
        name: 'App',
        data(){
            return {
                locale:zhCN
            }
        },
        components:{
            Login,
            PageLayout
        },
        computed: {
            isLogin: function() {
                return this.$route.path === '/login'
            },
            key() {
                return this.$route.fullPath
            },
            isParent(){
                return window.__POWERED_BY_QIANKUN__
            }
        },
    }
</script>
