import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Card, Button, Select, Input, Form, message } from "antd";
import "./createBook.css";
const { Option } = Select;
const BookForm = styled.div``;
class CreateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        axios({
          method: "post",
          url: "/api/book",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token")
          },
          data: {
            title: values.title,
            author: values.author,
            buy_url: values.buyUri,
            desc: values.desc,
            genres: values.genre,
            image_url: values.imgUri,
            pages: values.pages,
            publisher: values.publisher
          }
        })
          .then(response => {
            if (response.data) {
              message.success("Successfully Added!");
              window.location.replace("/books");
            }
          })
          .catch(function(error) {
            message.error("Already Exists");
            this.setState({ data: [] });
          });
      }
    });
  };

  handleSelectChange = value => {
    console.log(value);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <BookForm>
        <div
          style={{
            paddingLeft: "20%",
            paddingRight: "20%",
            paddingTop: "5%",
            paddingBottom: "5%",
            backgroundImage: `url(http://culture.affinitymagazine.us/wp-content/uploads/2017/05/635873821517718970351055939_Stack-of-books-great-education.jpg)`
          }}
        >
          <Card
            title="Create New Book"
            bordered={false}
            style={{
              width: "100%",
              color: "white",
              background: "rgba(0,0,0,0.5)"
            }}
          >
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="Title">
                {getFieldDecorator("title", {
                  rules: [{ required: true, message: "Enter Title!" }]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Description">
                {getFieldDecorator("desc", {
                  rules: [{ required: true, message: "Enter Description!" }]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Author">
                {getFieldDecorator("author", {
                  rules: [{ required: true, message: "Enter Author Name!" }]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Publisher">
                {getFieldDecorator("publisher", {
                  rules: [{ required: true, message: "Enter Publisher Name!" }]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Pages">
                {getFieldDecorator("pages", {
                  rules: [{ required: true, message: "Enter No of Pages!" }]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Genre">
                {getFieldDecorator("genre", {
                  rules: [{ required: true, message: "Select Genres!" }]
                })(
                  <Select
                    placeholder="Select the Genre"
                    onChange={this.handleSelectChange}
                  >
                    <Option value="fantasy">Fantasy</Option>
                    <Option value="thriller">Thriller</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="Image Url">
                {getFieldDecorator("imgUri", {
                  rules: [{ required: true, message: "Enter Image Url!" }]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Buy Url">
                {getFieldDecorator("buyUri", {
                  rules: [{ required: true, message: "Enter Buy Url!" }]
                })(<Input />)}
              </Form.Item>
              <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </BookForm>
    );
  }
}
const NewBook = Form.create({ name: "newBook" })(CreateBook);
export default NewBook;
