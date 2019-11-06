import React from "react";
import { shallow } from "enzyme";
import EthereumQuestion from "@presentational/EthereumQuestion";

describe("EthereumQuestion", () => {
  it("renders the component", async () => {
    const onSignUp = () => {};
    const onSignIn = () => {};

    expect(
      shallow(<EthereumQuestion onSignUp={onSignUp} onSignIn={onSignIn} />)
    ).toMatchSnapshot();
  });
});
