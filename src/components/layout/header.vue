<script type="text/jsx">
    import Menu from "./menu";
    export default {
        name: 'PageHeader',
        components:{
            Menu
        },
        data() {
            return {
                popoverShow: false,
                themePopoverShow: false,
            };
        },
        methods: {
            setPopoverShow() {
                this.popoverShow = !this.popoverShow
            },
            exit(){
                let that = this;
                that.$store.dispatch('user/userExit',{}).then(()=>{
                    const origin = window.location.origin
                    const loginUrl = origin +'/login.html';
                    window.open(loginUrl)
                })
            }
        },
        render() {
            const {userInfo} = this.$store.getters
            return (
                <div class="app-header">
                    <div class="logo"></div>
                    <div class="menu-box">
                        <Menu/>
                    </div>
                    <div class="user-info">
                        <ul>
                            <li class="user" title={userInfo.user_name}>
                                <a-popover visible={this.popoverShow}
                                           getPopupContainer={triggerNode => triggerNode.parentNode}>
                                    <template slot="content">
                                        <p>个人资料</p>
                                        <p>修改密码</p>
                                        <p onClick={()=>{this.exit()}}>退出登录</p>
                                    </template>
                                    <span onClick={this.setPopoverShow}>
                                       {userInfo.user_name}
                                        <a-icon type={this.popoverShow ? 'caret-up': 'caret-down'  }></a-icon>
                                    </span>
                                </a-popover>
                            </li>
                            <li title='消息' style={{fontSize:'18px'}}><a-icon type="message" /></li>
                        </ul>
                    </div>
                </div>
            )
        }
    }
</script>