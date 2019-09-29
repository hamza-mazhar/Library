import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Card, Row, Col, Button, message, Spin, Switch } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchbooksAction from "./networkCall";
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

  componentWillMount() {
    console.log(this.props);
    console.log("++++++++++++++");
    const { fetchBooks } = this.props;
    fetchBooks();
  }

  componentDidMount() {
    //console.log(localStorage.getItem("token"));
    // this.setState({ loading: true });
    // axios({
    //   method: "get",
    //   url: "/api/books",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     authorization: localStorage.getItem("token")
    //   }
    // })
    //   // .get("/api/books")
    //   .then(response => {
    //     if (response.data) {
    //       this.setState({ data: response.data, loading: false });
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     message.error("Login Again Your Access Token is Expire");
    //     this.setState({ data: [], loading: false });
    //   });
  }

  handleNewPage = url => {
    console.log(url);
    window.open(url, "_blank");
  };

  render() {
    const data = this.props.books.data;
    return (
      <div
        style={{
          background: "#ECECEC",
          padding: "30px",
          paddingTop: "6%",
          backgroundImage: `url(https://images.template.net/wp-content/uploads/2014/10/pattern-background1.jpg)`
        }}
      >
        <NewBookButton>
          <Link to="/newBook">
            <Button type="primary" icon="plus">
              New Book
            </Button>
          </Link>
        </NewBookButton>
        <br />
        <Spin spinning={this.props.books.loading}>
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
                  {/* <Link to={`/book/${item._id}`}> */}
                  <Card
                    key={`${item._id}`}
                    hoverable
                    loading={this.state.loading}
                    onClick={() => this.handleNewPage(`/book/${item._id}`)}
                    // loading={this.state.loading}
                    loading={this.props.books.loading}
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
                  {/* </Link> */}
                </Col>
              );
            })}
          </Row>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBooks: fetchbooksAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList);

// export default BookList;
