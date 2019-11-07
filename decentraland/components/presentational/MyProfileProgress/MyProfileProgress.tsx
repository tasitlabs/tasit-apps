import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import ProgressBar from "react-native-progress/Bar";

interface MyProfileProgressProps {
  progress: number;
}

export const MyProfileProgress: React.SFC<MyProfileProgressProps> = ({
  progress,
}) => {
  return (
    <View style={styles.container}>
      <ProgressBar
        borderRadius={0}
        borderWidth={0}
        color={Colors.loadingColor}
        height={responsiveHeight(1)}
        progress={progress}
        unfilledColor={Colors.textColor}
        width={responsiveWidth(100)}
      />
      <MyProfileProgressText progress={progress} />
    </View>
  );
};

interface MyProfileProgressTextProps {
  progress: number;
}

export const MyProfileProgressText: React.SFC<MyProfileProgressTextProps> = ({
  progress,
}) => {
  const formattedProgress = Math.round(progress * 100);

  return (
    <View style={styles.progressTextContainer}>
      <Text style={styles.progressText}>{formattedProgress}% complete</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  progressText: {
    color: Colors.textColor,
    fontWeight: "800",
  },
  progressTextContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: responsiveHeight(1),
  },
});

export default MyProfileProgress;
