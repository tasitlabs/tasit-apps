import React from "react";
import Home from "@presentational/Home";
import { Action } from "tasit-sdk";
import tasitSdkConfig from "../config/default.js";

export default class HomeScreen extends React.Component {
  componentDidMount() {
    const { ConfigLoader } = Action;
    ConfigLoader.setConfig(tasitSdkConfig);
  }

  render() {
    return (
      <Home onPress={() => this.props.navigation.navigate("ListLandsScreen")} />
    );
  }
}
