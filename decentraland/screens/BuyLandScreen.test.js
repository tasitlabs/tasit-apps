import React from "react";
import { shallow } from "enzyme";
import { BuyLandScreen } from "./BuyLandScreen";
import { estateForSale } from "@helpers/testHelpers";
import AccountCreationStatus from "@constants/AccountCreationStatus";
const { READY_TO_USE } = AccountCreationStatus;

describe("BuyLandScreen", () => {
  describe("renders the component", () => {
    it("", async () => {
      const accountInfo = {
        creationStatus: READY_TO_USE,
      };
      const navigation = () => {};
      const removeLandForSale = () => {};
      const addToMyAssetsList = () => {};
      const removeMyAssetFromList = () => {};
      const prependLandForSaleToList = () => {};
      const myAssets = [];

      expect(
        shallow(
          <BuyLandScreen
            navigation={navigation}
            accountInfo={accountInfo}
            myAssets={myAssets}
            selectedLandToBuy={estateForSale}
            removeLandForSale={removeLandForSale}
            addToMyAssetsList={addToMyAssetsList}
            removeMyAssetFromList={removeMyAssetFromList}
            prependLandForSaleToList={prependLandForSaleToList}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
