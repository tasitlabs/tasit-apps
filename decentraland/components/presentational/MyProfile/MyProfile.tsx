import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../../constants/Colors";

import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import MyProfileCreationStatusItem from "../MyProfileCreationStatusItem";
import MyProfileProgress from "../MyProfileProgress";
import Button from "../Button";

import ActionStatus from "../../../types/ActionStatus";

const styles = StyleSheet.create({
  actionItemsContainer: {
    flex: 1,
    // flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: responsiveHeight(3),
      },
  buttonContainer: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  creationSteps: {
    alignSelf: "flex-start",
    paddingLeft: responsiveWidth(12),
  },
  firstButton: {
    marginBottom: responsiveHeight(1),
  },
});

interface CreationStepObject {
  status: ActionStatus;
  name: string;
}

interface MyProfileProps {
  progress: number;
  onConnectClick: (...args: any[]) => any;
  onUpgradeSecurityClick: (...args: any[]) => any;
  creationSteps: CreationStepObject[];
  securityLabel: string;
}

const MyProfile: React.FunctionComponent<MyProfileProps> = ({
  progress,
  creationSteps,
  onConnectClick,
  securityLabel,
  onUpgradeSecurityClick,
}) => {
  return (
    <View style={styles.container}>
      <MyProfileProgress progress={progress} />
      <View style={styles.actionItemsContainer}>
        <View style={styles.creationSteps}>
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
        </View>

        {/* TODO: Break this component up into a smaller snapshot */}
        <View style={styles.buttonContainer}>
          <View style={styles.firstButton}>
            <Button title="Move funds" onPress={onConnectClick} />
          </View>
          <View>
            <Button title="Upgrade security" onPress={onUpgradeSecurityClick} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyProfile;
