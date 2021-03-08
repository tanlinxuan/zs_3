<script type="text/jsx">
    import './index.less'
    export default {
        name: 'LoginForm',
        data() {
            return {
                form: this.$form.createForm(this, { name: 'login' }),
                rememberPsw:false ,
                status:false ,
                showValidate: false
            };
        },
        components:{
            //  sliderValidate,
        },
        methods: {
            renderFormDom(fromArr){  // 通过配置文件 ，生成 表单项
                const {getFieldDecorator} = this.form;
                return fromArr.map(item=>{
                    let {label , options , code , child ,type} = item
                    return(
                        <a-form-item>
                            {
                                getFieldDecorator(code,{...options})(
                                    <a-input type={type} placeholder={`请输入`+label} >
                                        {child}
                                    </a-input>
                                )
                            }
                        </a-form-item>
                    )
                })
            },
            handleSubmit(e) { // 提交
                let that = this;
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    let {rememberPsw} = that;
                    if (!err) {
                        values.rememberPsw =  rememberPsw
                        that.$store.dispatch('user/userLogin',values).then((res)=>{
                            that.$router.replace({ path:'/home' })
                        })
                    }
                });
            },
            //记住密码
            handleChange(e) {
                this.rememberPsw = e.target.checked;
            },
            /***
             *  滑块验证回调
             * @param status  true : 成功  ， false: 失败
             */
            sliderValidate(status){
                this.status = status
            },
        },
        render() {
            const fromArr=[ //表单项配置
                {
                    label:'账户名称',
                    type:'text',
                    code: 'login_name',
                    options:{
                        rules: [{ required: true, message: '请输入用户名' }]
                    },
                    child:[<a-icon slot="prefix" type="user"/>]
                },
                {
                    label:'密码',
                    type:'password',
                    code: 'password',
                    options:{
                        rules: [{ required: true, message: '请输入密码' }]
                    },
                    child:[<a-icon slot="prefix" type="lock"/>]
                }
            ] ;
            return(
                <div id="login_page">
                    <a-row class="login-content">
                        <a-col span={12} class="login-information">
                            <div class="name">
                                <span style={{fontSize:'.34rem'}}>两江新区</span>
                                <span style={{fontSize:'.18rem'}}>金融监督管理系统</span>
                            </div>
                        </a-col>
                        <a-col span={12} class="login-form">
                            <div class="form-box">
                                <a-form id="loginFrom" autoComplete="off" form={this.from} onSubmit={e => this.handleSubmit(e)}
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                    {
                                        this.renderFormDom(fromArr)
                                    }
                                    <a-form-item>
                                        <a-checkbox checked={this.rememberPsw} on-change={this.handleChange}>
                                            记住密码
                                        </a-checkbox>
                                        <span style={{float:'right'}}>
                                            <span class="link">忘记密码</span>|
                                            <span class="link">注册</span>
                                        </span>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-button type="primary" html-type="submit" class="login-form-button">登录</a-button>
                                    </a-form-item>
                                </a-form>
                            </div>
                        </a-col>
                    </a-row>
                </div>)
        }
    }
</script>
