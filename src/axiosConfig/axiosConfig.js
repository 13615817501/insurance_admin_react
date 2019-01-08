import axios from 'axios'
import { routerRedux } from 'dva/router'
import store from '../index';
import qs from 'qs'
import xss from 'xss'
import util from '../utils/util'
import { message } from 'antd'

axios.defaults.baseURL = 'http://apipre.jinchan.link:8389';
// axios.defaults.baseURL = 'http://api.jinchan.link';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // post请求时候统一设置的头部
axios.defaults.timeout = 20000;// 统一的全局参数配置

axios.interceptors.request.use((request) => {
    let apiUrl = util.getApiString(request.url);
    let mat ;
    if(apiUrl=='gate.auth.login'){
        mat = 'inm'
    }else{
        mat = localStorage.getItem('mat')?localStorage.getItem('mat'):'inm';
    }
    let formData = {
        api: apiUrl,
        v: '1.0',
        ttid: '1002',
        did: '1',
        ts: '1480929340486',
        lng: '39.98871',
        lat: '116.43234',
        mat: mat,
        sign: 'inm',
    };
    if (request.method == 'post') {
        if(request.data){
            let cloneData = {...request.data}; //拷贝一个对象，防止影响原对象
            for (let key in cloneData) { // 统一过滤 XSS
                cloneData[key] = xss(cloneData[key]);
            }
            formData.data = encodeURIComponent(JSON.stringify(cloneData));    
        }
        request.data = qs.stringify(formData);
    }
    if (request.method == 'get') {
        let cloneData = {...request.params}; //拷贝一个对象，防止影响原对象
        if(request.params){
            formData.data = encodeURIComponent(JSON.stringify(cloneData));
        }
        request.params = { ...formData, stamp: new Date().getTime()};
    }
    // ie cache策略
    return request;
})

axios.interceptors.response.use(function (res) {
    switch (res.data.response.code) {
        case 0: //请求成功
            localStorage.setItem('mat',res.data.meta.mat);
            return res.data.response.data;
            break;
        case 129: // access_token过期
            localStorage.clear();
            store.dispatch(routerRedux.push({pathname:'/login'}));
            break;
        default:
            message.error(res.data.response.msg);
            return 500;  //自定义逻辑错误码500
            break;
    }
}, function (err) {
    message.error('网络出错，请检查网络');
    return 500;  //自定义逻辑错误码500
})

export default function request (opt) {
    return axios(opt);
}
