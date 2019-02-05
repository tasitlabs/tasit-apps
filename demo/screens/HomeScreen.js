import React from "react";
import Home from "@presentational/Home";
import { NavigationEvents } from "react-navigation";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Home onPress={() => this.props.navigation.navigate("ListLandsScreen")} />
      <React.Fragment>
        <NavigationEvents onDidFocus={() => this.waitAndNavigate()} />
        <Home />
      </React.Fragment>
    );
  }
}
