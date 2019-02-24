import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;
class Navbar extends React.Component {
  state = {
    email: "",
    client: "",
    expiry: "",
    access_token: ""
  };

  render() {
    // const v = localStorage.getItem("login");
    //console.log(v);
    return (
      <Layout
        className="layout"
        style={{ display: "grid", gridTemplateColumns: " auto" }}
      >
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: "64px", textAlign: "right" }}
          >
            <Menu.Item key="9">
              <Link to="/">Home</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}

export default Navbar;
