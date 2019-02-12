import { registerRootComponent } from "expo";
import App from "./App";
import StorybookUI from "./storybook/index";

// Should we show storybook instead of our app?
// ⚠️ Leave this as `false` when checking into git.
const SHOW_STORYBOOK = false;

if (SHOW_STORYBOOK && __DEV__) {
  registerRootComponent(StorybookUI);
} else {
  registerRootComponent(App);
}
