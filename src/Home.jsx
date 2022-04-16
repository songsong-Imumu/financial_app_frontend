import React from "react";
import { Layout, Menu, Button, Carousel, BackTop } from "antd";
import "antd/dist/antd.css";

import {
  ArrowDownOutlined,
  TagOutlined,
  HeartOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import image from "./img/植物.svg";
// 轮播图图片
import svg1 from './img/人们/志愿/810a19d8bc3eb1351b3c54e40ba1abd4fc1f4438.jpeg'
import svg2 from "./img/人们/志愿/1635922498(1).png";
import svg3 from "./img/人们/志愿/1635922423(1).png";

import svg4 from "./img/场景-工作演讲.svg";
import svg5 from "./img/场景-工作交接.svg";
import svg6 from "./img/场景-行走出差.svg";

import number1 from "./img/1_round_solid_数字1_by_climei.svg";
import number2 from "./img/2_round_solid_数字2_by_climei.svg";
import number3 from "./img/3_round_solid_数字3_by_climei.svg";
import number4 from "./img/4_round_solid_数字4_by_climei.svg";
import number5 from "./img/5_round_solid_数字5_by_climei.svg";
import number6 from "./img/6_round_solid_数字6_by_climei.svg";
// 测试axios
import axios from "axios";
const informationUrl = "http://8.130.103.49:3001/information"
const invatationUrl = "http://8.130.103.49:3001/invitation"

export default class Home extends React.Component {
  state = {
    rotation: [svg1, svg2, svg3],
    rotationIndex: 0,
    content0: [],
    content1: [],
    content2: [],
    experience: [],
    help: [],
    svgNumber: [number1, number2, number3, number4, number5, number6],
    key: "0",
  };
  componentDidMount() {
    this.getInformation()
    this.getInvitation()
  }
  getInformation = () => {
    axios.get(informationUrl).then(res => {
      const data = res.data
      const output0 = []
      const output1 = []
      const output2 = []
      data.forEach(d => {
        const value = {
          content: d.InfTitle,
          href: d.InfContent
        }
        if (d.InfClass === "农作物") output0.push(value)
        else if (d.InfClass === "志愿") output1.push(value)
        else if (d.InfClass === "招聘") output2.push(value)
      })
      this.setState({ content0: output0, content1: output1, content2: output2 })
    })
  }
  getInvitation = () => {
    axios.get(invatationUrl).then(res => {
      const data = res.data
      const output0 = []
      const output1 = []
      data.forEach(d => {
        const value = {
          title: d.InvTitle,
          content: d.InvContent,
          date: d.InvDate,
          link: d.InvLink
        }
        if (d.InvClass === "经验帖") output0.push(value)
        else if (d.InvClass === "求助帖") output1.push(value)
      })
      this.setState({ experience: output0, help: output1 })
    })
  }
  render() {
    const { Content, Footer } = Layout;
    const informationLeftStyle = {
      float: "left",
      width: 500,
      height: 600,
      marginLeft: "15%",
    };
    const informationRightStyle = { float: "left", width: 500, height: 600 };
    const imageStyle = { width: "160%", height: "auto" };

    const cardStyle = {
      position: "absolute",
      marginTop: "2%",
      width: "50%",
      height: "55%",
    };
    const cardContentStyle = {
      position: "absolute",
      marginTop: "10%",
      marginLeft: "10%",
      fontSize: "20px",
      width: "40%",
      textAlign: "left",
    };
    const imagesStyle = {
      float: "left",
      height: "60%",
      width: "55%",
      marginLeft: "22.5%",
      marginTop: "5%",
      boxShadow: "0 1px 6px 3px rgb(219, 219, 219)",
    };

    const contentStyle = {
      float: "left",
      minHeight: 700,
      width: "80%",
      marginLeft: "10%",
      marginTop: "5%",
      boxShadow: "0 1px 6px 3px rgb(219, 219, 219)",
    };
    const contentPictureStyle = { height: "300px", width: "auto" };

    const communicationStyle = {
      float: "left",
      minHeight: 700,
      width: "80%",
      marginLeft: "10%",
      marginTop: "0%",
    };
    const tieziStyle = { float: "left", height: "250px", width: "50%" };
    const InnerStyle = {
      float: "left",
      width: "80%",
      height: "80%",
      marginTop: "10%",
      marginLeft: "10%",
      boxShadow: "0 1px 3px 3px rgb(219, 219, 219)",
      borderRadius: "10px",
    };
    // const InnerHoverStyle = { width: '80%', height: '80%', marginTop: '10%', marginLeft: '10%', boxShadow: '0 1px 6px 3px rgb(219, 219, 219)', 'borderRadius': '10px' }
    return (
      <Layout>
        {/* 回到顶部的简单组件 */}
        <BackTop />
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 880 }}
          >
            {/* 介绍信息 */}
            <div style={{ marginTop: 150 }}>
              {/* 左半边描述信息 */}
              <div style={informationLeftStyle}>
                <div style={{ fontSize: "27px" }}>
                  <h1>581扶贫众筹</h1>
                </div>
                <br />
                <hr />
                <br />
                <div style={{ fontSize: "20px" }}>
                  <p>
                    Being a manager is hard work.We've a created a set of tools
                    that helps you manage your team on a day to day basis so you
                    can focus on the big pictures.
                  </p>
                </div>
                <br />
                <Button
                  icon={<TagOutlined />}
                  type="primary"
                  shape="round"
                  size={"large"}
                >
                  免费注册
                </Button>
                <Button
                  icon={<ArrowDownOutlined />}
                  onClick={this.goToCarousel}
                  style={{ marginLeft: "40%" }}
                  type="primary"
                  shape="round"
                  size={"large"}
                >
                  了解更多
                </Button>
              </div>
              {/* 左半边描述信息 */}
              <div style={{ float: "left", width: "5%", height: 100 }}></div>
              {/* 右半边图片 */}
              <div style={informationRightStyle}>
                <img style={imageStyle} src={image} alt="" />
              </div>
              {/* 右半边图片 */}
            </div>
            {/* 介绍信息 */}
          </div>
          {/* 热门资讯 */}
          {/* <div className="site-layout-background" style={contentStyle}> */}
          {/* </div> */}
          {/* 热门资讯 */}
          {/* 社区讨论 */}
          {/* <div className="site-layout-background" style={communicationStyle}> */}
          {/* </div> */}
          {/* 社区讨论 */}
        </Content>
        {/* 轮播图 */}
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 940 }}
          >
            {/* 卡片描述信息 */}
            {/* <div style={cardStyle}>
              <div
                style={{
                  backgroundColor: "#CFEADC",
                  width: "100%",
                  height: "41.4%",
                }}
              >
                <div style={cardContentStyle}>
                  <h1>OutSide School Hours Care</h1>
                  <br />
                  <hr />
                  <br />
                  <p>
                    We're focused on the dact that extracurricular activities
                    come with a wealth of benefits for your children.
                  </p>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#CFEADC",
                  width: "73.4%",
                  height: "50%",
                }}
              ></div>
            </div> */}
            {/* 卡片描述信息 */}
            {/* 轮播图 */}
            <div style={imagesStyle}>
              <Carousel id="Carousel" autoplay>
                <div style={{ width: '500px', height: '500px' }}>
                  <img
                    style={{ width: "100%", height: "640px", zIndex: 1 }}
                    src={svg1}
                    alt=""
                  />
                </div>
                <div>
                  <img
                    style={{ width: "100%", height: "640px", zIndex: 1 }}
                    src={svg2}
                    alt=""
                  />
                </div>
                <div>
                  <img
                    style={{ width: "100%", height: "640px", zIndex: 1 }}
                    src={svg3}
                    alt=""
                  />
                </div>
              </Carousel>
            </div>
            {/* 轮播图 */}
          </div>
        </Content>
        {/* 轮播图 */}
        {/* 热门资讯 */}
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 940 }}
          >
            <div style={contentStyle}>
              <div className={"ContentP"}>
                <img style={contentPictureStyle} src={svg4} alt="" />
                <div style={{ height: "10%" }}></div>
                {this.state.content0.map((n) => {
                  return (
                    <li style={{ marginTop: '5%' }}>
                      <a href={n.href} target="_blank">
                        {n.content}
                      </a>
                    </li>
                  );
                })}
              </div>
              <div className={"ContentP"}>
                <img style={contentPictureStyle} src={svg5} alt="" />
                <div style={{ height: "10%" }}></div>
                {this.state.content1.map((n) => {
                  return (
                    <li style={{ marginTop: '5%' }}>
                      <a href={n.href} target="_blank">
                        {n.content}
                      </a>
                    </li>
                  );
                })}
              </div>
              <div className={"ContentP"}>
                <img style={contentPictureStyle} src={svg6} alt="" />
                <div style={{ height: "10%" }}></div>
                {this.state.content2.map((n) => {
                  return (
                    <li style={{ marginTop: '5%' }}>
                      <a href={n.href} target="_blank">
                        {n.content}
                      </a>
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        </Content>
        {/* 热门资讯 */}
        {/* 论坛交流 */}
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <div
            id="luntan"
            className="site-layout-background"
            style={{ padding: 24, minHeight: 1240 }}
          >
            <Menu
              mode="horizontal"
              onSelect={this.changeItem}
              defaultSelectedKeys={["0"]}
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
            >
              <Menu.Item key="0" icon={<ExperimentOutlined />}>
                经验帖
              </Menu.Item>
              <Menu.Item key="1" icon={<HeartOutlined />}>
                求助帖
              </Menu.Item>
            </Menu>
            <div style={communicationStyle}>
              {this.state.key === "0"
                ? this.state.experience.map((d, i) => {
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
                            alt=""
                          />
                          <h2 style={{ marginLeft: "40px" }}><a href={d.link} target="_blank">{d.title}</a></h2>
                        </div>
                        <p
                          style={{
                            marginLeft: "50px",
                            marginTop: "2%",
                            width: "80%",
                            height: "50%",
                          }}
                        >
                          {d.content}
                        </p>
                        <p style={{ float: "right", marginRight: "5%" }}>
                          {d.date}
                        </p>
                      </div>
                    </div>
                  );
                })
                : this.state.help.map((d, i) => {
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
                            alt=""
                          />
                          <h2 style={{ marginLeft: "40px" }}>{d.title}</h2>
                        </div>
                        <p
                          style={{
                            marginLeft: "50px",
                            marginTop: "2%",
                            width: "80%",
                            height: "50%",
                          }}
                        >
                          {d.content}
                        </p>
                        <p style={{ float: "right", marginRight: "5%" }}>
                          {d.date}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Content>
        {/* 论坛交流 */}
        <Footer style={{ textAlign: "center" }}>
          Financial App ©2021 Created by Group - One Hundred Kilos
        </Footer>
      </Layout>
    );
  }
  changeItem = (e) => {
    this.setState({ key: e.key });
  };
  // 定义滚动到轮播图的函数
  goToCarousel = () => {
    window.scrollTo({
      left: 0,
      top: 980,
      behavior: "smooth",
    });
  };

  // 测试axios
  // getAll = () => {
  //   axios
  //     .post("http://:3001/notes", {
  //       firstName: "Fred",
  //       lastName: "Flinstone",
  //     })
  //     .then((res) => {
  //       // console.log(res)
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });

  //   axios
  //     .get(baseUrl)
  //     .then((res) => {
  //       // console.log(res)
  //       const data = res.data;
  //       this.setState({ experience: data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
}
