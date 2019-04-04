import React from "react";
import { shallow } from "enzyme";
import BuyLand from "./BuyLand";
import { parcelForSale } from "@helpers/testHelpers";
import AccountCreationStatus from "@constants/AccountCreationStatus";
const {
  NOT_STARTED,
  GENERATING_ACCOUNT,
  FUNDING_WITH_ETH,
  FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE,
  FUNDING_WITH_MANA,
  APPROVING_MARKETPLACE,
  READY_TO_USE,
} = AccountCreationStatus;

describe("BuyLand", () => {
  describe("renders the component", () => {
    const onBuy = () => {};

    it("initial state - before start account setup", async () => {
      const accountCreationStatus = NOT_STARTED;

      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            accountCreationStatus={accountCreationStatus}
          />
        )
      ).toMatchSnapshot();
    });

    it("waiting for setup - waiting for account generation", async () => {
      const accountCreationStatus = GENERATING_ACCOUNT;
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            accountCreationStatus={accountCreationStatus}
          />
        )
      ).toMatchSnapshot();
    });

    it("waiting for setup - waiting for ETH funding", async () => {
      const accountCreationStatus = FUNDING_WITH_ETH;
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            accountCreationStatus={accountCreationStatus}
          />
        )
      ).toMatchSnapshot();
    });

    it("waiting for setup - waiting for MANA funding and marketplace approval", async () => {
      const accountCreationStatus = FUNDING_WITH_MANA_AND_APPROVING_MARKETPLACE;
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            accountCreationStatus={accountCreationStatus}
          />
        )
      ).toMatchSnapshot();
    });

    it("waiting for setup - waiting for MANA funding", async () => {
      const accountCreationStatus = FUNDING_WITH_MANA;
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            accountCreationStatus={accountCreationStatus}
          />
        )
      ).toMatchSnapshot();
    });

    it("waiting for setup - waiting for marketplace approval", async () => {
      const accountCreationStatus = APPROVING_MARKETPLACE;
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            accountCreationStatus={accountCreationStatus}
          />
        )
      ).toMatchSnapshot();
    });

    it("final state - account ready", async () => {
      const accountCreationStatus = READY_TO_USE;
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            accountCreationStatus={accountCreationStatus}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
