import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { responsiveHeight } from "react-native-responsive-dimensions";
import LargeText from "../LargeText";
import TinyLink from "../TinyLink";
import Button from "../Button";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
  container: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
  privacyPolicyView: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
});

interface OnboardingHomeProps {
  onPress: (...args: any[]) => any;
}

const OnboardingHome: React.FunctionComponent<OnboardingHomeProps> = React.memo(
  props => {
    const privacyPolicyText = `Tasit privacy policy`;
    const privacyPolicyUrl = `https://privacy.tasit.io/`;

    return (
      <View style={styles.container}>
        <Image source={require("../../../assets/images/icon.png")} />
        <LargeText>{`Let's get you set up with a secure way to store this land!`}</LargeText>
        <View style={styles.buttonView}>
          <Button title="Get started" onPress={props.onPress} />
        </View>
        <View style={styles.privacyPolicyView}>
          <TinyLink url={privacyPolicyUrl} text={privacyPolicyText} />
        </View>
      </View>
    );
  }
);

export default OnboardingHome;
