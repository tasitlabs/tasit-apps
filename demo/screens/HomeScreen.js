import React from "react";
import Home from "@presentational/Home";
import { NavigationEvents } from "react-navigation";
import { Action } from "tasit-sdk";
import tasitSdkConfig from "../config/default.js";

export default class HomeScreen extends React.Component {
  componentDidMount() {
    const { ConfigLoader } = Action;
    ConfigLoader.setConfig(tasitSdkConfig);
  }

  waitAndNavigate() {
    setTimeout(() => {
      this.props.navigation.navigate("ListLandsScreen");
    }, 1500);
  }

  render() {
    return (
      <React.Fragment>
        <NavigationEvents onDidFocus={() => this.waitAndNavigate()} />
        <Home />
      </React.Fragment>
    );
  }
}
