import React from "react";
import { shallow } from "enzyme";
import LinkToEtherscan from "./LinkToEtherscan";
import { anAction } from "@helpers/testHelpers";

describe("LinkToEtherscan", () => {
  describe("renders the component", () => {
    it("null action", async () => {
      const action = null;
      expect(shallow(<LinkToEtherscan action={action} />)).toMatchSnapshot();
    });

    it("valid action", async () => {
      const action = anAction;
      expect(shallow(<LinkToEtherscan action={action} />)).toMatchSnapshot();
    });
  });
});
