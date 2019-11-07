import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import Colors from "../constants/Colors";
import { MonoText } from "../components/StyledText";

const styles = StyleSheet.create({
  codeHighlightContainer: {
    backgroundColor: Colors.codeHighlightContainer,
    borderRadius: 3,
    paddingHorizontal: 4
  },
  codeHighlightText: {
    color: Colors.codeHighlightText
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  contentContainer: {
    paddingTop: 30
  },
  developmentModeText: {
    color: Colors.developmentModeText,
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 20,
    textAlign: "center"
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  getStartedText: {
    color: Colors.getStartedText,
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center"
  },
  helpContainer: {
    alignItems: "center",
    marginTop: 15
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    color: Colors.helpLinkText,
    fontSize: 14
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  navigationFilename: {
    marginTop: 5
  },
  tabBarInfoContainer: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: Colors.backgroundColorHome,
    paddingVertical: 20
  },
  tabBarInfoText: {
    color: Colors.tabBarInfoText,
    fontSize: 17,
    textAlign: "center"
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10
  },
  welcomeImage: {
    height: 80,
    marginLeft: -10,
    marginTop: 3,
    resizeMode: "contain",
    width: 100
  }
});

type HomeScreenProps = {
  header?: any;
};

/* eslint-disable react-native/no-raw-text */
export class HomeScreen extends React.Component<HomeScreenProps, {}> {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/robot-dev.png")
                  : require("../assets/images/robot-prod.png")
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            >
              <MonoText style={styles.codeHighlightText}>
                {"screens/HomeScreen.js"}
              </MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity
              onPress={this._handleHelpPress}
              style={styles.helpLink}
            >
              <Text style={styles.helpLinkText}>
                Help, it didn’t automatically reload!
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            This is a tab bar. You can edit it in:
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          >
            <MonoText style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </MonoText>
          </View>
        </View>
      </View>
    );
  }
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );
      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };
  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
}

export default HomeScreen;
