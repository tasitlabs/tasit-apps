import React from "react";
import { shallow } from "enzyme";
import LinkToBlockchain from "./LinkToBlockchain";
import { anTempAction } from "@helpers/testHelpers";

describe("LinkToBlockchain", () => {
  describe("renders the component", () => {
    it("null action", async () => {
      const actionId = null;
      expect(
        shallow(<LinkToBlockchain actionId={actionId} />)
      ).toMatchSnapshot();
    });

    it("valid action", async () => {
      const actionId = await anTempAction.getId();
      expect(
        shallow(<LinkToBlockchain actionId={actionId} />)
      ).toMatchSnapshot();
    });
  });
});
