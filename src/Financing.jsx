import React from "react";
import { Check, message, Layout, Menu, SubMenu, Button, Carousel, BackTop, Avatar, Input, Space, Row, Col, Tag, Modal, Select, Progress, Upload } from "antd";
import "antd/dist/antd.css";
import { IdcardOutlined, ToTopOutlined, UploadOutlined, CloudUploadOutlined } from "@ant-design/icons";

import number1 from "./img/1_round_solid_数字1_by_climei.svg";
import number2 from "./img/2_round_solid_数字2_by_climei.svg";
import number3 from "./img/3_round_solid_数字3_by_climei.svg";
import number4 from "./img/4_round_solid_数字4_by_climei.svg";
import number5 from "./img/5_round_solid_数字5_by_climei.svg";
import number6 from "./img/6_round_solid_数字6_by_climei.svg";

import help0 from './img/人们/1/help0.jpg'
import help1 from './img/人们/1/help1.jpg'
import help2 from './img/人们/1/help2.jpg'

import axios from "axios";
const financingtUrl = "http://8.130.103.49:3001/financing";
const editorUrl = "http://8.130.103.49:3001/editor";
const addNumUrl = "http://8.130.103.49:3001/addNum";
const { TextArea } = Input;
const { Option } = Select
export default class Financing extends React.Component {
  state = {
    svgNumber: [number1, number2, number3, number4, number5, number6],
    isModalVisible: false,
    isForModalVisible: false,
    isMoneyModalVisible: false,
    financing: [],
    name: '',
    content: '',
    end: '',
    prove: '',
    idcard: '',
    yearsalary: '',
    lowinsurance: '',
    life: '',
    buttonDisabled: true,
    addNum: 0
  }
  componentDidMount() {
    this.getFinancing()
  }
  componentDidUpdate() {
    this.getFinancing()
  }
  getFinancing = () => {
    axios.get(financingtUrl).then(res => {
      let data = res.data
      data = this.downthreeandreverse(data)
      let output = []
      data.forEach(d => {
        output.push({
          name: d.FinName,
          content: d.FinContext,
          date: d.FinDate,
          start: parseInt(d.FinStart),
          end: parseInt(d.FinEnd)
        })
      });
      output = this.downthreeandreverse(output)
      this.setState({ financing: output })
    })
  }
  downthreeandreverse = (array) => {
    return array.slice(-3).reverse()
  }

  // 填写信息的modal三个事件
  check = () => {
    this.setState({ isForModalVisible: true })
  }
  handleforOk = () => {
    const { prove, idcard, life } = this.state
    message.success('通过审核!')
    this.setState({ isForModalVisible: false, buttonDisabled: false })
  }
  handleforCancel = () => {
    this.setState({ isForModalVisible: false })
  }

  // 发布众筹的三个事件
  financing = () => {
    this.setState({ isModalVisible: true })
  }
  handleOk = () => {
    const { name, content, end } = this.state
    axios.post(editorUrl, {
      FinName: name,
      FinContext: content,
      FinEnd: String(end)
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err.response)
    })
    // const { Name, Job, Salary, Title, Need, Pay } = this.state
    // const Tag1 = Need.split("，")
    // const Tag2 = Pay.split("，");
    // axios
    //   .post(fillUrl, {
    //     ReSalary: Salary,
    //     ReClass: Job,
    //     ReCompany: Name,
    //     ReDate: "2021-10-22",
    //     ReTitle: Title,
    //     Tag1: Tag1,
    //     Tag2: Tag2
    //   })
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
    this.setState({ isModalVisible: false })
  };
  handleCancel = () => {
    this.setState({ isModalVisible: false })
  };

  // 筹资信息的modal三个事件
  money = () => {
    this.setState({ isMoneyModalVisible: true })
  }
  handleMoneyOk = () => {
    let { UserName, addNum } = this.state
    this.state.financing.forEach(d => {
      if (d.name === UserName) {
        addNum = d.start + addNum
      }
    })
    axios.post(addNumUrl, {
      FinName: UserName,
      addNum: String(addNum)
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err.response)
    })
    this.setState({ isMoneyModalVisible: false })
  }
  handleMoneyCancel = () => {
    this.setState({ isMoneyModalVisible: false })
  }
  render() {
    const props = {
      name: 'file',
      action: 'http://8.130.103.49:3001/local',
      headers: {
        authorization: 'authorization-text',
      },
      accept: '.',
      onChange(info) {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功！`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败！`);
        }
      },
    };
    const { isModalVisible, isForModalVisible, isMoneyModalVisible, financing } = this.state
    const tieziStyle = { float: "left", height: "350px", width: "80%", marginLeft: '2%', marginTop: '1%' };
    const InnerStyle = {
      float: "left",
      width: "60%",
      height: "80%",
      marginTop: "0%",
      marginLeft: "0%",
      boxShadow: "0 1px 3px 3px rgb(219, 219, 219)",
      borderRadius: "10px",
    };
    return (
      <div style={{ marginTop: '5%', fontSize: '24px', float: 'left', height: '900px', width: '99%' }}>
        <Modal title="发布众筹" visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Input placeholder="真实姓名:" style={{ marginTop: '5%' }} onChange={this.getName}></Input>
          <Input placeholder="求助描述填写:" style={{ marginTop: '5%' }} onChange={this.getContent}></Input>
          <Input placeholder="众筹数额:" style={{ marginTop: '5%' }} onChange={this.getEnd}></Input>
        </Modal>

        <Modal title="填写个人信息" visible={isForModalVisible} onOk={this.handleforOk} onCancel={this.handleforCancel}>
          {/* <Input placeholder="贫困证明:" style={{ marginTop: '5%' }} onChange={this.getProve}></Input> */}
          <Upload {...props}>
            <Button icon={<UploadOutlined />} size="large"
              shape="round">上传贫困证明</Button>
          </Upload>
          <Input placeholder="身份证号:" style={{ marginTop: '5%' }} onChange={this.getIDCard}></Input>
          <Input placeholder="家庭年总收入:" style={{ marginTop: '5%' }} onChange={this.getYearSalary}></Input>
          <Input placeholder="是否享受低保:" style={{ marginTop: '5%' }} onChange={this.getLowInsurance}></Input>
          <TextArea placeholder="家庭生活情况说明:" rows={8} style={{ marginTop: '5%' }} onChange={this.getLife} />
        </Modal>

        <Modal title="发起筹款" visible={isMoneyModalVisible} onOk={this.handleMoneyOk} onCancel={this.handleMoneyCancel}>
          <Select style={{ width: 120, borderRadius: 5 }} size="large" onChange={this.handleChange}>
            {financing.map(d => {
              return <Option key={d.name}>{d.name}</Option>
            })}
          </Select>
          <Input placeholder="输入资金:" style={{ marginTop: '5%' }} onChange={this.getMoney}></Input>
        </Modal>
        <div style={{ float: 'left', marginLeft: '2%', width: '50%' }}>筹资大厅：
          <Button
            onClick={this.check}
            icon={<IdcardOutlined />}
            type="primary"
            shape="round"
            size={"large"}
            style={{ marginLeft: '5%' }}
          >
            填写信息
          </Button>
          <Button
            onClick={this.financing}
            icon={<ToTopOutlined />}
            type="primary"
            shape="round"
            size={"large"}
            style={{ marginLeft: '5%' }}
            disabled={this.state.buttonDisabled}
          >
            发布众筹
          </Button>
          <Button
            onClick={this.money}
            icon={<CloudUploadOutlined />}
            type="primary"
            shape="round"
            size={"large"}
            style={{ marginLeft: '5%' }}
          >
            发起筹款
          </Button>
        </div>
        {/* <div style={{ position: 'absolute', marginLeft: '2%', marginTop: '20%' }}>帮帮社区：</div> */}
        {/* <div style={{ position: 'absolute', marginLeft: '2%', marginTop: '40%' }}>感恩的心</div> */}
        {this.state.financing.map((d, i) => {
          return (
            <div style={tieziStyle}>
              <div className="inner" style={InnerStyle}>
                <div
                  style={{
                    marginLeft: "10px",
                    marginTop: "2%",
                    width: "100%",
                  }}
                >
                  <img
                    style={{ position: "absolute" }}
                    src={this.state.svgNumber[i]}
                  />
                </div>
                <h4 style={{ marginLeft: "60px", marginTop: '-5px', width: '40%' }}>{d.name}</h4>
                {/* <img src={d.img} style={{ width: 'auto', height: '55%', marginTop: '10%', marginLeft: '20%' }} /> */}
                <h6 style={{ marginLeft: "40px", width: '80%', marginTop: '2%', fontSize: '16px' }}>{d.content}</h6>
                <div style={{ width: '50%', marginTop: '3%', marginLeft: '2%' }}>
                  <Progress percent={d.start / d.end * 100} status={'active'}></Progress>
                </div>
                <div style={{ fontSize: '16px', marginLeft: '2%', marginTop: '2%' }}>{`众筹金额：${d.end}元`}</div>
                {/* <Button type={'link'} style={{ float: 'right' }}>了解详情</Button> */}
              </div>
            </div>
          );
        })}

      </div>
    )
  }
  // 发布众筹界面里四个控件
  getName = (e) => {
    this.setState({ name: e.target.value })
  }
  getContent = e => {
    this.setState({ content: e.target.value })
  }
  getEnd = e => {
    this.setState({ end: e.target.value })
  }
  getProve = e => {
    this.setState({ prove: e.target.value })
  }
  // 发起筹款界面里两个控件
  handleChange = e => {
    this.setState({ UserName: e })
  }
  getMoney = e => {
    this.setState({ addNum: parseInt(e.target.value) })
  }




  getIDCard = e => {
    this.setState({ idcard: e.target.value })
  }
  getYearSalary = e => {
    this.setState({ yearsalary: e.target.value })
  }
  getLowInsurance = e => {
    this.setState({ lowinsurance: e.target.value })
  }
  getLife = e => {
    this.setState({ life: e.target.value })
  }
}