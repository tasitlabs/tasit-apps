import React from "react";
import { shallow } from "enzyme";
import EthereumQuestion from "../EthereumQuestion";

describe("EthereumQuestion", () => {
  it("renders the component", () => {
    const onSignUp = () => {};
    const onSignIn = () => {};

    expect(
      shallow(<EthereumQuestion onSignUp={onSignUp} onSignIn={onSignIn} />)
    ).toMatchSnapshot();
  });
});
