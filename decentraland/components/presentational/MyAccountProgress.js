import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@constants/Colors";
import ProgressBar from "react-native-progress/Bar";
import PropTypes from "prop-types";

export function MyAccountProgress({ progress }) {
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
      <MyAccountProgressText progress={progress} />
    </View>
  );
}

MyAccountProgress.propTypes = {
  progress: PropTypes.number,
};

export function MyAccountProgressText({ progress }) {
  const formattedProgress = Math.round(progress * 100);

  return (
    <View style={styles.progressTextContainer}>
      <Text style={styles.progressText}>{formattedProgress}% complete</Text>
    </View>
  );
}

MyAccountProgressText.propTypes = {
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
  },
  progressText: {
    fontWeight: "800",
  },
});

export default MyAccountProgress;
