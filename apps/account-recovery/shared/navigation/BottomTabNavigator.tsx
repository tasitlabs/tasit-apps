import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AccountScreen from "../../screens/AccountScreen";
import ContractBasedAccountScreen from "../../screens/ContractBasedAccountScreen";
import {
  BottomTabParamList,
  AccountParamList,
  ContractBasedAccountParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const TabBarIconComponent = ({ color }: { color: string }) => (
  <TabBarIcon name="ios-code" color={color} />
);

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Account"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Account"
        component={AccoutNavigator}
        options={{
          tabBarIcon: TabBarIconComponent,
        }}
      />
      <BottomTab.Screen
        name="Contract-based account"
        component={ContractBasedAccoutNavigator}
        options={{
          tabBarIcon: TabBarIconComponent,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<AccountParamList>();

function AccoutNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerTitle: "Account" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<ContractBasedAccountParamList>();

function ContractBasedAccoutNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="ContractBasedAccountScreen"
        component={ContractBasedAccountScreen}
        options={{ headerTitle: "Contract-based account" }}
      />
    </TabTwoStack.Navigator>
  );
}
