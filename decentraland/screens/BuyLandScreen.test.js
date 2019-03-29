import React from "react";
import { shallow } from "enzyme";
import { BuyLandScreen } from "./BuyLandScreen";
import { estateForSale } from "@presentational/testHelpers";

describe("BuyLandScreen", () => {
  describe("renders the component", () => {
    it("", async () => {
      const accountInfo = {
        account: null,
        fundedWithEthers: true,
        fundedWithMana: true,
        approvedMarketplace: true,
      };
      const navigation = () => {};
      const removeLandForSale = () => {};
      const addToMyAssetsList = () => {};

      expect(
        shallow(
          <BuyLandScreen
            navigation={navigation}
            accountInfo={accountInfo}
            selectedLandToBuy={estateForSale}
            removeLandForSale={removeLandForSale}
            addToMyAssetsList={addToMyAssetsList}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
