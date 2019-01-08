import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import request from '../../axiosConfig/axiosConfig';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.less'

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
                request({method:'post',url:'/fx?api=gate.auth.login',data:values}).then((res)=>{
                    if(res && res!=500){
                        localStorage.setItem('nickName', res.name);
                        this.props.dispatch(routerRedux.push({pathname:'/welcome'}));
                    }
                });
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div id="login">
			    <div style={{fontSize:'36px',color:'#346FD0',fontWeight:'bold',lineHeight:'100px',paddingLeft:'60px'}}>蘑菇保后台登录系统</div>
				<div className="login-content">
					<div className="login-bg"><img src="https://jinchan-ctt.oss-cn-hangzhou.aliyuncs.com/images/login_bg_img.png" alt=""/></div>
					<div className="logo-box">
					    <div style={{fontSize:'28px',textAlign:'center',lineHeight:'60px',paddingBottom:'40px'}}>登录</div>
					    <Form onSubmit={this.handleSubmit} className="login-form">
					        <Form.Item>
					          {getFieldDecorator('mobile', {
					            rules: [{ required: true, message: '用户名不能为空' }],
					          })(
					            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
					          )}
					        </Form.Item>
					        <Form.Item>
					          {getFieldDecorator('passwd', {
					            rules: [{ required: true, message: '密码不能为空' }],
					          })(
					            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
					          )}
					        </Form.Item>
					        <Form.Item>
					          <Button type="primary" htmlType="submit" className="login-form-button log-btn">登录</Button>
					        </Form.Item>
	                    </Form>
			        </div>
			    </div>    
            </div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		login: state.loginState
	};
}

const WrappedLoginForm = Form.create()(LoginForm);

export default connect(mapStateToProps)(WrappedLoginForm);