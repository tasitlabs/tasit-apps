import React from "react";
import { shallow } from "enzyme";
import { MyAccountScreen } from "./MyAccountScreen";
import {
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
} from "@constants/AccountCreationStatus";

describe("MyAccountScreen", () => {
  describe("renders the component", () => {
    it("initial state (without account)", async () => {
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

    it("funding with ethers", async () => {
      expect(
        shallow(
          <MyAccountScreen
            accountInfo={{
              account: {},
              creationActions: {
                [FUNDING_WITH_ETH]: {},
              },
            }}
          />
        )
      ).toMatchSnapshot();
    });

    it("funding with ethers with null action (used when action is unknowed)", async () => {
      expect(
        shallow(
          <MyAccountScreen
            accountInfo={{
              account: {},
              creationActions: {
                [FUNDING_WITH_ETH]: null,
              },
            }}
          />
        )
      ).toMatchSnapshot();
    });

    it("funding with mana AND approving marketplace", async () => {
      expect(
        shallow(
          <MyAccountScreen
            accountInfo={{
              account: {},
              creationActions: {
                [FUNDING_WITH_ETH]: {},
                [FUNDING_WITH_MANA]: {},
                [APPROVING_MARKETPLACE]: {},
              },
            }}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
