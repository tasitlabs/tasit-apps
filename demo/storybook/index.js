import { getStorybookUI, configure } from "@storybook/react-native";
import { loadStories } from "./storyLoader";

import "./rn-addons";

configure(() => {
  loadStories();
}, module);

export const StorybookUI = getStorybookUI({
  port: 9001,
  host: "localhost",
  onDeviceUI: true,
});
