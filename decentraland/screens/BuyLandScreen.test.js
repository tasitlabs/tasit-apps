import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import { BuyLandScreen } from "./BuyLandScreen";
import { estateForSale } from "@presentational/testHelpers";

describe("BuyLandScreen", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("renders the component", async () => {
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
