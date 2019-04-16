import React from "react";
import { shallow } from "enzyme";
import { MyAccountScreen } from "./MyAccountScreen";
import AccountCreationStatus from "@constants/AccountCreationStatus";

describe("MyAccountScreen", () => {
  describe("renders the component", () => {
    it("without account", async () => {
      expect(
        shallow(
          <MyAccountScreen
            accountInfo={{
              account: null,
              creationActions: {},
            }}
          />
        )
      ).toMatchSnapshot();
    });

    it("with account", async () => {
      expect(
        shallow(
          <MyAccountScreen
            accountInfo={{
              account: {},
              creationActions: {
                [AccountCreationStatus.FUNDING_WITH_ETH]: {},
              },
            }}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
