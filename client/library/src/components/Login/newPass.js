import React from "react";
import { Form, Input, Button, message, AutoComplete } from "antd";
import axios from "axios";
const AutoCompleteOption = AutoComplete.Option;

class SignUp extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { params } = this.props.match;
        const { token } = params;
        console.log("Received values of form: ", values, token);
        axios({
          method: "post",
          url: "/user/reset_password",
          data: {
            token: token,
            password: values.password
          }
        })
          .then((req, res) => {
            message.success("Successful Changed Pass!");
            // window.location.replace("/");
          })
          .catch(err => {
            message.error("Invalid Email or Password!");
          });
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div
        style={{
          paddingTop: "5%",
          paddingBottom: "5%",
          paddingLeft: "30%",
          paddingRight: "30%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage: `url(https://backgroundcheckall.com/wp-content/uploads/2017/12/registration-page-background-images-8.jpg)`
        }}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Password">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item label="Confirm Password">
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const SignUpForm = Form.create({ name: "register" })(SignUp);

export default SignUpForm;
