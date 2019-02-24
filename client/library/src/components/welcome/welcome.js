//import { Card } from "antd";
import React, { Component } from "react";
import Slider from "react-slick";
import "react-slick/dist/react-slick.min";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class welcome extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img
              style={{ width: "100%" }}
              src="https://s3-us-west-2.amazonaws.com/cdn.adopting.com/site/blog/hero/adoption-books-for-valentines-day.jpg"
            />
          </div>
          <div>
            <img
              style={{ width: "100%" }}
              src="https://cdn.theculturetrip.com/wp-content/uploads/2017/12/9201778105_3227b07a92_k-1024x768.jpg"
            />
          </div>
          <div>
            <img
              style={{ width: "100%" }}
              src="https://wersm.com/wp-content/uploads/2019/01/wersm-january-marketing-books-list.png"
            />
          </div>
          <div>
            <img
              style={{ width: "100%" }}
              src="https://i.pinimg.com/originals/be/1e/f3/be1ef37e0b9706f8d72d7a167fcd6eaf.jpg"
            />
          </div>
        </Slider>
      </div>
    );
  }
}

export default welcome;
