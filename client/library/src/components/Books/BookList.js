import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Card, Row, Col, Button, message } from "antd";
const { Meta } = Card;
class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios
      .get("/api/books")
      .then(response => {
        console.log(response);
        if (response.data) {
          this.setState({ data: response.data });
        }
      })
      .catch(function(error) {
        message.error("Something Went Wrong!");
        this.setState({ data: [] });
      });
  }

  render() {
    const data = this.state.data;
    return (
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <Row gutter={16}>
          {data.map(item => {
            return (
              <Col
                span={5}
                style={{ paddingLeft: 2, paddingRight: 2, width: "20%" }}
              >
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src={item.image_url}
                      style={{ height: 238, width: "100%" }}
                    />
                  }
                >
                  <Meta title={item.title} description={item.genres} />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default BookList;
