// flow
import React, { Component } from "react";
import Slider from "react-slick";
import "react-slick/dist/react-slick.min";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "antd";
import styled from "styled-components";
import "./welcome.css";
import videoBg from "./video/norwaybg.mp4";
import mapAgeCleaner from "map-age-cleaner";
const CardText = styled.div`
  width: 600px;
  text-align: center;
  font-family: "Helvetica Neue", "Arial Nova", Helvetica, Arial, sans-serif;
  letter-spacing: 0.05em;
  color: var(--color-black);
  font-size: 16px;
  line-height: 1.8em;
  display: flex;
`;

const CardHeading = styled.div`
  font-size: 40px;
  line-height: 3rem;
  margin-bottom: 20px;
  text-align: center;
`;

class welcome extends Component {
  state = {
    textTags: [
      { key: "12123", label: "test" },
      { key: "32131", label: "pizza" },
      { key: "12354", label: "test" },
      { key: "13541", label: "match" },
      { key: "12312", label: "cricket" }
    ]
  };

  handleTags = value => {
    console.log("gettinng value from the selected tags", value);
    let classTag = document.getElementsByClassName(value)[0];
    classTag.style.display = "none";
  };

  render() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    return (
      <div>
        <div>
          <video
            src={videoBg}
            type="video/mp4"
            autoPlay="true"
            loop
            muted={true}
            style={{ width: "100%" }}
          >
            Here Comes Video
          </video>

          <div id="container">
            What we believe in
            <div id="flip">
              <div>
                <div> Analysis</div>
              </div>
              <div>
                <div>Design and Development</div>
              </div>
              <div>
                <div>Development and Maintenance</div>
              </div>
            </div>
            We are Creative.
          </div>
        </div>
        <br />
        <Card
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          bordered={false}
        >
          {this.state.textTags.map(data => {
            return (
              <span
                className={data.key}
                onClick={() => {
                  this.handleTags(data.key);
                }}
              >
                {data.label}{" "}
              </span>
            );
          })}
          <CardHeading>BOOKERS CLUB</CardHeading>
          <CardText>
            “I have a passion for teaching kids to become readers, to become
            comfortable with a book, not daunted. Books shouldn’t be daunting,
            they should be funny, exciting and wonderful; and learning to be a
            reader gives a terrific advantage.” – Roald Dahl
          </CardText>
        </Card>
        <br />
        <Slider {...settings}>
          <div>
            <img
              style={{ width: "100%", height: "400px" }}
              alt=""
              src="http://shineclassifieds.com/account/upload/dispay//15439022215c06140d0f666.jpg"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "400px" }}
              alt=""
              src="https://zegaea.com/img/EB/Fashion/ECS/CA/ECS%20shopbanner.jpg"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "400px" }}
              alt=""
              src="https://sweeps.penguinrandomhouse.com/sweep_assets/2451/hero0_1507920530676.jpg?time=1507920531373"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "400px" }}
              alt=""
              src="http://images6.fanpop.com/image/photos/40600000/Book-Banner-Header-booknerd-40619463-950-323.jpg"
            />
          </div>
        </Slider>
        <br />
        <br />
        <Card
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          bordered={false}
        >
          <CardHeading>BOOKERS CLUB</CardHeading>
          <CardText>
            “I have a passion for teaching kids to become readers, to become
            comfortable with a book, not daunted. Books shouldn’t be daunting,
            they should be funny, exciting and wonderful; and learning to be a
            reader gives a terrific advantage.” – Roald Dahly
          </CardText>
        </Card>
        {/* <video id="background-video" loop autoPlay>
          <source src="https://youtu.be/-MKapbz0GIo" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <br />
        <Card
          bordered={false}
          cover={
            <iframe
              width="100%"
              height="409"
              src="https://www.youtube.com/embed/nw59Nt5Hqhc?autoplay=1&mute=1"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          }
        />
        <Card
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          bordered={false}
        >
          <CardHeading>DISCOVERING BOOKERS</CardHeading>
          <CardText>
            “I have a passion for teaching kids to become readers, to become
            comfortable with a book, not daunted. Books shouldn’t be daunting,
            they should be funny, exciting and wonderful; and learning to be a
            reader gives a terrific advantage.” – Roald Dahl
          </CardText>
        </Card>
      </div>
    );
  }
}

export default welcome;
