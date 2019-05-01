import React from "react";
import { shallow } from "enzyme";
import { MyProfileScreen } from "./MyProfileScreen";
import {
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
} from "@constants/AccountCreationStatus";

describe("MyProfileScreen", () => {
  describe("renders the component", () => {
    it("initial state (without account)", async () => {
      expect(
        shallow(
          <MyProfileScreen
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
          <MyProfileScreen
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

    it("funding with ethers with null action (used when action is unknown)", async () => {
      expect(
        shallow(
          <MyProfileScreen
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
          <MyProfileScreen
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
