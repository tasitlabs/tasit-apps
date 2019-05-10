import React from "react";
import { shallow } from "enzyme";
import EthereumSignUp from "@presentational/EthereumSignUp";

describe("EthereumSignUp", () => {
  it("renders the component", async () => {
    const onSignUp = () => {};
    expect(shallow(<EthereumSignUp onSignUp={onSignUp} />)).toMatchSnapshot();
  });
});
