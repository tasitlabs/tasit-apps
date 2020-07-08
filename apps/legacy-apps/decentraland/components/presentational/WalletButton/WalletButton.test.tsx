import React from "react";
import { shallow } from "enzyme";
import WalletButton from "../WalletButton";

describe("WalletButton", () => {
  it("renders the component", () => {
    const appName = "testing";
    const scheme = "test-scheme";
    const appSlug = "test-slug";
    expect(
      shallow(
        <WalletButton appName={appName} appSlug={appSlug} scheme={scheme} />
      )
    ).toMatchSnapshot();
  });
});
