import React, { Component } from "react";
import { message, Card, Button } from "antd";
import axios from "axios";

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }
  componentDidMount() {
    const { params } = this.props.match;
    const { id } = params;
    console.log(id);
    axios({
      method: "get",
      url: `/api/book/${id}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: localStorage.getItem("token")
      }
    })
      // .get("/api/books")
      .then(response => {
        //console.log(response);
        if (response.data) {
          this.setState({ data: response.data, loading: false });
        }
      })
      .catch(error => {
        message.error("Something Went Wrong!");
        this.setState({ data: [], loading: false });
      });
  }
  render() {
    console.log(this.state.data);
    return (
      <Card loading={this.state.loading}>
        <h1>{this.state.data.title}</h1>
      </Card>
    );
  }
}

export default BookDetail;
