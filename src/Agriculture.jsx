import React from "react";
import { Layout, Menu, SubMenu, Button, Carousel, BackTop, Avatar, Input, Space, Row, Col, Modal, InputNumber, Rate, Radio } from "antd";
import { DollarCircleOutlined } from '@ant-design/icons'
import "antd/dist/antd.css";
import vege0 from './img/人们/2/农产品/蔬菜/vege0.png'
import vege1 from './img/人们/2/农产品/蔬菜/vege1.png'
import vege2 from './img/人们/2/农产品/蔬菜/vege2.png'
import vege3 from './img/人们/2/农产品/蔬菜/vege3.png'
import vege4 from './img/人们/2/农产品/蔬菜/vege4.png'
import vege5 from './img/人们/2/农产品/蔬菜/vege5.png'
import vege6 from './img/人们/2/农产品/蔬菜/vege6.png'
import vege7 from './img/人们/2/农产品/蔬菜/vege7.png'
import vege8 from './img/人们/2/农产品/蔬菜/vege8.png'
import vege9 from './img/人们/2/农产品/蔬菜/vege9.png'
import vege10 from './img/人们/2/农产品/蔬菜/vege10.png'
import vege11 from './img/人们/2/农产品/蔬菜/vege11.png'
// import vege12 from './img/人们/2/农产品/蔬菜/vege12.png'
// import vege13 from './img/人们/2/农产品/蔬菜/vege13.png'
// import vege14 from './img/人们/2/农产品/蔬菜/vege14.png'
// import vege15 from './img/人们/2/农产品/蔬菜/vege15.png'

import fruit0 from './img/人们/2/农产品/水果/fruit0.png'
import fruit1 from './img/人们/2/农产品/水果/fruit1.png'
import fruit2 from './img/人们/2/农产品/水果/fruit2.png'
import fruit3 from './img/人们/2/农产品/水果/fruit3.png'
import fruit4 from './img/人们/2/农产品/水果/fruit4.png'
import fruit5 from './img/人们/2/农产品/水果/fruit5.png'
import fruit6 from './img/人们/2/农产品/水果/fruit6.png'
import fruit7 from './img/人们/2/农产品/水果/fruit7.png'
import fruit8 from './img/人们/2/农产品/水果/fruit8.png'
import fruit9 from './img/人们/2/农产品/水果/fruit9.png'
import fruit10 from './img/人们/2/农产品/水果/fruit10.png'
import fruit11 from './img/人们/2/农产品/水果/fruit11.png'

const { TextArea } = Input;
export default class Agriculture extends React.Component {
  state = {
    isBuyVisible: false,
    isListVisible: false,
    isFeedbackVisible: false,
    class: '蔬菜',
    classList: [
      '蔬菜', '水果', '农副产品', '中药材', '粮食作物', '水产', '坚果干果', '种子', '食用菌', '种苗', '特种养殖', '经济作物', '绿化苗木', '花卉盆景', '茶叶', '饲料'
    ],
    areaList: [
      '不限', '北京', '天津', '上海', '重庆', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '青海', '宁夏', '新疆', '香港', '澳门', '台湾', '其他国家'
    ],
    veges: [vege0, vege1, vege2, vege3, vege4, vege5, vege6, vege7, vege8, vege9, vege10, vege11],
    fruits: [fruit0, fruit1, fruit2, fruit3, fruit4, fruit5, fruit6, fruit7, fruit8, fruit9, fruit10, fruit11],
    purchaseList: [],
    value: 0
  }
  showBuyMoal = (e) => {
    console.log(e)
    this.setState({ isBuyVisible: true })
  }
  handleOk = () => {
    let { purchaseList } = this.state
    let d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const date = d.getDate()
    const hour = d.getHours()
    const minute = d.getMinutes()
    const second = d.getSeconds()
    const mill = d.getMilliseconds()
    const id = `${year}${month}${date}${hour}${minute}${second}${mill}`
    purchaseList.push(id)
    this.setState({ isBuyVisible: false, purchaseList })
  }
  handleCancel = () => {
    this.setState({ isBuyVisible: false })
  }

  getList = () => {
    this.setState({ isListVisible: true })
  }
  handleListOk = () => {
    this.setState({ isListVisible: false })
  }
  handleListCancel = () => {
    this.setState({ isListVisible: false })
  }

  showFeedback = () => {
    this.setState({ isFeedbackVisible: true })
  }
  handleFeedbackOk = () => {
    this.setState({ isFeedbackVisible: false })
  }
  handleFeedbackCancel = () => {
    this.setState({ isFeedbackVisible: false })
  }
  render() {
    // 无意义的数组
    const imgArray = new Array(4).fill(0)
    const { veges, fruits, isBuyVisible, isListVisible, isFeedbackVisible, value } = this.state
    let imgSrc;
    return (
      <div style={{ 'marginTop': '5%', float: 'left' }}>

        <Modal title="购买界面" visible={isBuyVisible} onOk={this.handleOk} onCancel={this.handleCancel} bodyStyle={{ background: 'rgba(207,234,220,0.4)' }}>
          <TextArea rows={8} placeholder="" style={{ marginTop: '5%' }} bordered={false}></TextArea>
          <Input placeholder="备注：" style={{ marginTop: '5%' }}></Input>
          <Row style={{ marginTop: '5%' }}>
            <Col span={8}><Input placeholder="" value={'杭州萧山'}></Input></Col>
            <Col span={8}><Input bordered={false} placeholder="" value={'发送至'} style={{ textAlign: 'center' }}></Input></Col>
            <Col span={8}><Input placeholder="填写目的地："></Input></Col>
          </Row>
          <Row style={{ marginTop: '5%', textAlign: 'center' }}>
            <Col span={12}><Input bordered={false} placeholder="" value={'购买份数：'} style={{ textAlign: 'center' }}></Input></Col>
            <Col span={12}><InputNumber min={1} max={100} defaultValue={1} size={'large'} style={{ marginTop: '5%' }}></InputNumber></Col>
          </Row>
        </Modal>

        <Modal title="我的订单" visible={isListVisible} onOk={this.handleListOk} onCancel={this.handleListCancel} bodyStyle={{ background: 'rgba(207,234,220,0.4)' }}>
          {this.state.purchaseList.map(d => {
            return (<Row style={{ marginTop: '5%' }}>
              <Col span={8}><Input bordered={false} value={'订单号:'} style={{ textAlign: 'center' }}></Input></Col>
              <Col span={8}><Input bordered={true} value={d} style={{ textAlign: 'center' }}></Input></Col>
              <Col span={8} style={{ textAlign: 'center' }}><Button onClick={this.showFeedback} type="link" size={'large'} style={{ marginTop: '5%', textAlign: 'center' }}>我要反馈</Button></Col>
            </Row>)
          })}
        </Modal>

        <Modal title="我的反馈" visible={isFeedbackVisible} onOk={this.handleFeedbackOk} onCancel={this.handleFeedbackCancel} bodyStyle={{ background: 'rgba(207,234,220,0.4)' }}>
          <Row>
            <Col span={4}>
              <Input bordered={false} placeholder="类型："></Input>
            </Col>
            <Col span={20}>
              <Radio.Group onChange={this.onChange} value={value} style={{ marginTop: '5%' }}>
                <Radio value={1}>未收到货</Radio>
                <Radio value={2}>质量问题</Radio>
                <Radio value={3}>少见/漏发</Radio>
                <Radio value={4}>商品破损</Radio>
              </Radio.Group>
            </Col>
          </Row>
          <TextArea placeholder="填写反馈信息：" rows={8} style={{ marginTop: '5%' }}></TextArea>
          <Input placeholder="填写姓名：" style={{ marginTop: '5%' }}></Input>
          <Input placeholder="填写手机号：" style={{ marginTop: '5%' }}></Input>
          <Input placeholder="填写身份证号：" style={{ marginTop: '5%' }}></Input>
          <Input placeholder="填写家庭住址：" style={{ marginTop: '5%' }}></Input>
          <Row style={{ height: '50%' }}>
            {/* <Col span={18} > */}
            <Rate allowHalf defaultValue={5} />
            {/* </Col> */}
          </Row>
        </Modal>

        <div style={{ marginLeft: '2%', fontSize: '24px' }}>
          <Row>
            <Col span={2}><div>全部品类：</div></Col>
            <Col span={2}><div>地区：</div></Col>
            <Col span={2}><Button
              onClick={this.getList}
              icon={<DollarCircleOutlined />}
              type="primary"
              shape="round"
              size={"large"}
              style={{ marginLeft: '5%' }}
            >
              我的订单
            </Button></Col>
          </Row>
        </div>
        <Menu mode={'vertical'} style={{ float: 'left', marginLeft: '2%', marginTop: '2%' }} defaultSelectedKeys={this.state.classList[0]} onClick={this.changeClass}>
          {this.state.classList.map((d) => {
            return <Menu.Item key={d}>{d}</Menu.Item>
          })}
        </Menu>

        <Menu mode={'horizontal'} style={{ float: 'left', marginLeft: '4%', marginTop: '2%' }} defaultSelectedKeys={this.state.areaList[0]} inlineCollapsed={false}>
          {this.state.areaList.map((d) => {
            return <Menu.Item key={d}>{d}</Menu.Item>
          })}
        </Menu>

        <Row style={{ float: 'left', width: '80%', marginLeft: '8%', marginTop: '1%' }}>
          {imgArray.map((_, i) => {
            switch (this.state.class) {
              case '蔬菜': imgSrc = veges[i]; break;
              case '水果': imgSrc = fruits[i]; break;
              default: break;
            }
            return <Col key={`img${i}`} span={6}><img style={{ width: '55%', height: 'auto' }} src={imgSrc} onClick={this.showBuyMoal}></img></Col>
          })}
        </Row>
        <Row style={{ float: 'left', width: '80%', marginLeft: '8%', marginTop: '3%' }}>
          {imgArray.map((_, i) => {
            switch (this.state.class) {
              case '蔬菜': imgSrc = veges[i + 4]; break;
              case '水果': imgSrc = fruits[i + 4]; break;
              default: break;
            }
            return <Col key={`img${i}`} span={6}><img style={{ width: '55%', height: 'auto' }} src={imgSrc} onClick={this.showBuyMoal}></img></Col>
          })}
        </Row>
        <Row style={{ float: 'left', width: '80%', marginLeft: '8%', marginTop: '3%' }}>
          {imgArray.map((_, i) => {
            switch (this.state.class) {
              case '蔬菜': imgSrc = veges[i + 8]; break;
              case '水果': imgSrc = fruits[i + 8]; break;
              default: break;
            }
            return <Col key={`img${i}`} span={6}><img style={{ width: '55%', height: 'auto' }} src={imgSrc} onClick={this.showBuyMoal}></img></Col>
          })}
        </Row>
      </div >
    )
  }
  changeClass = (e) => {
    this.setState({ class: e.key })
  }
  onChange = (e) => {
    this.setState({ value: e.target.value })
  }
}