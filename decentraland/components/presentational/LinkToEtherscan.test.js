import React from "react";
import { shallow } from "enzyme";
import LinkToEtherscan from "./LinkToEtherscan";

describe("LinkToEtherscan", () => {
  describe("renders the component", () => {
    it("null account", async () => {
      const account = null;
      expect(shallow(<LinkToEtherscan account={account} />)).toMatchSnapshot();
    });

    it("valid account", async () => {
      const account = { address: "0x1234567890123456789012345678901234567890" };
      expect(shallow(<LinkToEtherscan account={account} />)).toMatchSnapshot();
    });
  });
});
