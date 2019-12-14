import React,{PureComponent} from 'react';
import './Login.css';
import { Icon, Button } from 'antd';
import ImageCode from '../utils/ImageCode';
// import {connect} from 'dva';
import {saltedPassword} from '../utils/utils';

// @connect(({login}) => ({
//   login
// }))
class Login extends PureComponent{

  state = {
    usn:"",
    pwd:"",
    usnIncorrect:false,
    pwdIncorrect:false,
    match:true,
    login:false,
    url:'https://05imgmini.eastday.com/mobile/20191129/20191129050027_6533871c389913b425b258a252735377_1.jpeg'
  }

  UNSAFE_componentWillMount = () =>{
  }

  UNSAFE_componentWillUpdate = () =>{
  }

  usernameChange = (e) =>{
    this.setState({usn:e.target.value});
  }

  passwordChange = (e) =>{
    this.setState({pwd:e.target.value});
  }

  handleLogin = (e) => {
    let {
      usn,
      pwd,
      match
    } = this.state;

    if(match){
      const {
        requestLogin,
        loginSuccess
      } = this.props;

      pwd = saltedPassword(pwd);
      requestLogin(usn,pwd).then(resp => {
        if(resp.result.code === 2002){
          this.setState({
            usnIncorrect: true,
            match:false
          });
        }
        else if(resp.result.code === 2003){
          this.setState({
            pwdIncorrect: true,
            match:false
          });
        }
        else{
          this.setState({
            usnIncorrect: false,
            pwdIncorrect: false,
            match:true
          });
          loginSuccess(resp.info.location);
        }
      });
    }
  }

  onReload = () => {
    this.setState({ url: 'https://05imgmini.eastday.com/mobile/20191129/20191129050027_6533871c389913b425b258a252735377_2.jpeg' })
  }
  render = () => {
    let {
      usn,
      pwd,
      usnIncorrect,
      pwdIncorrect,
      url
    } = this.state;

    let iconColor = "#666666";
    return (
      <div className="login-box">
				<div className="login-title">密码登录</div>
				<div className="login-in">
          <div className="login-in-box">
            <div className="login-in-row">
              <label className="login-icon" title="用户名">
                <Icon type="user" style={{color:iconColor}}/>
              </label>
              <input type="text" name="username" value={usn} onChange={this.usernameChange}/>
            </div>
            {usnIncorrect ? 
            <div className="login-error">账号不存在!</div>
            : ''}
          </div>
          <div className="login-in-box">
            <div className="login-in-row">
              <label className="login-icon" title="密码">
                <Icon type="lock" style={{color:iconColor}}/>
              </label>
              <input type="password" name="password" value={pwd} onChange={this.passwordChange}/>
            </div>
            {pwdIncorrect ? 
            <div className="login-error">密码错误!</div>
            : ''}
          </div>
          {usnIncorrect || pwdIncorrect ? 
            <ImageCode
            imageUrl={url}
            imageWidth={290}
            imageHeight={213}
            onReload={this.onReload}
            onMatch={() => {
              this.setState({
                match:true
              });
            }}
            onError = {
              () => {
                this.setState({
                  match:false
                });
              }
            }
            />
          : ''}
          </div>
        <div className="submit">
          <Button type="submit" onClick={this.handleLogin}>登录</Button>
        </div>
			</div>
    );
  }
}

export default Login;