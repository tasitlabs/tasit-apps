import React from "react";
import { shallow } from "enzyme";
import BuyLand from "./BuyLand";
import { parcelForSale } from "./testHelpers";

describe("BuyLand", () => {
  describe("renders the component", () => {
    const onBuy = () => {};

    it("initial state - before start account setup", async () => {
      const accountInfo = {
        account: null,
        setupInProgress: false,
        fundedWithEthers: false,
        fundedWithMana: false,
        approvedMarketplace: false,
      };
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            accountInfo={accountInfo}
          />
        )
      ).toMatchSnapshot();
    });

    it("waiting for setup - waiting for account generation", async () => {
      const accountInfo = {
        account: null,
        setupInProgress: true,
        fundedWithEthers: false,
        fundedWithMana: false,
        approvedMarketplace: false,
      };
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            accountInfo={accountInfo}
          />
        )
      ).toMatchSnapshot();
    });

    it("waiting for setup - waiting for ETH funding", async () => {
      const accountInfo = {
        account: {},
        setupInProgress: true,
        fundedWithEthers: false,
        fundedWithMana: false,
        approvedMarketplace: false,
      };
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            accountInfo={accountInfo}
          />
        )
      ).toMatchSnapshot();
    });

    it("waiting for setup - waiting for MANA funding and marketplace approval", async () => {
      const accountInfo = {
        account: {},
        setupInProgress: true,
        fundedWithEthers: true,
        fundedWithMana: false,
        approvedMarketplace: false,
      };
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            accountInfo={accountInfo}
          />
        )
      ).toMatchSnapshot();
    });

    it("waiting for setup - waiting for MANA funding", async () => {
      const accountInfo = {
        account: {},
        setupInProgress: true,
        fundedWithEthers: true,
        fundedWithMana: false,
        approvedMarketplace: true,
      };
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            accountInfo={accountInfo}
          />
        )
      ).toMatchSnapshot();
    });

    it("waiting for setup - waiting for marketplace approval", async () => {
      const accountInfo = {
        account: {},
        setupInProgress: true,
        fundedWithEthers: true,
        fundedWithMana: true,
        approvedMarketplace: false,
      };
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            accountInfo={accountInfo}
          />
        )
      ).toMatchSnapshot();
    });

    it("final state - account ready", async () => {
      const accountInfo = {
        account: {},
        setupInProgress: false,
        fundedWithEthers: true,
        fundedWithMana: true,
        approvedMarketplace: true,
      };
      expect(
        shallow(
          <BuyLand
            landForSale={parcelForSale}
            onBuy={onBuy}
            accountInfo={accountInfo}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
