import md5 from 'md5';
import { notification } from 'antd';

const SALT = 'hjc718';

export function saltedPassword(password) {
  return md5(md5(password) + SALT); //hash密码
}

export function dueWithResponse(response, successText) {
  const data = response;
  if (data === undefined) {
    notification.error({
      message: `请求错误！请检查服务器是否出错或是否已经连接网络`,
      // description: data.result.description,
    });
  } else if (data.result === undefined || data.result.code === undefined) {
    notification.error({
      message: `请求错误！HTTP Response没有返回Result或者Result Code`,
      description: data.result.description,
    });
  } else if (data.result.code === 0) {
    if (successText !== undefined) {
      notification.success({
        message: `${successText}`,
      });
    }
    return true;
  } else if (data.result.code !== 0) {
    notification.error({
      message: `请求错误 ${data.result.code}: ${data.result.description}`,
      description: data.result.description,
    });
  }
  return false;
}