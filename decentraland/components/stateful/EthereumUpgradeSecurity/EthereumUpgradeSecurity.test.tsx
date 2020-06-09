import React from "react";
import { shallow } from "enzyme";
import EthereumUpgradeSecurity from ".";

describe("EthereumUpgradeSecurity", () => {
  it("renders the component", () => {
    expect(shallow(<EthereumUpgradeSecurity />)).toMatchSnapshot();
  });
});
