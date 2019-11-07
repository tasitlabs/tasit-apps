import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../../constants/Colors";

import { responsiveWidth } from "react-native-responsive-dimensions";
import MyProfileCreationStatusItem from "../MyProfileCreationStatusItem";
import MyProfileProgress from "../MyProfileProgress";
import Button from "../Button";

import ActionStatus from "../../../types/ActionStatus";

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

interface CreationStepObject {
  status: ActionStatus;
  name: string;
}

interface MyProfileProps {
  progress: number;
  onClick: any; // TODO: Convert to function type
  creationSteps: CreationStepObject[];
}

const MyProfile: React.SFC<MyProfileProps> = ({
  progress,
  creationSteps,
  onClick,
}) => {
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
};

export default MyProfile;
