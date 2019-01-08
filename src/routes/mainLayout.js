import React from 'react'
import util from '../utils/util'
import PropTypes from 'prop-types';
import './mainLayout.less'
import { Layout, Menu, Icon, Dropdown,Breadcrumb } from 'antd';
const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

const menu = (
    <Menu>
	    <Menu.Item>
	      <a rel="noopener noreferrer" href="javascript:;">修改密码</a>
	    </Menu.Item>
	    <Menu.Item>
	      <a rel="noopener noreferrer" href="javascript:;">退出</a>
	    </Menu.Item>
    </Menu>
);
export default class MainLayout extends React.Component {
	constructor(props) {
		super(props);
	} 
    
    componentWillMount(){
    	let nickName = localStorage.getItem('nickName');
        this.setState({nickName:nickName});   
    }
    
	static contextTypes = {
		router: PropTypes.object.isRequired,
	}

	rootSubmenuKeys = ['authorization', 'custom','insuranceManage','agreement','businessManage'];
	state = {
		openKeys: [],
		nickName: '',
		myPath: []
	};
	onOpenChange = (openKeys) => {
		const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
		if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.setState({
				openKeys
			});
		} else {
			this.setState({
				openKeys: latestOpenKey ? [latestOpenKey] : [],
			});
		}
	}
	handleClick = (item)=>{
		this.setState({
			myPath:[]
		});
		let keyPath = item.keyPath;
		let arr = [];
		if(keyPath[1]){
			arr = arr.concat([util.getBreadTitle(keyPath[1]),util.getBreadTitle(keyPath[0])]);
		}else{
			arr.push(util.getBreadTitle(keyPath[0]));
		}
		this.setState({
			myPath:arr
		});
		let path = keyPath[1]?`/${keyPath[1]}/${keyPath[0]}`:`/${keyPath[0]}`;
        this.context.router.history.push(path);
	}
    render() {
        return (
            <div>
                <Header className="header">
                    <div className="mainlayout-top">
	                    <span className="left">蘑菇云保后台管理系统</span>
						<span className="right">
							<Dropdown overlay={menu}>
								<a className="ant-dropdown-link" href="#">
								    {this.state.nickName} <Icon type="down" />
								</a>
							</Dropdown>
				        </span> 
			        </div> 
				</Header>
                <Layout>
	                <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
	                    <div className="logo" />
	                         <Menu theme="dark"  mode="inline" openKeys={this.state.openKeys} defaultSelectedKeys={['Home']} onOpenChange={this.onOpenChange} style={{ width: 256 }} onClick={this.handleClick}>
					            <Menu.Item key="home">
						          <Icon type="home" />
						          <span className="nav-text">主页</span>
						        </Menu.Item>
					            <SubMenu key="authorization" title={<span><Icon type="setting" /><span>权限管理</span></span>}>
						            <Menu.Item key="adminList">管理员列表</Menu.Item>
						            <Menu.Item key="menuManage">菜单管理</Menu.Item>
						            <Menu.Item key="roleManage">角色管理</Menu.Item>
						            <Menu.Item key="apiList">接口权限列表</Menu.Item>
                                </SubMenu>
						        <SubMenu key="custom" title={<span><Icon type="user" /><span>用户管理</span></span>}>
						            <Menu.Item key="customList">用户列表</Menu.Item>
						            <Menu.Item key="salesMenList">业务员列表</Menu.Item>
                                </SubMenu>
                                <SubMenu key="insuranceManage" title={<span><Icon type="file-text" /><span>资料管理</span></span>}>
						            <Menu.Item key="rejectList">拒绝列表</Menu.Item>
						            <Menu.Item key="auditInsurance">待审核列表</Menu.Item>
						            <Menu.Item key="treatInsurance">待录入列表</Menu.Item>
                                </SubMenu>
                                <SubMenu key="agreement" title={<span><Icon type="folder-open" /><span>合同管理</span></span>}>
						            <Menu.Item key="lifeAgreementList">寿险合同列表</Menu.Item>
						            <Menu.Item key="carAgreementList">车险合同列表</Menu.Item>
                                </SubMenu>
                                <SubMenu key="businessManage" title={<span><Icon type="reconciliation" /><span>运营管理</span></span>}>
						            <Menu.Item key="customFeedback">用户反馈</Menu.Item>
                                </SubMenu>
					        </Menu>
	                </Sider>
				    <Layout style={{ marginLeft: 200 }}>
			            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
			                <div style={{ padding: '35px 50px', background: '#fff', textAlign: 'center' }}>
			                    <Breadcrumb style={{marginBottom:20,textAlign:'left'}}>
								    {this.state.myPath.map((item,index)=>{
                                        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
								    })}
                                </Breadcrumb>
                    			{this.props.children}
                            </div>
			            </Content>
			            <Footer style={{ textAlign: 'center' }}>
				            Ant Design ©2018 Created by Ant UED
				        </Footer>
			        </Layout>
                </Layout>   
            </div>
        );
    }
}


