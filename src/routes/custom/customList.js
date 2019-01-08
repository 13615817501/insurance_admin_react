import React from 'react';
import { connect } from 'dva';
import { Table,Input,Button } from 'antd';
import './customList.less'
import request from '../../axiosConfig/axiosConfig';


const columns = [{
	title: 'ID',
	dataIndex: 'id',
	key: 'id'
}, {
	title: '用户手机号',
	dataIndex: 'mobile',
	key: 'mobile'
}, {
	title: '用户昵称',
	dataIndex: 'nickName',
	key: 'nickName'
}, {
	title: '头像',
	key: 'icon',
	dataIndex: 'icon',
	render: (icon) => (
		<span>
		    <img src={icon} alt="头像" style={{width:'50px',height:'50px',verticalAlign:'middle',margin:'5px auto',cursor:"pointer"}}/>
		</span>
	)
}, {
	title: '注册时间',
	dataIndex: 'createTime',
	key: 'createTime'
}];

class customList extends React.Component {
	constructor(props) {
		super(props);
	}
    componentWillMount(){
		this.ajaxFun();
    }
    
    state = {
        certifyList: [],
        totalCount: 0,
        search:{
        	nickName: '',
        	mobile: '',
        	pageNum: 1
        }        
    }
	
    ajaxFun = (params)=>{
        request({method: 'get',url: '/fx?api=gate.user.userList',params: params}).then((res) => {
			if (res && res !== 500) {
				let lists = res.list.map((item)=>{
                    item.key = item.id;
                    return item;
				})
				this.setState({certifyList:lists});
				this.setState({totalCount:res.page.totalCount});
				this.setState({search:{pageNum:res.page.currentPage}});
			}
		});    
    }

    handleChange = (params)=>{
    	let event = event || window.event;
    	let data = '';
    	console.log(this.state.search);
    	if(params=='昵称'){
            data = Object.assign({}, this.state.search, { nickName: event.target.value });
    	}else{
    		data = Object.assign({}, this.state.search, { mobile: event.target.value });
    	}
        this.setState({search: data});
    }

    searchFun = (params)=>{
        console.log(params);
    }

	render() {
		const { search,mobile } = this.state;
		return (
			<div>
			    <div style={{textAlign:'left',margin: '30px 0 20px'}}>
	            	<span>昵称：</span><Input className="common_width"  value={search.nickName}  placeholder="请输入昵称" onChange={()=>this.handleChange('昵称')}/>
	            	<span>&nbsp;&nbsp;&nbsp;手机号：</span><Input className="common_width" value={search.mobile} placeholder="请输入手机号" onChange={()=>this.handleChange('手机')}/>
	            	<Button icon="search"  type="primary" className="serch-btn" onClick={()=>this.searchFun(this.state.search)}>搜索</Button>
                </div>
			    { <Table columns={columns} bordered dataSource={this.state.certifyList} /> }
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.data
	};
}
export default connect(mapStateToProps)(customList);
 