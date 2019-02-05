import React from "react";
import Home from "@presentational/Home";
import { NavigationEvents } from "react-navigation";

export default class HomeScreen extends React.Component {
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
