<script type="text/jsx">
    import zhCN from 'ant-design-vue/es/locale/zh_CN';
    import LoginForm from './form'
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    moment.locale('en');
    import '@src/less/common.less'
    export default {
        name: 'Login',
        data(){
            return {
                locale:zhCN
            }
        },
        render(createElement, context) {
            return (
                <a-config-provider locale={this.locale}>
                    <div id="app">
                       <LoginForm/>
                    </div>
                </a-config-provider>
            )
        }
    }
</script>
