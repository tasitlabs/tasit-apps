import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "@constants/Colors";
import PropTypes from "prop-types";
import { responsiveHeight } from "react-native-responsive-dimensions";
import MyAccountCreationStatusItem from "./MyAccountCreationStatusItem";
import ActionStatus from "@constants/ActionStatus";
import MyAccountProgress from "./MyAccountProgress";

export default function MyAccount({ progress, creationActions }) {
  return (
    <View style={styles.container}>
      <MyAccountProgress progress={progress} />
      <View style={styles.actionItemsContainer}>
        {creationActions.map(action => {
          return (
            <MyAccountCreationStatusItem
              key={action.name}
              name={action.name}
              status={action.status}
            />
          );
        })}
      </View>
    </View>
  );
}

MyAccount.propTypes = {
  progress: PropTypes.number,
  creationActions: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(Object.values(ActionStatus)),
      name: PropTypes.string,
    })
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  actionItemsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: responsiveHeight(10),
  },
});
