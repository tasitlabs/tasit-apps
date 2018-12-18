import React from "react";
<<<<<<< HEAD
import Home from "@presentational/Home";
import { NavigationEvents } from "react-navigation";

export default class HomeScreen extends React.Component {
  waitAndNavigate() {
    setTimeout(() => {
      this.props.navigation.navigate("ListLandForSaleScreen");
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
=======
import Home from "../components/presentational/Home";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Home onPress={() => this.props.navigation.navigate("ListLandsScreen")} />
>>>>>>> Screen/Presentational components refactoring
    );
  }
}
