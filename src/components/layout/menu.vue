<script type="text/jsx">
    export default {
        name: "Menu",
        data(){
            return {
                menuList :[]
            }
        },
        created() {
          // this.getMenu()
        },
        methods:{
            getMenu(){
                // const modulesFiles = require.context('@router/modules', true, /\.js$/);
                // let menu = modulesFiles.keys().reduce((routers, modulePath) => {
                //     const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
                //     const value = modulesFiles(modulePath).default
                //     if(value.length && value[0].isMenu ){
                //         value[0].name = moduleName;
                //         routers.push(this.setMenuItem(value[0]))
                //     }
                //     return routers
                // },[])
                // this.menuList = menu
            },
            setMenuItem(menu,path){
                let basePath = !path ?`/${menu.name}.html#/`:`${path}${menu.name}/`
                let route = {
                    name:menu.name,
                    title:menu.meta.title,
                    path:basePath
                }
                if(menu?.children?.length){
                    route.children = menu.children.map(item=>{
                        if(item.isMenu){
                            return this.setMenuItem(item,route.path)
                        }
                    })
                }
                return route
            },

            goPage(path){
                const origin = window.location.origin
                window.open(origin+path)
            },

            renderMenuDom(){
                return this.menuList.map(item=>{
                    return <a-dropdown>
                        <span>{item.title}<a-icon type="down"/></span>
                        {
                            item?.children?.length?<a-menu slot="overlay">
                                {
                                    item.children.map(itm=>{
                                        return <a-menu-item>
                                            <span onClick={e=>{this.goPage(itm.path)}}>{itm.title}</span>
                                        </a-menu-item>
                                    })
                                }
                            </a-menu>:''
                        }
                    </a-dropdown>
                })
            }
        },
        render() {
            return(
                <div>

                </div>
            )

        }
    }
</script>