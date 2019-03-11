import React, { Component } from "react";
import { Button, Form, Card, Input, Icon, Checkbox, message } from "antd";
import axios from "axios";
import styled from "styled-components";
import "./login.css";
const LoginForm = styled.div``;
class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log("Received values of form: ", values);
        axios({
          method: "post",
          url: "/user/login",
          data: {
            email: values.email,
            password: values.password
          }
        })
          .then((req, res) => {
            //console.log(req);
            this.setState({ login: true });
            localStorage.setItem("token", "Bearer " + req.data.token);
            localStorage.setItem("login", this.state.login);
            message.success("Successful Login!");
            window.location.replace("/");
          })
          .catch(err => {
            this.setState({ login: false });
            localStorage.setItem("login", this.state.login);
            message.error("Invalid Email or Password!");
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <LoginForm>
        <div
          style={{
            paddingTop: "5%",
            paddingBottom: "5%",
            paddingLeft: "35%",
            paddingRight: "35%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage: `url(https://goodstock.photos/wp-content/uploads/laptop-devices-wooden-desk.jpg)`
          }}
        >
          <Card
            title="Login Here"
            bordered={false}
            style={{
              width: "100%",
              color: "white",
              background: "rgba(0,0,0,0.5)"
            }}
          >
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      type: "email",
                      message: "Please input your Email!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="mail"
                        style={{ color: "rgba(255,255,255,.25)" }}
                      />
                    }
                    placeholder="Email"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="lock"
                        style={{ color: "rgba(255,255,255,.25)" }}
                      />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item style={{ color: "white" }}>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox style={{ color: "white" }}>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </LoginForm>
    );
  }
}

const NewLogin = Form.create({ name: "login" })(login);
export default NewLogin;
