import React from "react";
import { shallow } from "enzyme";
import EthereumSignUp from "../EthereumSignUp";

describe("EthereumSignUp", () => {
  it("renders the component", () => {
    const onSignUp = () => {};
    expect(shallow(<EthereumSignUp onSignUp={onSignUp} />)).toMatchSnapshot();
  });
});
