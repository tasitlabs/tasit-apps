import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "@constants/Colors";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import ActionStatus from "@constants/ActionStatus";

export default function MyAccountCreationStatusItem({ name, status }) {
  return (
    <View style={styles.container}>
      {renderIcon(status)}
      <Text style={styles.actionText}>{name}</Text>
    </View>
  );
}

const ICON_SIZE = 30;
const FONT_SIZE = (ICON_SIZE * 7) / 10;

function renderIcon(status) {
  if (status === ActionStatus.DONE) {
    return (
      <Ionicons
        name="md-checkmark"
        size={(ICON_SIZE * 3) / 5}
        style={styles.actionStatusIcon}
      />
    );
  }
  if (status === ActionStatus.PENDING) {
    return (
      <Ionicons
        name="md-clock"
        size={ICON_SIZE}
        style={styles.actionStatusIcon}
      />
    );
  }
  return (
    <Ionicons
      name="ios-close"
      size={ICON_SIZE}
      style={styles.actionStatusIcon}
    />
  );
}

MyAccountCreationStatusItem.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(ActionStatus)).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.backgroundColor,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: responsiveHeight(1),
    height: responsiveHeight(6),
  },
  actionStatusIcon: {
    fontWeight: "800",
  },
  actionText: {
    fontSize: FONT_SIZE,
    fontWeight: "800",
    marginLeft: responsiveWidth(5),
  },
});
