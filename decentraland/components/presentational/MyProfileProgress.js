import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@shared-constants/Colors";
import ProgressBar from "react-native-progress/Bar";
import PropTypes from "prop-types";

export function MyProfileProgress({ progress }) {
  return (
    <View style={styles.container}>
      <ProgressBar
        progress={progress}
        color={Colors.loadingColor}
        borderWidth={0}
        unfilledColor={Colors.textColor}
        height={responsiveHeight(1)}
        width={responsiveWidth(100)}
        borderRadius={0}
      />
      <MyProfileProgressText progress={progress} />
    </View>
  );
}

MyProfileProgress.propTypes = {
  progress: PropTypes.number,
};

export function MyProfileProgressText({ progress }) {
  const formattedProgress = Math.round(progress * 100);

  return (
    <View style={styles.progressTextContainer}>
      <Text style={styles.progressText}>{formattedProgress}% complete</Text>
    </View>
  );
}

MyProfileProgressText.propTypes = {
  progress: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  progressTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: responsiveHeight(1),
  },
  progressText: {
    fontWeight: "800",
    color: Colors.textColor,
  },
});

export default MyProfileProgress;
