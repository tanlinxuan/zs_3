<template>
    <a-config-provider :locale="locale">
        <div id="app" class="blue">
            <PageLayout/>
        </div>
    </a-config-provider>
</template>
<script>
    import PageLayout from  '@src/layout'
    import zhCN from 'ant-design-vue/es/locale/zh_CN';
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    moment.locale('en');
    import '@src/less/common.less'
    export default {
        name: 'App',
        components:{
            PageLayout
        },
        data(){
            return {
                locale:zhCN
            }
        }
    }
</script>
