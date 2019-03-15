import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import tasitSdkConfig from "./config/default.js";
import { Action } from "tasit-sdk";

Enzyme.configure({ adapter: new Adapter() });

const { ConfigLoader } = Action;
ConfigLoader.setConfig(tasitSdkConfig);
