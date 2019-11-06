import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "@constants/Colors";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import MyProfileCreationStatusItem from "@presentational/MyProfileCreationStatusItem";
import ActionStatus from "@constants/ActionStatus";
import MyProfileProgress from "@presentational/MyProfileProgress";
import Button from "@presentational/Button";

export default function MyProfile({ progress, creationSteps, onClick }) {
  return (
    <View style={styles.container}>
      <MyProfileProgress progress={progress} />
      <View style={styles.actionItemsContainer}>
        {creationSteps.map(action => {
          const { name, status } = action;

          return (
            <MyProfileCreationStatusItem
              key={name}
              name={name}
              status={status}
            />
          );
        })}
        {/* TODO: Break this component up into a smaller snapshot */}
        <View style={styles.buttonContainer}>
          <Button title="Connect wallet" onPress={onClick} />
        </View>
      </View>
    </View>
  );
}

MyProfile.propTypes = {
  progress: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  creationSteps: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(Object.values(ActionStatus)),
      name: PropTypes.string,
    })
  ),
};

const styles = StyleSheet.create({
  actionItemsContainer: {
    flex: 5,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: responsiveWidth(12),
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.backgroundColor,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
