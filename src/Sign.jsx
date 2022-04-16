import React from "react";
import { Layout, Menu, Button, Carousel, BackTop, Avatar, Input, Space, message } from "antd";
import { UserOutlined, TagOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import axios from "axios";
const signUrl = "http://8.130.103.49:3001/sign";

export default class Register extends React.Component {
  state = {
    name: 'songsong',
    phone: '15381077018',
    password: ''
  }
  render() {
    const { name, phone, password } = this.state
    return (
      <div style={{ 'marginTop': '5%' }}>
        <Avatar size="large" icon={<UserOutlined />} style={{ top: '5%', left: '5%' }} />
        <div style={{ fontSize: "24px", marginTop: '5%', marginLeft: '5%' }}>
          <h1>你好，新用户</h1>
          <h1>一起加入我们吧</h1>
        </div>
        <Space direction="vertical">
          <div className={'sign-input-group'}>
            <div>用户名:</div>
            <br />
            <Input id="userName" placeholder="输入用户名" onChange={this.changeName} />
          </div>
          <div className={'sign-input-group'}>
            <div>手机号:</div>
            <br />
            <Input id="phone" placeholder="输入手机号" onChange={this.changePhone} />
          </div>
          <div className={'sign-input-group'}>
            <div>创建密码:</div>
            <br />
            <Input.Password id="password" placeholder="输入密码" onChange={this.changePassword} />
          </div>
        </Space>
        <Button id="sign"
          onClick={this.sign}
          icon={<TagOutlined />}
          type="primary"
          shape="round"
          size={"large"}
        >
          {"注册"}
        </Button>
      </div>
    )
  }
  sign = () => {
    const { name, passsword, phone } = this.state
    axios
      .post(signUrl, {
        UserName: name,
        UserPassword: passsword,
        UserPhone: phone,
        UserClass: '会员',
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err.response);
      });
    message.success("注册成功!")
  }
  changeName = (e) => {
    this.setState({ name: e.target.value })
  }
  changePassword = (e) => {
    this.setState({ passsword: e.target.value })
  }
  changePhone = (e) => {
    this.setState({ phone: e.target.value })
  }
}