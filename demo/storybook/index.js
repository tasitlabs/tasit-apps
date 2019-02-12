import {
  getStorybookUI,
  configure,
  addDecorator,
} from "@storybook/react-native";
import { loadStories } from "./storyLoader";
import { StoryScreen } from "./views/StoryScreen";

import "./rn-addons";

addDecorator(StoryScreen);

configure(() => {
  loadStories();
}, module);

const StorybookUI = getStorybookUI({
  port: 9001,
  host: "localhost",
  onDeviceUI: true,
});

export default StorybookUI;
