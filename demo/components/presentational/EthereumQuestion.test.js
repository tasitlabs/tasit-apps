import React from "react";
import { shallow } from "enzyme";
import EthereumQuestion from "./EthereumQuestion";

describe("EthereumQuestion", () => {
  it("renders the component", async () => {
    expect(
      shallow(<EthereumQuestion onSignUp={() => {}} onSignIn={() => {}} />)
    ).toMatchSnapshot();
  });
});
