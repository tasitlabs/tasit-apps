import React from "react";
import { shallow } from "enzyme";
import WalletButton from "@presentational/WalletButton";

describe("WalletButton", () => {
  it("renders the component", async () => {
    const onConnect = () => {};
    expect(shallow(<WalletButton onConnect={onConnect} />)).toMatchSnapshot();
  });
});
