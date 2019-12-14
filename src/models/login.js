import {login_get,login_req} from '../services/api';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    accessToken: undefined,
  },

  effects: {
    *fetchLogin({payload},{call,put}){
      const response = yield call(login_req,payload);
      return response;
    }
    ,
    *initLogin({payload},{call,put}){
      const response = yield call(login_get,payload);
      return response;
    }
  }
};