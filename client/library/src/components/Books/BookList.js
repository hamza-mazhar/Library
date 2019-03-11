import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Card, Row, Col, Button, message } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const NewBookButton = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    //console.log(localStorage.getItem("token"));
    axios({
      method: "get",
      url: "/api/books",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: localStorage.getItem("token")
      }
    })
      // .get("/api/books")
      .then(response => {
        //console.log(response);
        if (response.data) {
          this.setState({ data: response.data });
        }
      })
      .catch(error => {
        message.error("Something Went Wrong!");
        this.setState({ data: [] });
      });
  }

  render() {
    const data = this.state.data;
    return (
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <NewBookButton>
          <Link to="/newBook">
            <Button type="primary" icon="plus">
              New Book
            </Button>
          </Link>
        </NewBookButton>
        <br />
        <Row gutter={16}>
          {data.map(item => {
            return (
              <Col
                span={5}
                style={{
                  width: "20%",
                  marginTop: "20px"
                }}
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
