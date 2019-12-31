import React, { Component } from "react";
import { Button, Form, Card, Input, Icon, Checkbox, message } from "antd";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./login.css";
import Background from "../images/loginForm.jpg";
const LoginForm = styled.div``;
class ForgetPass extends Component {
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
        console.log("Received values of form: ", values);
        axios({
          method: "post",
          url: "/user/forgot_password",
          data: {
            email: values.email
          }
        })
          .then((req, res) => {
            console.log("client forgot pass=>", req);
          })
          .catch(err => {
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
            backgroundImage: `url(${Background})`
          }}
        >
          <Card
            title="Account Recovery"
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
                      message: "Please enter your Email!"
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
                    placeholder="Enter YOUR Email"
                  />
                )}
              </Form.Item>

              <Form.Item style={{ color: "white" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Submit
                </Button>
                Or <Link to="/login">Login now!</Link>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </LoginForm>
    );
  }
}

const ForgetLogin = Form.create({ name: "login" })(ForgetPass);
export default ForgetLogin;
