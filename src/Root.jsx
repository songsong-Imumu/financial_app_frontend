import React from "react";
import Head from "./Head";
import Home from "./Home";
import Agriculture from "./Agriculture";
import Financing from "./Financing";
import Recruit from "./Recruit";
import LogSign from "./Log&Sign";
import AdministratorHead from "./AdministratorHead";
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Switch, Route, Link, Redirect
} from "react-router-dom"

export default class Root extends React.Component {
  state = {
    current: 'home'
  }
  render() {
    const { current } = this.state
    console.log(current)
    const style = {
      position: "absolute",
      width: "99%",
      height: "99%",
    };
    return (
      <div id="Root" style={style}>
        {current === 'administrator' ? <AdministratorHead></AdministratorHead> :
          <g>
            <Head callback={this.getTab} current={this.state.current}></Head>
            {current === "home" ? (
              <Home />
            ) : current === "logsign" ? (
              <LogSign callback={this.getTab}></LogSign>
            ) : current === "agriculture" ? (
              <Agriculture></Agriculture>
            ) : current === "recruit" ? (
              <Recruit></Recruit>
            ) : current === "financing" ?
              <Financing></Financing>
              : null}
          </g>
          //   (<Head callback={this.getTab} current={this.state.current}></Head>
          //             {current === "home" ? (
          //   <Home />
          // ) : current === "logsign" ? (
          //   <LogSign callback={this.getTab}></LogSign>
          // ) : current === "agriculture" ? (
          //   <Agriculture></Agriculture>
          // ) : current === "recruit" ? (
          //   <Recruit></Recruit>
          // ) : current === "financing" ?
          //   <Financing></Financing>
          //   : null})
        }

      </div>
    );
  }
  getTab = (d) => {
    this.setState({ current: d.current });
  };
}
