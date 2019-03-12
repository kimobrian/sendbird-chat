import React, { Component } from "react";

class GroupChannel extends Component {
  constructor() {
    super();
    this.state = {
      joinChannel: false,
      groupChannelListQuery: null
    };
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }

  render() {
    return <p>{this.state.someKey}</p>;
  }
}

export default GroupChannel;
