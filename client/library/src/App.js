import React, { Component } from "react";
import "antd/es/layout/style/index.css";
import "antd/es/breadcrumb/style/index.css";
import "antd/dist/antd.css";
import Navbar from "./components/Navbar";
import Router from "./Router";
import Footer from "./components/Footer";
class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Router />
        <Footer />
      </div>
    );
  }
}

export default App;
