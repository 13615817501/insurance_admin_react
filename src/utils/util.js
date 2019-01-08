let util = {
    getApiString(url){
        return url.slice(url.indexOf('=')+1);
    },
    getBreadTitle(name){
        switch (name) {
        	case 'home':
        		return '主页';
        		break;
        	case 'authorization':
        		return '权限管理';
        		break;
        	case 'custom':
        		return '用户管理';
        		break;
        	case 'insuranceManage':
        		return '资料管理';
        		break;
        	case 'agreement':
        		return '合同管理';
        		break;	
        	case 'businessManage':
        		return '运营管理';
        		break;	
        	case 'adminList':
        		return '管理员列表';
        		break;
        	case 'menuManage':
        		return '菜单管理';
        		break;
        	case 'roleManage':
        		return '角色管理';
        		break;
        	case 'apiList':
        		return '接口权限列表';
        		break;		
        	case 'customList':
        		return '用户列表';
        		break;
        	case 'salesMenList':
        		return '业务员列表';
        		break;
        	case 'rejectList':
        		return '拒绝列表';
        		break;	
        	case 'auditInsurance':
        		return '待审核列表';
        		break;
        	case 'treatInsurance':
        		return '待录入列表';
        		break;
        	case 'lifeAgreementList':
        		return '寿险合同列表';
        		break;
        	case 'carAgreementList':
        		return '车险合同列表';
        		break;
        	case 'auditInsurance':
        		return '待审核列表';
        		break;	
        	case 'customFeedback':
        		return '用户反馈';
        		break;											
        	default:
        		return '主页';
        		break;
        }
    },
}

export default util;