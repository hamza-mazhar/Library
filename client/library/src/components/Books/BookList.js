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
      data: [],
      loading: true
    };
  }
  componentDidMount() {
    //console.log(localStorage.getItem("token"));
    this.setState({ loading: true });
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
          this.setState({ data: response.data, loading: false });
        }
      })
      .catch(error => {
        message.error("Something Went Wrong!");
        this.setState({ data: [], loading: false });
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
                  width: "16%",
                  marginTop: "20px"
                }}
                key={`${item._id}`}
              >
                <Link to={`/book/${item._id}`}>
                  <Card
                    key={`${item._id}`}
                    hoverable
                    loading={this.state.loading}
                    style={{ width: 210 }}
                    cover={
                      <img
                        alt="example"
                        src={item.image_url}
                        style={{ height: 210, width: "100%" }}
                      />
                    }
                  >
                    <Meta title={item.title} description={item.genres} />
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default BookList;
