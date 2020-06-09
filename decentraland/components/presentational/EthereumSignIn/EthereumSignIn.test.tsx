import React from "react";
import { shallow } from "enzyme";
import EthereumSignIn from "../EthereumSignIn";

describe("EthereumSignIn", () => {
  it("renders the component", () => {
    expect(shallow(<EthereumSignIn />)).toMatchSnapshot();
  });
});
