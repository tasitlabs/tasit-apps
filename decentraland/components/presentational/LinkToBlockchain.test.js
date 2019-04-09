import React from "react";
import { shallow } from "enzyme";
import LinkToBlockchain from "./LinkToBlockchain";
import { anAction } from "@helpers/testHelpers";

describe("LinkToBlockchain", () => {
  describe("renders the component", () => {
    it("null action", async () => {
      const action = null;
      expect(shallow(<LinkToBlockchain action={action} />)).toMatchSnapshot();
    });

    it("valid action", async () => {
      const action = anAction;
      expect(shallow(<LinkToBlockchain action={action} />)).toMatchSnapshot();
    });
  });
});
