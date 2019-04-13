import React from "react";
import MyAccount from '@presentational/MyAccount'

export default class MyAccountScreen extends React.Component {

  static navigationOptions = {
    title: 'My Account',
  };

  render() {
    return (
      <MyAccount/>
    );
  }
}
