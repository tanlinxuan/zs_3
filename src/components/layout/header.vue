<script type="text/jsx">
    export default {
        name: 'PageHeader',
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
            setThemePopoverShow(type){
                this.themePopoverShow = type
            },
            checkTheme(type){
                document.getElementById('app').className = '';
                document.getElementById('app').classList.add(type);
                this.themePopoverShow = false
            },
            exit(){
                let that = this;
                that.$store.dispatch('user/userExit',{}).then(()=>{
                    that.$router.replace({ path:'/login'})
                })
            }
        },
        render() {
            const {userInfo} = this.$store.getters
            return (
                <div class="app-header">
                    <div class="logo"></div>
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
                            <li title='设置' style={{fontSize:'18px'}}>
                                <a-popover visible={this.themePopoverShow}
                                           getPopupContainer={triggerNode => triggerNode.parentNode}>
                                    <template slot="content">
                                        <p onClick={()=>this.checkTheme('green')}>风格1</p>
                                        <p onClick={()=>this.checkTheme('blue')}>风格2</p>
                                    </template>
                                    <a-icon type="setting" onClick={this.setThemePopoverShow}/>
                                </a-popover>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
    }
</script>