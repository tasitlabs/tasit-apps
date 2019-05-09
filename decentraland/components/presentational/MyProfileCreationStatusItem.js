import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "@shared-constants/Colors";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import ActionStatus from "@constants/ActionStatus";

export default function MyProfileCreationStatusItem({ name, status }) {
  return (
    <View style={styles.container}>
      {renderIcon(status)}
      <Text style={styles.actionText}>{name}</Text>
    </View>
  );
}

const ICON_SIZE = responsiveFontSize(4);
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

MyProfileCreationStatusItem.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(ActionStatus)).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: responsiveHeight(2),
    width: responsiveWidth(65),
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
