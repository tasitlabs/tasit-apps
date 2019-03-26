import React from "react";
import LargeText from "@presentational/LargeText";

export default class MyAssetsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "My Assets",
  };

  render() {
    return (
      <React.Fragment>
        <LargeText>My assets!</LargeText>
      </React.Fragment>
    );
  }
}
