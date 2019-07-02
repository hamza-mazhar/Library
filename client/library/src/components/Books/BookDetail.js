import React, { Component } from "react";
import { message, Card, Button } from "antd";
import axios from "axios";
import styled from "styled-components";
import ReactImageMagnify from "react-image-magnify";

const BodyContainer = styled.div`
  display: flex;
`;
const BookImage = styled.div`
  color: white;
`;
const AuthorName = styled.div`
  color: white;
  font-weight: 500;
`;
const BookDesc = styled.div`
  color: white;
  font-weight: 400;
  letter-spacing: 1px;
  font-family: sans-serif;
  padding-top: 10px;
  text-align: justify;
  padding-right: 250px;
`;
const BookHeading = styled.div`
  font-size: 30px;
  color: white;
  font-family: sans-serif;
  font-weight: 600;
`;
const DetailContainer = styled.div`
  padding-left: 5%;
`;
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
      <div
        style={{
          padding: "4% 4%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage: `url(https://images.template.net/wp-content/uploads/2014/10/pattern-background1.jpg)`
        }}
      >
        <BodyContainer>
          <BookImage>
            {/* <img
              alt="example"
              src={this.state.data.image_url}
              style={{
                width: "230px",
                height: "300px"
              }}
            /> */}
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  width: 230,
                  height: 300,
                  src: this.state.data.image_url
                },
                largeImage: {
                  src: this.state.data.image_url,
                  width: 400,
                  height: 800
                }
              }}
            />
          </BookImage>
          <DetailContainer>
            <BookHeading>{this.state.data.title}</BookHeading>
            <AuthorName>
              Author&nbsp;:&nbsp;&nbsp;{this.state.data.author}{" "}
            </AuthorName>
            <AuthorName>
              Genre&nbsp;:&nbsp;&nbsp;{this.state.data.genres}{" "}
            </AuthorName>
            <AuthorName>
              Pages&nbsp;:&nbsp;&nbsp;{this.state.data.pages}{" "}
            </AuthorName>
            <AuthorName>
              Publisher&nbsp;:&nbsp;&nbsp;{this.state.data.publisher}{" "}
            </AuthorName>
            <BookDesc>{this.state.data.description}</BookDesc>
          </DetailContainer>
        </BodyContainer>
      </div>
    );
  }
}

export default BookDetail;
