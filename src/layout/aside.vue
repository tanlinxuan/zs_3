<script type="text/jsx">
    import pageRouter from '@router/router'
    export default {
        name:'Aside',
        data() {
            return {
                isCollapse: false,
                menuData:[...pageRouter],
                openMenu: [], //左侧打开菜单的key
            };
        },
        computed: {
            checkedMenu() {
                return this.$store.state.tagViews.activeView
            }
        },
        watch: {
            checkedMenu(newVal, oldVal) {
                let menuKey = newVal.path.split('/');
                    menuKey.shift();
                    if(this.openMenu.indexOf(menuKey[0]) < 0 ){
                        this.openMenu.push(menuKey[0])
                    }
            }
        },
        created(){
            // this.openMenu = this.menuData.map(item=>{
            //     let { children ,name} = item;
            //     if (children && children.length) {return name}
            // })
        },
        methods: {
            handSelect(path){
                this.$router.replace({ path:path})
            },
            onOpenChange(key, keyPath) {
                this.openMenu = key;
            },
            renderMenu(data){ //递归返回菜单列表
                return data.map(item => {
                    let { children ,name ,title ,isMenu,icon} = item;
                    if (children && children.length) {
                        return (
                            <a-sub-menu key={name}>
                                    <span slot="title">
                                        {
                                            icon && <a-icon type={icon}/>
                                        }
                                        <span style={{marginLeft:!icon?'23px':'0px'}}>{title}</span>
                                    </span>
                                {
                                    this.renderMenu(children)
                                }
                            </a-sub-menu>
                        )
                    } else {
                        return (
                            isMenu &&
                            <a-menu-item key={name} onClick={()=>this.handSelect(item.path)} >
                                {
                                    icon && <a-icon type={icon}/>
                                }
                                <span style={{marginLeft:!icon?'23px':'0px'}}>{title}</span>
                            </a-menu-item>)
                    }
                })
            }
        },
        render(){
            return(
                <div class="app-aside">
                    <a-menu
                    mode="inline" 
                    selectedKeys={[this.checkedMenu.name]} 
                    onOpenChange={this.onOpenChange}
                    openKeys={this.openMenu}
                    >
                        <a-menu-item key="home" onClick={()=>this.handSelect('/home')}>
                            <a-icon type="pie-chart" />
                            <span>工作台</span>
                        </a-menu-item>
                        {
                            this.renderMenu(this.menuData)
                        }
                    </a-menu>
                </div>
            )
        }
    }
</script>