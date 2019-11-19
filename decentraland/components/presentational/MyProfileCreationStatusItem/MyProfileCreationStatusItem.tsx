import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/Colors";

import { Ionicons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import ActionStatus from "../../../types/ActionStatus";

const ICON_SIZE = responsiveFontSize(4);
const FONT_SIZE = (ICON_SIZE * 7) / 10;

const styles = StyleSheet.create({
  actionStatusIcon: {
    color: Colors.icons,
    fontWeight: "800",
  },
  actionText: {
    color: Colors.textColor,
    fontSize: FONT_SIZE,
    fontWeight: "800",
    marginLeft: responsiveWidth(5),
  },
  container: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: responsiveHeight(2),
    width: responsiveWidth(65),
  },
});

function renderIcon(status): JSX.Element {
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

interface MyProfileCreationStatusItemProps {
  name: string;
  status: ActionStatus;
}

const MyProfileCreationStatusItem: React.FunctionComponent<MyProfileCreationStatusItemProps> = ({
  name,
  status,
}) => {
  return (
    <View style={styles.container}>
      {renderIcon(status)}
      <Text style={styles.actionText}>{name}</Text>
    </View>
  );
};

export default MyProfileCreationStatusItem;
