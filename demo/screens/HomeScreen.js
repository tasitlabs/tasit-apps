import React from "react";
import Home from "@presentational/Home";
import { NavigationEvents } from "react-navigation";

export default class HomeScreen extends React.Component {
  waitAndNavigate() {
    setTimeout(() => {
      this.props.navigation.navigate("ListLandsForSaleScreen");
    }, 1500);
  }

  // This screen should shows something nice-looking
  // if the connection to the blockchain can't be estabilished.
  render() {
    return (
      <React.Fragment>
        <NavigationEvents onDidFocus={() => this.waitAndNavigate()} />
        <Home />
      </React.Fragment>
    );
  }
}
