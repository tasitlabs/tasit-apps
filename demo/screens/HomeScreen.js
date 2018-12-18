import React from "react";
import Home from "../components/presentational/Home";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Home onPress={() => this.props.navigation.navigate("ListLandsScreen")} />
    );
  }
}
