import React from "react";
import { Layout, Menu, Button, Row, Col, Select, Carousel, BackTop, Avatar, Input, Space, message } from "antd";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LoginOutlined, GithubOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import axios from "axios";
const logUrl = "http://8.130.103.49:3001/log";
const { Option } = Select
export default class Register extends React.Component {
  state = {
    phone: '',
    password: '',
    UserName: '',
    ID: 'user'
  }
  componentDidMount() {
    axios.get(logUrl).then(res => {
      const { phone, password } = this.state
      let data = res.data
      data = data.reverse()
      this.setState({ UserName: data[0].UserName })
    })
  }
  render() {
    return (
      <div style={{ 'marginTop': '5%' }}>
        <Avatar src="https://joeschmoe.io/api/v1/andy" size="large" icon={<GithubOutlined />} style={{ top: '5%', left: '5%' }} />
        <div style={{ fontSize: "24px", marginTop: '10%', marginLeft: '5%' }}>
          <h1>欢迎回来,</h1>
          <h1>{this.state.UserName}</h1>
        </div>
        <Space direction="vertical">
          <div className={'log-input-group'}>
            <div>手机号:</div>
            <br />
            <Input id="phone" placeholder="输入手机号" onChange={this.changePhone} />
          </div>
          <div className={'log-input-group'}>
            <div>密码:</div>
            <br />
            <Input.Password id="password" placeholder="输入密码" onChange={this.changePassword} />
          </div>
        </Space>
        <Row style={{ marginTop: '8%', marginLeft: '4%' }}>
          <Col span={6}>
            <Button id="log"
              onClick={this.log}
              icon={<LoginOutlined />}
              type="primary"
              shape="round"
              size={"large"}
            >
              {"登录"}
            </Button>
          </Col>
          <Col span={6} style={{ textAlign: 'center', marginTop: '4%' }}>
            <Select style={{ width: '120px', height: '100%' }} defaultValue={'user'} size={'large'} onChange={this.changeID}>
              <Option key="user">普通用户</Option>
              <Option key="manager">管理员</Option>
            </Select>
          </Col>
        </Row>
      </div >
    )
  }
  changeID = (e) => {
    // console.log(e)
    this.setState({ ID: e })
  }
  log = () => {
    const { ID, phone, password } = this.state
    if (ID === 'user') {
      axios.get(logUrl).then(res => {
        const data = res.data
        let flag = false;
        for (let i = 0; i < data.length; i++) {
          const d = data[i]
          if (d.UserPassword === password && d.UserPhone === phone) {
            message.success("登录成功");
            flag = true
            this.props.callback({ current: 'home' })
            break
          }
        }
        if (flag === false) message.error("手机号或密码错误")
      })
    } else {
      if (phone === '15381077018' && password === 'LSY94889165') {
        message.success("管理员登录成功");
        this.props.callback({ current: 'administrator' })
      }
    }
  }
  changePhone = (e) => {
    this.setState({ phone: e.target.value })
  }
  changePassword = (e) => {
    this.setState({ password: e.target.value })
  }
}