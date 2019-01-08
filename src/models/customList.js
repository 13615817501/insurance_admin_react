import * as  ajax from '../services/custom/customList';

export default {
    namespace: 'customList',
    state: {
        data: ''   //reducers中接收数据
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line

        },
    },

    effects: {
        *getInitialList({ payload }, { call, put }) {  // eslint-disable-line
            const result = yield call(ajax.getInitialList);
            if(result){
                yield put({
                    type: 'save',
                    payload: {
                        data: result.data //网络返回的要保留的数据
                    }
                });
            }
        },
    },

    reducers: {
        save(state, { payload: { data } }) {
            return {
                ...state, 
                data: data  
            };
        }
    }
};
