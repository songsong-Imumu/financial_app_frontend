import React from "react";
import { Layout, Menu, Table, Tag, Button } from "antd";
import "antd/dist/antd.css";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import axios from "axios";

const { Header } = Layout;
const virtualRecruitUrl = "http://8.130.103.49:3001/virtualRecruit"
const cancelRecruitUrl = "http://8.130.103.49:3001/cancelRecruit"
const pushRecruitUrl = "http://8.130.103.49:3001/pushRecruit"


export default class AdministratorHead extends React.Component {
  state = {
    current: 'home',
    selectedRowKeys: [],
    data: []
  }
  componentDidMount() {
    this.getVirtualRecruit()
  }
  componentDidUpdate() {
    this.getVirtualRecruit()
  }
  render() {
    const HeaderStyle = {
      position: "fixed",
      zIndex: 1,
      width: "100%",
      backgroundColor: "#CFEADC",
    };
    const logoStyle = { position: "absolute", width: 200, color: "black" };

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const columns = [
      { title: 'ID', dataIndex: '_id' },
      { title: 'ReCompany', dataIndex: 'ReCompany' },
      { title: 'ReTitle', dataIndex: 'ReTitle' },
      { title: 'ReSalary', dataIndex: 'ReSalary' },
      {
        title: 'Tag1', dataIndex: 'Tag1', render: tags => (
          <>
            {tags.map(tag => {
              return (
                <Tag color={'magenta'} key={tag}>
                  {tag}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Tag2', dataIndex: 'Tag2', render: tags => (
          <>
            {tags.map(tag => {
              return (
                <Tag color={'blue'} key={tag}>
                  {tag}
                </Tag>
              )
            })}
          </>
        )
      },
      { title: 'ReClass', dataIndex: 'ReClass' },
    ];
    const { data } = this.state;
    for (let i = 0; i < data.length; i++) data[i].key = i
    return (
      <div>
        <Header style={HeaderStyle}>
          <div className="logo" style={logoStyle}>
            <svg
              style={{ marginTop: "15px" }}
              t="1633790934102"
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6136"
              width="32"
              height="32"
            >
              <path
                d="M564 430.4H114.4c-35.2 0-64-28.8-64-64h473.6c22.4 0 40 17.6 40 40v24z"
                fill="#666666"
                p-id="6137"
              ></path>
              <path
                d="M600.8 499.2L477.6 400l15.2-18.4c13.6-16.8 39.2-20 56-6.4l92 74.4c7.2 5.6 8 16 2.4 22.4l-20 24.8c-5.6 7.2-15.2 8-22.4 2.4z"
                fill="#666666"
                p-id="6138"
              ></path>
              <path
                d="M916 385.6c-56-176-217.6-294.4-402.4-294.4-184.8 0-346.4 118.4-402.4 294.4l-60.8-19.2c64-202.4 250.4-339.2 463.2-339.2 212.8 0 399.2 136 463.2 339.2l-60.8 19.2zM470.4 588h452c35.2 0 64 28.8 64 64H510.4c-22.4 0-40-17.6-40-40v-24z"
                fill="#666666"
                p-id="6139"
              ></path>
              <path
                d="M432 519.2l123.2 99.2-15.2 18.4c-13.6 17.6-39.2 20-56 6.4L392 568.8c-7.2-5.6-8-16-2.4-22.4l20-24.8c5.6-6.4 16-8 22.4-2.4z"
                fill="#666666"
                p-id="6140"
              ></path>
              <path
                d="M523.2 991.2c-212.8 0-399.2-136-463.2-339.2l60.8-19.2c56 176 217.6 294.4 402.4 294.4s346.4-118.4 402.4-294.4l60.8 19.2c-64 203.2-250.4 339.2-463.2 339.2z"
                fill="#666666"
                p-id="6141"
              ></path>
              <path
                d="M89.6 640.8m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
                fill="#666666"
                p-id="6142"
              ></path>
              <path
                d="M948 379.2m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
                fill="#666666"
                p-id="6143"
              ></path>
            </svg>
          </div>
          {/* <Router> */}
          <Menu
            mode="horizontal"
            // defaultSelectedKeys={current}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
          </Menu>
          {/* </Router> */}
        </Header>
        <div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data}
            pagination={false}
            style={{ marginTop: '3%', marginLeft: '0.5%', height: '100%' }} />
          <Button size="large" type="primary" style={{ width: '120px', marginTop: '10px', marginLeft: '10px' }} onClick={this.push}>提交</Button>
          <Button size="large" type="primary" style={{ width: '120px', marginTop: '10px', marginLeft: '10px' }} onClick={this.cancel}>删除</Button>
        </div>
      </div>

    );
  }
  getVirtualRecruit = () => {
    axios.get(virtualRecruitUrl).then(res => {
      const data = res.data
      this.setState({ data })
    })
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  // 数据推送到真实数据表
  push = () => {
    const { data, selectedRowKeys } = this.state
    let ID = []
    let information = []
    selectedRowKeys.forEach(d => {
      ID.push(data[d]._id)
      information.push(data[d])
    })

    // 删除虚拟表中的数据
    axios
      .post(cancelRecruitUrl, { ID })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err.response);
      });
    // 将数据推送到真实表
    axios
      .post(pushRecruitUrl, { information })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  // 数据删除
  cancel = () => {
    const { data, selectedRowKeys } = this.state
    let ID = []
    selectedRowKeys.forEach(d => {
      ID.push(data[d]._id)
    })
    axios
      .post(cancelRecruitUrl, { ID })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
}
