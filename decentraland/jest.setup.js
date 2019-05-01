import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { prepareAndLoadConfig } from "./helpers/starter";

Enzyme.configure({ adapter: new Adapter() });

beforeAll(async () => {
  await prepareAndLoadConfig("testnet");
});
