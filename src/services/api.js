import { stringify } from 'qs';
import request from '../utils/request';
import { async } from 'q';

const LOGIN_WEB = "http://login.hjc718.com:8080/login"; 

export async function login_get(params) {
  return request(LOGIN_WEB + "/login" ,{
    method:"GET",
    body:params
  })
}

export async function login_req(params) {
  return request(LOGIN_WEB + "/login" ,{
    method:"POST",
    body:params
  })
}