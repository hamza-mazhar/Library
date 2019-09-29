import React, { Component } from "react";
import { Card, Button } from "antd";
import { useState } from "react";

const { Meta } = Card;
const Counthandler = () => {
  const [fruit, mango] = useState({ test: 0 });
  console.log(useState({ test: 0 }));
  const counfun = () => {
    const newCounterValue = fruit.test + 1;
    mango({ test: newCounterValue });
  };

  return (
    <div>
      <p>Counter is : {fruit.test}</p>
      <Button onClick={counfun}>Test</Button>
    </div>
  );
};

class ReduxExample extends Component {
  render() {
    return (
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
        <Counthandler />
      </Card>
    );
  }
}

export default ReduxExample;
