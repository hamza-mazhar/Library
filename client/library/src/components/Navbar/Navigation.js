import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import Oauth from "../OAuth";
import Logout from "../Logout/Logout";
const { Header } = Layout;
class Navbar extends React.Component {
  state = {
    email: "",
    client: "",
    expiry: "",
    access_token: ""
  };

  render() {
    const v = localStorage.getItem("login");
    console.log(v);
    return v === "true" ? (
      <Layout
        className="layout"
        style={{ display: "grid", gridTemplateColumns: " auto" }}
      >
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: "54px", textAlign: "right" }}
          >
            <Menu.Item key="9">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Logout>logout</Logout>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    ) : (
      <Layout
        className="layout"
        style={{ display: "grid", gridTemplateColumns: " auto" }}
      >
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: "54px", textAlign: "right" }}
          >
            <Menu.Item key="9">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Oauth>Login</Oauth>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/books">Books</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}

export default Navbar;
