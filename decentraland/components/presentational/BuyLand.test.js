import React from "react";
import { shallow } from "enzyme";
import BuyLand from "./BuyLand";
import { parcelForSale } from "./testHelpers";

describe("BuyLand", () => {
  describe("renders the component", () => {
    const onBuy = () => {};

    it("initial state - before start account setup", async () => {
      const waitingForAccountSetup = false;
      const accountSetupSteps = {
        fundedWithEthers: false,
        fundedWithMana: false,
        approvedMarketplace: false,
      };
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            waitingForAccountSetup={waitingForAccountSetup}
            accountSetupSteps={accountSetupSteps}
          />
        )
      ).toMatchSnapshot();
    });

    it("waiting for setup - waiting for ETH funding", async () => {
      const waitingForAccountSetup = true;
      const accountSetupSteps = {
        fundedWithEthers: false,
        fundedWithMana: false,
        approvedMarketplace: false,
      };
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            waitingForAccountSetup={waitingForAccountSetup}
            accountSetupSteps={accountSetupSteps}
          />
        )
      ).toMatchSnapshot();
    });

    it("waiting for setup - waiting for MANA funding and marketplace approval", async () => {
      const waitingForAccountSetup = true;
      const accountSetupSteps = {
        fundedWithEthers: true,
        fundedWithMana: false,
        approvedMarketplace: false,
      };
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            waitingForAccountSetup={waitingForAccountSetup}
            accountSetupSteps={accountSetupSteps}
          />
        )
      ).toMatchSnapshot();
    });

    it("waiting for setup - waiting for MANA funding", async () => {
      const waitingForAccountSetup = true;
      const accountSetupSteps = {
        fundedWithEthers: true,
        fundedWithMana: false,
        approvedMarketplace: true,
      };
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            waitingForAccountSetup={waitingForAccountSetup}
            accountSetupSteps={accountSetupSteps}
          />
        )
      ).toMatchSnapshot();
    });

    it("waiting for setup - waiting for marketplace approval", async () => {
      const waitingForAccountSetup = true;
      const accountSetupSteps = {
        fundedWithEthers: true,
        fundedWithMana: true,
        approvedMarketplace: false,
      };
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            waitingForAccountSetup={waitingForAccountSetup}
            accountSetupSteps={accountSetupSteps}
          />
        )
      ).toMatchSnapshot();
    });

    it("final state - account ready", async () => {
      const waitingForAccountSetup = false;
      const accountSetupSteps = {
        fundedWithEthers: true,
        fundedWithMana: true,
        approvedMarketplace: true,
      };
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            waitingForAccountSetup={waitingForAccountSetup}
            accountSetupSteps={accountSetupSteps}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
