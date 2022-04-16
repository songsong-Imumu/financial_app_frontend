import React from "react";
import { Layout, Menu, SubMenu, Button, Carousel, BackTop, Avatar, Input, Space, Row, Col, Tag, Modal, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import number1 from "./img/1_round_solid_数字1_by_climei.svg";
import number2 from "./img/2_round_solid_数字2_by_climei.svg";
import number3 from "./img/3_round_solid_数字3_by_climei.svg";
import number4 from "./img/4_round_solid_数字4_by_climei.svg";
import number5 from "./img/5_round_solid_数字5_by_climei.svg";
import number6 from "./img/6_round_solid_数字6_by_climei.svg";
import axios from "axios";
const recruitUrl = "http://8.130.103.49:3001/recruit";
const fillUrl = "http://8.130.103.49:3001/fill";
const { Option } = Select
export default class Recruit extends React.Component {
  state = {
    job: '人事',
    jobList: ['人事', '财务', '销售', '市场', '工程师', '互联网', '广告', '教育'],
    svgNumber: [number1, number2, number3, number4, number5, number6],
    renshi: [],
    caiwu: [],
    xiaoshou: [],
    shichang: [],
    gongchengshi: [],
    hulianwang: [],
    guanggao: [],
    jiaoyu: [],
    isModalVisible: false,
    Name: '',
    Job: '',
    Title: '',
    Salary: '',
    Need: '',
    Pay: ''
  }
  componentDidMount() {
    this.getRecruit()
  }
  componentDidUpdate() {
    this.getRecruit()
  }
  getRecruit = () => {
    axios.get(recruitUrl).then(res => {
      const data = res.data
      let renshi = [];
      let caiwu = [];
      let xiaoshou = [];
      let shichang = [];
      let gongchengshi = [];
      let hulianwang = [];
      let guanggao = [];
      let jiaoyu = [];
      data.forEach(d => {
        const value = {
          company: d.ReCompany,
          salary: d.ReSalary,
          tag1: d.Tag1,
          tag2: d.Tag2,
          title: d.ReTitle
        }
        if (d.ReClass === "人事") renshi.push(value)
        if (d.ReClass === "财务") caiwu.push(value)
        if (d.ReClass === "销售") xiaoshou.push(value)
        if (d.ReClass === "市场") shichang.push(value)
        if (d.ReClass === "工程师") gongchengshi.push(value)
        if (d.ReClass === "互联网") hulianwang.push(value)
        if (d.ReClass === "广告") guanggao.push(value)
        if (d.ReClass === "教育") jiaoyu.push(value)
      })
      renshi = this.downsixandreverse(renshi)
      caiwu = this.downsixandreverse(caiwu)
      xiaoshou = this.downsixandreverse(xiaoshou)
      shichang = this.downsixandreverse(shichang)
      gongchengshi = this.downsixandreverse(gongchengshi)
      hulianwang = this.downsixandreverse(hulianwang)
      guanggao = this.downsixandreverse(guanggao)
      jiaoyu = this.downsixandreverse(jiaoyu)

      this.setState({ renshi, caiwu, xiaoshou, shichang, gongchengshi, hulianwang, guanggao, jiaoyu })
    })
  }
  downsixandreverse = (array) => {
    return array.slice(-6).reverse()
  }
  // modal的三个事件
  recruit = () => {
    this.setState({ isModalVisible: true })
  }
  handleOk = () => {
    const { Name, Job, Salary, Title, Need, Pay } = this.state
    const Tag1 = Need.split("，")
    const Tag2 = Pay.split("，");
    axios
      .post(fillUrl, {
        ReSalary: Salary,
        ReClass: Job,
        ReCompany: Name,
        ReDate: "2021-10-22",
        ReTitle: Title,
        Tag1: Tag1,
        Tag2: Tag2
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err.response);
      });
    this.setState({ isModalVisible: false })
  };
  handleCancel = () => {
    this.setState({ isModalVisible: false })
  };
  render() {
    const tieziStyle = { float: "left", height: "250px", width: "40%", marginLeft: '5%' };
    const InnerStyle = {
      float: "left",
      width: "80%",
      height: "80%",
      marginTop: "10%",
      marginLeft: "10%",
      boxShadow: "0 1px 3px 3px rgb(219, 219, 219)",
      borderRadius: "10px",
    };
    const { renshi, caiwu, xiaoshou, shichang, gongchengshi, hulianwang, guanggao, jiaoyu, job, jobList, isModalVisible } = this.state
    return (
      <div style={{ marginTop: '5%' }}>
        <Modal title="填写招募信息" visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Input placeholder="公司名称:" style={{ marginTop: '5%' }} onChange={this.getName}></Input>
          <Input placeholder="招聘岗位类型:" style={{ marginTop: '5%' }} onChange={this.getJob}></Input>
          <Input placeholder="标题:" style={{ marginTop: '5%' }} onChange={this.getTitle}></Input>
          <Input placeholder="薪资:" style={{ marginTop: '5%' }} onChange={this.getSalary}></Input>
          <Input placeholder="招募要求:" style={{ marginTop: '5%' }} onChange={this.getNeed}></Input>
          <Input placeholder="工作待遇:" style={{ marginTop: '5%' }} onChange={this.getPay}></Input>
        </Modal>

        <Button
          onClick={this.recruit}
          icon={<EditOutlined />}
          type="primary"
          shape="round"
          size={"large"}
          style={{ marginLeft: '12%' }}
        >
          我要招募
        </Button>
        <div style={{ marginLeft: '20%', fontSize: '24px', width: '10%', float: 'left' }}>热门职位:</div>
        <Menu mode={'horizontal'} style={{ float: 'left', marginLeft: '5%', textAlign: 'center' }} defaultSelectedKeys={this.state.jobList[0]} onClick={this.changeJob}>
          {jobList.map((d) => {
            return <Menu.Item key={d}>{d}</Menu.Item>
          })}
        </Menu>
        {job === '人事' ? renshi.map((d, i) => {
          return (
            <div style={tieziStyle}>
              <div className="inner" style={InnerStyle}>
                <div
                  style={{
                    marginLeft: "10px",
                    marginTop: "2%",
                    width: "80%",
                  }}
                >
                  <img
                    style={{ position: "absolute" }}
                    src={this.state.svgNumber[i]}
                  />
                  <h2 style={{ marginLeft: "40px", width: '40%' }}>{d.title}</h2>
                  <p style={{ float: 'right', marginRight: '-15%', marginTop: '-7%', color: 'orange' }}>{`${d.salary}元/月`}</p>
                </div>
                <Row style={{ marginTop: '2%', marginLeft: '2%' }}>
                  {d.tag1.map(t1 => {
                    return <Col span={4}><Tag color="magenta">{t1}</Tag></Col>
                  })}
                </Row>
                <Row style={{ marginTop: '2%', marginLeft: '2%', width: '50%' }}>
                  {d.tag2.map(t2 => {
                    return <Col span={6}><Tag color="blue">{t2}</Tag></Col>
                  })}
                </Row>
                <p style={{ float: 'left', marginLeft: '2%', marginTop: '10%' }}>{d.company}</p>
              </div>
            </div>
          );
        }) : null}
      </div>
    )
  }
  changeJob = (e) => {
    this.setState({ job: e.key })
  }
  getName = e => {
    this.setState({ Name: e.target.value })
  }
  getJob = e => {
    this.setState({ Job: e.target.value })
  }
  getSalary = e => {
    this.setState({ Salary: e.target.value })
  }
  getNeed = e => {
    this.setState({ Need: e.target.value })
  }
  getPay = e => {
    this.setState({ Pay: e.target.value })
  }
  getTitle = e => {
    this.setState({ Title: e.target.value })
  }
}