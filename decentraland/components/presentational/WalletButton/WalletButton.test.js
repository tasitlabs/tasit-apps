import React from "react";
import { shallow } from "enzyme";
import WalletButton from "@presentational/WalletButton";

describe("WalletButton", () => {
  it("renders the component", async () => {
    const appName = "testing";
    const scheme = "test-scheme";
    expect(
      shallow(<WalletButton appName={appName} scheme={scheme} />)
    ).toMatchSnapshot();
  });
});
