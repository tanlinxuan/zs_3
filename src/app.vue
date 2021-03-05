<template>
    <a-config-provider :locale="locale">
        <div id="app" class="blue">
            <router-view/>
        </div>
    </a-config-provider>
</template>
<script>
    import zhCN from 'ant-design-vue/es/locale/zh_CN';
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    moment.locale('en');
    import '@src/less/common.less'
    export default {
        name: 'App',
        data(){
            return {
                locale:zhCN
            }
        }
    }
</script>
