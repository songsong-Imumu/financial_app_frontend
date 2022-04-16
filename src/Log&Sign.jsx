import React from "react";
import { Layout, Menu, Button, Carousel, BackTop, Avatar, Input, Space } from "antd";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LoginOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

import Log from './Log'
import Sign from './Sign'
export default class LogSign extends React.Component {
  state = {
    Tab: '登录'
  }
  render() {
    const { Content, Footer } = Layout;
    const pageStyle = {
      position: 'absolute',
      borderRadius: '35px',
      width: '40%', height: '85%',
      left: '30%'
    }
    return (
      <Layout>
        <Content
          className="site-layout"
          style={{ padding: "25px 25px", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24, minHeight: 900, background: '#edc0bf',
              background: 'linear-gradient(90deg, #edc0bf 0,#c4caef 58%)'
            }}
          >
            <div id="page" style={pageStyle}>
              <Menu id="LogorSign" mode="horizontal"
                onClick={this.ItemClick}
                defaultSelectedKeys={["登录"]}
                style={{ backgroundColor: "rgba(0,0,0,0)", marginRight: '10%', marginTop: '5%' }}>
                <Menu.Item key="登录">
                  登录
                </Menu.Item>
                <Menu.Item key="注册" >
                  注册
                </Menu.Item>
              </Menu>
              {this.state.Tab === '登录' ?
                <Log callback={this.getTab} /> :
                <Sign callback={this.getTab} />}
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Financial App ©2021 Created by Group - One Hundred Kilos
        </Footer>
      </Layout >
    )
  }
  ItemClick = e => {
    // 将要跳转的页面 登录或注册
    const item = e.key
    this.setState({ Tab: item })
    // this.props.callback({ Tab: item })
  }
  getTab = d => {
    const { current } = d
    this.props.callback({ current: current })
  }
}